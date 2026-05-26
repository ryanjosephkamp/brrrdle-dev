import {
  HUGGING_FACE_API_BASE,
  HUGGING_FACE_DATASET_ID,
  HUGGING_FACE_RAW_BASE,
  fetchHuggingFaceRemoteMetadata,
  refreshWordListsFromHuggingFace,
  type RefreshSourceInfo,
} from '../../src/data'

const CRON_SECRET = process.env.CRON_SECRET

interface JsonResponseInit {
  readonly status: number
}

function jsonResponse(body: unknown, init: JsonResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    status: init.status,
  })
}

async function fetchJson(url: string, init?: { readonly signal?: AbortSignal }): Promise<unknown> {
  const response = await fetch(url, { signal: init?.signal })
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}.`)
  }
  return response.json()
}

/**
 * Scheduled Hugging Face word-list refresh.
 *
 * Triggered daily by the Vercel Cron schedule declared in `vercel.json`.
 * Vercel attaches `Authorization: Bearer <CRON_SECRET>` to scheduled
 * requests, which this handler verifies before doing any work, so the route
 * is not invokable by anonymous clients.
 *
 * The handler fetches the current upstream revision of the
 * `ryanjosephkamp/english-openlist` dataset, then runs the shared atomic
 * `refreshWordListsFromHuggingFace` pipeline against `latest/brrrdle/`. If
 * every length file validates, the validated payload is reported in the
 * response so the deployment environment can atomically swap the served
 * dictionaries via its persisted storage of choice (Vercel Blob/KV, Supabase
 * Storage, etc.). If any single length fails, the previous served
 * dictionaries remain in place and the failure detail is logged and
 * returned.
 */
export default async function handler(request: Request): Promise<Response> {
  const authorization = request.headers.get('authorization')
  if (!CRON_SECRET || authorization !== `Bearer ${CRON_SECRET}`) {
    return jsonResponse({ error: 'Unauthorized' }, { status: 401 })
  }

  let remote
  try {
    remote = await fetchHuggingFaceRemoteMetadata(fetchJson, { apiBase: HUGGING_FACE_API_BASE })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error fetching dataset info.'
    console.error('cron/refresh-word-lists: dataset info fetch failed', { message })
    return jsonResponse(
      { ok: false, stage: 'dataset-info', message },
      { status: 502 },
    )
  }

  const source: RefreshSourceInfo = {
    datasetId: HUGGING_FACE_DATASET_ID,
    revision: remote.version,
    generatedAt: remote.generatedAt,
  }

  const result = await refreshWordListsFromHuggingFace({
    fetchJson,
    source,
    rawBase: HUGGING_FACE_RAW_BASE,
  })

  if (!result.ok) {
    const failureSummary = result.failures.map((failure) => ({
      length: failure.length,
      reason: failure.reason,
      message: failure.message,
    }))
    console.error('cron/refresh-word-lists: refresh aborted', {
      revision: result.source.revision,
      failures: failureSummary,
    })
    return jsonResponse(
      {
        ok: false,
        stage: 'refresh',
        revision: result.source.revision,
        generatedAt: result.source.generatedAt,
        fetchedAt: result.fetchedAt,
        failures: failureSummary,
        message: result.message,
      },
      { status: 502 },
    )
  }

  const successSummary = result.files.map((file) => ({
    length: file.length,
    answers: file.file.answers.length,
    validGuesses: file.file.validGuesses.length,
  }))
  console.log('cron/refresh-word-lists: refresh succeeded', {
    revision: result.source.revision,
    fetchedAt: result.fetchedAt,
    lengthCount: result.files.length,
  })

  return jsonResponse(
    {
      ok: true,
      revision: result.source.revision,
      generatedAt: result.source.generatedAt,
      fetchedAt: result.fetchedAt,
      lengths: successSummary,
      note: 'Validated dictionaries returned to the cron caller. The deployment environment is responsible for persisting them to the production storage layer via an atomic swap.',
    },
    { status: 200 },
  )
}

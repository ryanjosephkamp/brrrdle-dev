import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getE2eEnv } from './env'
import type { E2eUser } from './testUsers'

interface AsyncMultiplayerGameRow {
  readonly current_turn?: string
  readonly id: string
  readonly mode?: string
  readonly player_one_user_id?: string
  readonly player_two_user_id?: string
  readonly projection?: unknown
  readonly scope?: string
  readonly status?: string
  readonly winner_player_id?: string | null
}

interface PrivateMatchRequestRow {
  readonly id: string
}

export function createAnonSupabaseClient(): SupabaseClient {
  const env = getE2eEnv()
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export function createAdminSupabaseClient(): SupabaseClient {
  const env = getE2eEnv()
  if (!env.supabaseServiceRoleKey) {
    throw new Error('E2E_SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY is required for admin cleanup.')
  }
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function deletePrivateMatchRequestsForUsers(userIds: readonly string[]): Promise<number> {
  if (userIds.length === 0) {
    return 0
  }

  const admin = createAdminSupabaseClient()
  const requestIds = new Set<string>()
  for (const column of ['requester_user_id', 'opponent_user_id'] as const) {
    const { data, error } = await admin
      .from('multiplayer_private_match_requests')
      .select('id')
      .in(column, [...userIds])
    if (error) {
      throw new Error(`Unable to inspect ${column} private match requests for cleanup: ${error.message}`)
    }
    for (const row of (data ?? []) as readonly PrivateMatchRequestRow[]) {
      requestIds.add(row.id)
    }
  }

  if (requestIds.size === 0) {
    return 0
  }

  const { error } = await admin
    .from('multiplayer_private_match_requests')
    .delete()
    .in('id', [...requestIds])
  if (error) {
    throw new Error(`Unable to delete temporary private match requests: ${error.message}`)
  }

  return requestIds.size
}

export async function deleteMultiplayerRowsForUsers(userIds: readonly string[]): Promise<number> {
  if (userIds.length === 0) {
    return 0
  }

  const admin = createAdminSupabaseClient()
  const rowIds = new Set<string>()
  for (const column of ['player_one_user_id', 'player_two_user_id'] as const) {
    const { data, error } = await admin
      .from('async_multiplayer_games')
      .select('id')
      .in(column, [...userIds])
    if (error) {
      throw new Error(`Unable to inspect ${column} multiplayer rows for cleanup: ${error.message}`)
    }
    for (const row of (data ?? []) as readonly AsyncMultiplayerGameRow[]) {
      rowIds.add(row.id)
    }
  }

  if (rowIds.size === 0) {
    return 0
  }

  const { error } = await admin
    .from('async_multiplayer_games')
    .delete()
    .in('id', [...rowIds])
  if (error) {
    throw new Error(`Unable to delete temporary multiplayer rows: ${error.message}`)
  }

  return rowIds.size
}

export async function fetchMultiplayerRowsForUsers(userIds: readonly string[]) {
  if (userIds.length === 0) {
    return []
  }

  const admin = createAdminSupabaseClient()
  const rows = []
  for (const column of ['player_one_user_id', 'player_two_user_id'] as const) {
    const { data, error } = await admin
      .from('async_multiplayer_games')
      .select('id, mode, scope, status, current_turn, winner_player_id, player_one_user_id, player_two_user_id, projection')
      .in(column, [...userIds])
    if (error) {
      throw new Error(`Unable to inspect ${column} multiplayer rows: ${error.message}`)
    }
    rows.push(...(data ?? []))
  }

  const seen = new Set<string>()
  return rows.filter((row) => {
    const id = typeof row.id === 'string' ? row.id : undefined
    if (!id || seen.has(id)) {
      return false
    }
    seen.add(id)
    return true
  })
}

export async function waitForMultiplayerRowForUsers({
  mode,
  scope,
  status,
  timeoutMs = 20_000,
  userIds,
}: {
  readonly mode?: 'go' | 'og'
  readonly scope?: 'daily' | 'practice'
  readonly status?: string
  readonly timeoutMs?: number
  readonly userIds: readonly string[]
}): Promise<AsyncMultiplayerGameRow> {
  const startedAt = Date.now()
  let latestRows: readonly AsyncMultiplayerGameRow[] = []
  while (Date.now() - startedAt < timeoutMs) {
    latestRows = await fetchMultiplayerRowsForUsers(userIds) as readonly AsyncMultiplayerGameRow[]
    const match = latestRows.find((row) => (
      (!mode || row.mode === mode)
      && (!scope || row.scope === scope)
      && (!status || row.status === status)
    ))
    if (match) {
      return match
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  throw new Error(`Timed out waiting for multiplayer row. Last rows: ${latestRows.map((row) => `${row.id}:${row.scope}:${row.mode}:${row.status}`).join(', ') || 'none'}`)
}

export async function updateMultiplayerProjection(game: {
  readonly currentTurn: string
  readonly endedAt?: string
  readonly id: string
  readonly status: string
  readonly updatedAt: string
  readonly winnerId?: string
} & Record<string, unknown>): Promise<void> {
  const admin = createAdminSupabaseClient()
  const { error } = await admin
    .from('async_multiplayer_games')
    .update({
      current_turn: game.currentTurn,
      ended_at: game.endedAt ?? null,
      projection: game,
      status: game.status,
      updated_at: game.updatedAt,
      winner_player_id: game.winnerId ?? null,
    })
    .eq('id', game.id)
  if (error) {
    throw new Error(`Unable to update temporary multiplayer projection: ${error.message}`)
  }
}

export async function fetchPublicProfileIdForUser(user: E2eUser): Promise<string> {
  const admin = createAdminSupabaseClient()
  const { data, error } = await admin
    .from('public_player_profiles')
    .select('public_profile_id')
    .eq('user_id', user.id)
    .single()
  if (error || typeof data?.public_profile_id !== 'string') {
    throw new Error(`Unable to load public profile id for E2E user ${user.label}: ${error?.message ?? 'missing public profile id'}`)
  }
  return data.public_profile_id
}

export async function upsertPublicProfileForUser(user: E2eUser, accentColor = 'ice'): Promise<void> {
  const admin = createAdminSupabaseClient()
  const { error } = await admin
    .from('public_player_profiles')
    .upsert({
      accent_color: accentColor,
      display_name: user.displayName,
      flair_key: 'none',
      user_id: user.id,
      visibility: 'public',
    }, {
      onConflict: 'user_id',
    })
  if (error) {
    throw new Error(`Unable to configure public profile for E2E user ${user.label}: ${error.message}`)
  }
}

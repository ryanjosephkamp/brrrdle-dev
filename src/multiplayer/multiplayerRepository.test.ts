import { describe, expect, it, vi } from 'vitest'
import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import {
  cancelMultiplayerGame,
  createMultiplayerGame,
  expireTimedOutPracticeMultiplayerGames,
  getMultiplayerAnswerWords,
  joinMultiplayerGame,
  submitMultiplayerGuess,
} from './multiplayer'
import {
  MULTIPLAYER_STORAGE_KEY,
  createLocalStorageMultiplayerRepository,
  createSupabaseMultiplayerRepository,
  isTrustedRankedPracticeSettlementCandidate,
  loadAuthenticatedLiveSpectatorRows,
  loadMultiplayerState,
  normalizeAuthenticatedLiveSpectatorRows,
  normalizeTrustedRankedSettlementRows,
} from './multiplayerRepository'

function createStorage(initial: Record<string, string> = {}) {
  const values = { ...initial }
  return {
    getItem: (key: string) => values[key] ?? null,
    setItem: (key: string, value: string) => {
      values[key] = value
    },
    values,
  }
}

function createSanitizedSpectatorRow(overrides: Record<string, unknown> = {}) {
  return {
    created_at: '2026-06-15T23:50:00.000Z',
    current_turn_seat: 'player-two',
    daily_date_key: null,
    deadline_at: null,
    difficulty: 'expert',
    go_puzzle_count: null,
    hard_mode: true,
    id: 'spectator-game-1',
    mode: 'og',
    moves: [
      {
        createdAt: '2026-06-15T23:51:00.000Z',
        guess: 'ROBOT',
        puzzleIndex: 0,
        seat: 'player-one',
        tiles: [
          { letter: 'R', state: 'absent' },
          { letter: 'O', state: 'present' },
          { letter: 'B', state: 'absent' },
          { letter: 'O', state: 'correct' },
          { letter: 'T', state: 'correct' },
        ],
      },
    ],
    outcome: {
      label: 'In progress',
      status: 'playing',
      terminal: false,
    },
    players: [
      { label: 'Host', profile: { displayName: 'Host player', initials: 'H' }, seat: 'player-one' },
      { label: 'Rival', profile: { displayName: 'Rival player', initials: 'R' }, seat: 'player-two' },
    ],
    progress: {
      currentPuzzleIndex: 0,
      latestMoveAt: '2026-06-15T23:51:00.000Z',
      moveCount: 1,
      solvedPuzzleCount: 0,
    },
    ranked: false,
    rating_bucket: null,
    scope: 'practice',
    spectator_capabilities: {
      canCancel: false,
      canForfeit: false,
      canJoin: false,
      canMutate: false,
      canSubmitGuess: false,
    },
    status: 'playing',
    ended_at: null,
    terminal_at: null,
    terminal_hold_until: null,
    time_limit_ms: 300000,
    updated_at: '2026-06-15T23:52:00.000Z',
    word_length: 5,
    ...overrides,
  }
}

function createTrustedSettlementRow(overrides: Record<string, unknown> = {}) {
  return {
    bucket: 'async:og',
    expected_score: '0.5',
    idempotent: false,
    match_result_id: 'phase27-result-game-1',
    new_rating: 1220,
    old_rating: 1200,
    opponent_user_id: 'user-2',
    outcome: 'win',
    rating_delta: 20,
    user_id: 'user-1',
    ...overrides,
  }
}

function createRankedQueueRequestRow(overrides: Record<string, unknown> = {}) {
  return {
    expires_at: null,
    hard_mode: false,
    queued_at: '2026-06-16T16:50:00.000Z',
    rating_bucket: 'async:og',
    rating_snapshot: 1200,
    request_id: 'queue-request-1',
    request_status: 'queued',
    word_length: 5,
    ...overrides,
  }
}

function createRankedQueueClaimRow(overrides: Record<string, unknown> = {}) {
  return {
    matched_game_id: null,
    opponent_request_id: null,
    request_id: 'queue-request-1',
    request_status: 'queued',
    ...overrides,
  }
}

function createRankedQueueStatusRow(overrides: Record<string, unknown> = {}) {
  return {
    hard_mode: true,
    matched_at: '2026-06-16T16:52:00.000Z',
    matched_game_id: 'ranked-game-1',
    mode: 'og',
    opponent_request_id: 'queue-request-2',
    player_one_user_id: 'user-1',
    player_two_user_id: 'user-2',
    queued_at: '2026-06-16T16:50:00.000Z',
    rating_bucket: 'async:og',
    request_id: 'queue-request-1',
    request_status: 'matched',
    scope: 'practice',
    time_limit_ms: null,
    viewer_seat: 'player-one',
    word_length: 5,
    ...overrides,
  }
}

function createRankedQueueFinalizationRow(overrides: Record<string, unknown> = {}) {
  return {
    created: true,
    game_id: 'ranked-game-1',
    idempotent: false,
    opponent_request_id: 'queue-request-2',
    request_id: 'queue-request-1',
    request_status: 'matched',
    ...overrides,
  }
}

describe('multiplayer repository seam', () => {
  it('normalizes corrupted local storage to an empty multiplayer state', () => {
    const storage = createStorage({ [MULTIPLAYER_STORAGE_KEY]: '{bad-json' })

    expect(loadMultiplayerState(storage).games).toEqual([])
  })

  it('saves and reloads multiplayer state through the local storage repository', async () => {
    const storage = createStorage()
    const repository = createLocalStorageMultiplayerRepository(storage)
    const game = createMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5 })

    await repository.save({ games: [game] }, 0)

    expect(loadMultiplayerState(storage).games[0].id).toBe(game.id)
  })

  it('seeds the local repository from legacy guest-progress multiplayer state when no multiplayer key exists', async () => {
    const storage = createStorage()
    const game = createMultiplayerGame({ mode: 'og', scope: 'practice', wordLength: 5 })
    const repository = createLocalStorageMultiplayerRepository(storage, { games: [game] })

    expect((await repository.load()).state.games[0].id).toBe(game.id)
  })

  it('normalizes sanitized authenticated Live spectator RPC rows', () => {
    const rows = normalizeAuthenticatedLiveSpectatorRows([createSanitizedSpectatorRow()])

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      currentTurnSeat: 'player-two',
      hardMode: true,
      id: 'spectator-game-1',
      mode: 'og',
      scope: 'practice',
      spectatorCapabilities: {
        canCancel: false,
        canForfeit: false,
        canJoin: false,
        canMutate: false,
        canSubmitGuess: false,
      },
      timeLimitMs: 300000,
      wordLength: 5,
    })
    expect(rows[0].players.map((player) => player.label)).toEqual(['Host', 'Rival'])
    expect(rows[0].moves[0].tiles.map((tile) => tile.state)).toEqual(['absent', 'present', 'absent', 'correct', 'correct'])
  })

  it('normalizes sanitized terminal Live spectator rows during the bounded hold window', () => {
    const rows = normalizeAuthenticatedLiveSpectatorRows([
      createSanitizedSpectatorRow({
        current_turn_seat: null,
        ended_at: '2026-06-15T23:55:00.000Z',
        outcome: {
          label: 'Player one won',
          status: 'won',
          terminal: true,
          terminalAt: '2026-06-15T23:55:00.000Z',
          winnerSeat: 'player-one',
        },
        status: 'won',
        terminal_at: '2026-06-15T23:55:00.000Z',
        terminal_hold_until: '2026-06-15T23:55:15.000Z',
      }),
    ])

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      currentTurnSeat: undefined,
      endedAt: '2026-06-15T23:55:00.000Z',
      outcome: {
        label: 'Player one won',
        status: 'won',
        terminal: true,
        terminalAt: '2026-06-15T23:55:00.000Z',
        winnerSeat: 'player-one',
      },
      status: 'won',
      terminalAt: '2026-06-15T23:55:00.000Z',
      terminalHoldUntil: '2026-06-15T23:55:15.000Z',
    })
  })

  it('filters current Daily spectator rows as an app-side defense in depth', () => {
    const rows = normalizeAuthenticatedLiveSpectatorRows([
      createSanitizedSpectatorRow({
        daily_date_key: '2026-06-18',
        id: 'current-daily-game',
        scope: 'daily',
      }),
      createSanitizedSpectatorRow({
        daily_date_key: '2026-06-17',
        id: 'past-daily-game',
        scope: 'daily',
      }),
    ], new Date('2026-06-18T12:00:00.000Z'))

    expect(rows.map((row) => row.id)).toEqual(['past-daily-game'])
  })

  it('rejects Live spectator rows that contain forbidden raw projection or identity fields', () => {
    const rawProjection = createSanitizedSpectatorRow({
      projection: {
        serializedSession: { answer: 'crane' },
      },
    })
    const rawIdentity = createSanitizedSpectatorRow({
      players: [
        { label: 'Host', seat: 'player-one', userId: 'raw-auth-id' },
        { label: 'Rival', seat: 'player-two' },
      ],
    })

    expect(normalizeAuthenticatedLiveSpectatorRows([rawProjection, rawIdentity])).toEqual([])
  })

  it('loads authenticated Live spectator rows from the sanitized RPC only', async () => {
    const rpc = vi.fn(async () => ({ data: [createSanitizedSpectatorRow()], error: null }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient

    const rows = await loadAuthenticatedLiveSpectatorRows(client, 25)

    expect(rpc).toHaveBeenCalledWith('get_authenticated_live_v1_spectator_games_v2', {
      p_limit: 25,
      p_terminal_window_seconds: 15,
    })
    expect(rows).toHaveLength(1)
    expect(rows[0].id).toBe('spectator-game-1')
  })

  it('normalizes trusted ranked settlement RPC rows without raw game projections', () => {
    const transactions = normalizeTrustedRankedSettlementRows([
      createTrustedSettlementRow(),
      createTrustedSettlementRow({
        bucket: 'async:go',
        expected_score: 0.49,
        match_result_id: 'phase27-result-game-2',
        new_rating: 1180,
        old_rating: 1200,
        opponent_user_id: 'user-1',
        outcome: 'loss',
        rating_delta: -20,
        user_id: 'user-2',
      }),
    ], '2026-06-16T06:10:00.000Z')

    expect(transactions).toHaveLength(2)
    expect(transactions[0]).toMatchObject({
      bucket: 'multiplayer:og',
      createdAt: '2026-06-16T06:10:00.000Z',
      expectedScore: 0.5,
      id: 'trusted-phase27-result-game-1-multiplayer:og-user-1',
      idempotent: false,
      matchId: 'phase27-result-game-1',
      newRating: 1220,
      oldRating: 1200,
      opponentUserId: 'user-2',
      outcome: 'win',
      ratingDelta: 20,
      userId: 'user-1',
    })
    expect(transactions[1].bucket).toBe('multiplayer:go')
  })

  it('rejects trusted ranked settlement rows that contain raw projection fields', () => {
    const transactions = normalizeTrustedRankedSettlementRows([
      createTrustedSettlementRow({
        projection: {
          serializedSession: { answer: 'crane' },
        },
      }),
    ])

    expect(transactions).toEqual([])
  })

  it('identifies only queue-backed terminal Practice ranked games as trusted settlement candidates', () => {
    const game = createMultiplayerGame({
      matchmakingRequestId: 'queue-request-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1', 'player-two': 'user-2' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const submitted = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    const terminal = submitted.game!

    expect(isTrustedRankedPracticeSettlementCandidate(terminal)).toBe(true)
    expect(isTrustedRankedPracticeSettlementCandidate({ ...terminal, matchmakingRequestId: undefined })).toBe(false)
    expect(isTrustedRankedPracticeSettlementCandidate({ ...terminal, scope: 'daily' })).toBe(false)
    expect(isTrustedRankedPracticeSettlementCandidate({ ...terminal, timeLimitMs: 30_000 })).toBe(false)
    expect(isTrustedRankedPracticeSettlementCandidate({ ...terminal, customGameCode: 'abc123' })).toBe(false)
    expect(isTrustedRankedPracticeSettlementCandidate({ ...terminal, status: 'playing' })).toBe(false)
  })

  it('settles queue-backed terminal Practice ranked games through the trusted Supabase RPC', async () => {
    const rpc = vi.fn(async () => ({
      data: [
        createTrustedSettlementRow(),
        createTrustedSettlementRow({
          match_result_id: 'phase27-result-game-1',
          new_rating: 1180,
          old_rating: 1200,
          opponent_user_id: 'user-1',
          outcome: 'loss',
          rating_delta: -20,
          user_id: 'user-2',
        }),
      ],
      error: null,
    }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const game = createMultiplayerGame({
      matchmakingRequestId: 'queue-request-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1', 'player-two': 'user-2' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const submitted = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    const settlement = await repository.settleRankedGame(submitted.game!)

    expect(rpc).toHaveBeenCalledWith('settle_ranked_async_multiplayer_match', {
      p_game_id: game.id,
      p_idempotency_key: `phase27-ranked-v1:async:${game.id}:async:og`,
    })
    expect(settlement?.transactions).toHaveLength(2)
    expect(settlement?.transactions[0].bucket).toBe('multiplayer:og')
  })

  it('does not call the trusted settlement RPC for ineligible games', async () => {
    const rpc = vi.fn(async () => ({ data: [createTrustedSettlementRow()], error: null }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1', 'player-two': 'user-2' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const submitted = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })

    await expect(repository.settleRankedGame(submitted.game!)).resolves.toBeUndefined()

    expect(rpc).not.toHaveBeenCalled()
  })

  it('throws when the trusted settlement RPC returns no parseable transactions', async () => {
    const rpc = vi.fn(async () => ({
      data: [createTrustedSettlementRow({ projection: { serializedSession: { answer: 'crane' } } })],
      error: null,
    }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const game = createMultiplayerGame({
      matchmakingRequestId: 'queue-request-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1', 'player-two': 'user-2' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const submitted = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    await expect(repository.settleRankedGame(submitted.game!)).rejects.toThrow('Unable to parse ranked multiplayer settlement result.')
  })

  it('creates ranked Practice queue requests through the trusted RPC', async () => {
    const rpc = vi.fn(async () => ({ data: [createRankedQueueRequestRow()], error: null }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    const request = await repository.createRankedQueueRequest({
      hardMode: false,
      idempotencyKey: 'phase27-ranked-v1:queue:user-1:og:5:false',
      mode: 'og',
      wordLength: 5,
    })

    expect(rpc).toHaveBeenCalledWith('create_ranked_async_matchmaking_request', {
      p_expires_at: null,
      p_hard_mode: false,
      p_idempotency_key: 'phase27-ranked-v1:queue:user-1:og:5:false',
      p_mode: 'og',
      p_scope: 'practice',
      p_time_limit_ms: null,
      p_word_length: 5,
    })
    expect(request).toMatchObject({
      ratingBucket: 'multiplayer:og',
      requestId: 'queue-request-1',
      requestStatus: 'queued',
      wordLength: 5,
    })
  })

  it('claims, reads status, and finalizes ranked Practice queue games through trusted RPCs', async () => {
    const game = createMultiplayerGame({
      hardMode: true,
      id: 'ranked-game-1',
      matchmakingRequestId: 'queue-request-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1', 'player-two': 'user-2' },
      ranked: true,
      ratingBucket: 'multiplayer:og',
      scope: 'practice',
      wordLength: 5,
    })
    const rpc = vi.fn(async (name: string) => {
      if (name === 'claim_ranked_async_matchmaking_pair') {
        return {
          data: [createRankedQueueClaimRow({
            matched_game_id: 'ranked-game-1',
            opponent_request_id: 'queue-request-2',
            request_status: 'matched',
          })],
          error: null,
        }
      }
      if (name === 'get_ranked_async_matchmaking_status') {
        return { data: [createRankedQueueStatusRow()], error: null }
      }
      if (name === 'finalize_ranked_async_matchmaking_game') {
        return { data: [createRankedQueueFinalizationRow()], error: null }
      }
      return { data: null, error: { message: `Unexpected RPC ${name}` } }
    })
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    const claim = await repository.claimRankedQueuePair({ requestId: 'queue-request-1' })
    const status = await repository.getRankedQueueStatus('queue-request-1')
    const finalization = await repository.finalizeRankedQueueGame({
      game,
      idempotencyKey: 'phase27-ranked-v1:finalize:ranked-game-1',
      matchedGameId: 'ranked-game-1',
      requestId: 'queue-request-1',
    })

    expect(claim).toMatchObject({ matchedGameId: 'ranked-game-1', requestStatus: 'matched' })
    expect(status).toMatchObject({
      matchedGameId: 'ranked-game-1',
      playerOneUserId: 'user-1',
      playerTwoUserId: 'user-2',
      ratingBucket: 'multiplayer:og',
      viewerSeat: 'player-one',
    })
    expect(finalization).toMatchObject({ created: true, gameId: 'ranked-game-1', idempotent: false })
    expect(rpc).toHaveBeenCalledWith('claim_ranked_async_matchmaking_pair', {
      p_matched_game_id: null,
      p_request_id: 'queue-request-1',
    })
    expect(rpc).toHaveBeenCalledWith('get_ranked_async_matchmaking_status', {
      p_request_id: 'queue-request-1',
    })
    expect(rpc).toHaveBeenCalledWith('finalize_ranked_async_matchmaking_game', {
      p_game_projection: game,
      p_idempotency_key: 'phase27-ranked-v1:finalize:ranked-game-1',
      p_matched_game_id: 'ranked-game-1',
      p_request_id: 'queue-request-1',
    })
  })

  it('rejects ranked queue RPC rows that contain raw projection fields', async () => {
    const rpc = vi.fn(async () => ({
      data: [
        createRankedQueueStatusRow({
          projection: {
            serializedSession: { answer: 'crane' },
          },
        }),
      ],
      error: null,
    }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    await expect(repository.getRankedQueueStatus('queue-request-1')).rejects.toThrow('Unable to parse ranked queue status result.')
  })

  it('cancels ranked queue requests through the trusted RPC', async () => {
    const rpc = vi.fn(async () => ({
      data: [{ request_id: 'queue-request-1', request_status: 'cancelled' }],
      error: null,
    }))
    const client = { rpc } as unknown as BrrrdleSupabaseClient
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    const cancellation = await repository.cancelRankedQueueRequest('queue-request-1')

    expect(rpc).toHaveBeenCalledWith('cancel_ranked_async_matchmaking_request', {
      p_request_id: 'queue-request-1',
    })
    expect(cancellation).toEqual({ requestId: 'queue-request-1', requestStatus: 'cancelled' })
  })

  it('saves only the current user multiplayer games through the Supabase adapter', async () => {
    const inserts: Record<string, readonly unknown[]> = {}
    const channel = {
      on: vi.fn(() => channel),
      subscribe: vi.fn(() => channel),
    }
    const fromMock = vi.fn((table: string) => ({
      upsert: vi.fn(async (rows: readonly unknown[]) => {
        inserts[table] = rows
        return { error: null }
      }),
      select: vi.fn((columns: string) => {
        if (columns === 'id') {
          return {
            in: vi.fn(async () => ({ data: [], error: null })),
          }
        }
        if (columns === 'projection') {
          return {
            eq: vi.fn(() => ({
              maybeSingle: vi.fn(async () => ({ data: null, error: null })),
            })),
          }
        }
        return {
          order: vi.fn(async () => ({ data: [], error: null })),
        }
      }),
      update: vi.fn((row: unknown) => ({
        eq: vi.fn(async () => {
          inserts[`${table}:updated`] = [row]
          return { error: null }
        }),
      })),
    }))
    const client = {
      channel: vi.fn(() => channel),
      from: fromMock,
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    } as unknown as BrrrdleSupabaseClient
    const ownedGame = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      ranked: true,
      ratingBucket: 'multiplayer:og',
      scope: 'practice',
      wordLength: 5,
    })
    const visibleOtherGame = createMultiplayerGame({
      mode: 'go',
      playerUserIds: { 'player-one': 'other-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    await repository.save({ games: [visibleOtherGame, ownedGame] })

    expect(inserts.async_multiplayer_games).toHaveLength(1)
    expect((inserts.async_multiplayer_games[0] as { readonly id: string }).id).toBe(ownedGame.id)
    expect((inserts.async_multiplayer_games[0] as { readonly rating_bucket: string }).rating_bucket).toBe('async:og')
    expect((inserts.async_multiplayer_games[0] as { readonly projection: typeof ownedGame }).projection.ratingBucket).toBe('multiplayer:og')
    expect(new Set(fromMock.mock.calls.map(([table]) => table))).toEqual(new Set(['async_multiplayer_games']))
  })

  it('skips unchanged Supabase multiplayer rows on follow-up saves', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const upsertBatches: unknown[][] = []
    const updatedRows: unknown[] = []
    const channel = {
      on: vi.fn(() => channel),
      subscribe: vi.fn(() => channel),
    }
    const client = {
      channel: vi.fn(() => channel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          upsertBatches.push([...rows])
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            updatedRows.push(row)
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    } as unknown as BrrrdleSupabaseClient
    const gameA = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'practice',
      wordLength: 5,
    })
    const gameB = createMultiplayerGame({
      mode: 'go',
      playerUserIds: { 'player-one': 'user-1' },
      scope: 'practice',
      wordLength: 5,
    })
    const repository = createSupabaseMultiplayerRepository({ client, userId: 'user-1' })

    await repository.save({ games: [gameA, gameB] })
    await repository.save({ games: [{ ...gameA, updatedAt: '2026-06-04T12:00:05.000Z' }, gameB] })

    expect(upsertBatches[0]).toHaveLength(2)
    expect(updatedRows).toHaveLength(1)
    expect((updatedRows[0] as { readonly id: string }).id).toBe(gameA.id)
  })

  it('persists multiplayer turns across two Supabase-backed repository clients', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinMultiplayerGame(rivalLoaded.state, { gameId: game.id, userId: 'rival-user' })
    await rivalRepository.save(joined.state)
    const hostLoaded = await hostRepository.load()
    const submitted = submitMultiplayerGuess(hostLoaded.state, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      playerId: 'player-one',
    })
    await hostRepository.save(submitted.state)
    const rivalReloaded = await rivalRepository.load()

    expect(rivalLoaded.state.games[0].status).toBe('waiting')
    expect(hostLoaded.state.games[0].playerUserIds?.['player-two']).toBe('rival-user')
    expect(rivalReloaded.state.games[0].moves).toHaveLength(1)
    expect(rivalReloaded.state.games[0].moves[0].playerId).toBe('player-one')
  })

  it('does not let a stale creator cancellation overwrite a newer rival join', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinMultiplayerGame(rivalLoaded.state, { gameId: game.id, userId: 'rival-user' })
    await rivalRepository.save(joined.state)
    const staleCancel = cancelMultiplayerGame({ games: [game] }, { gameId: game.id, userId: 'host-user' })
    await hostRepository.save(staleCancel.state)
    const reloaded = await rivalRepository.load()

    expect(reloaded.state.games[0].status).toBe('playing')
    expect(reloaded.state.games[0].playerUserIds?.['player-two']).toBe('rival-user')
  })

  it('does not let a stale timed timeout overwrite a newer submitted turn', async () => {
    const tables: Record<string, unknown[]> = { async_multiplayer_games: [] }
    const createChannel = () => {
      const channel = {
        on: vi.fn(() => channel),
        subscribe: vi.fn(() => channel),
      }
      return channel
    }
    const createClient = () => ({
      channel: vi.fn(createChannel),
      from: vi.fn((table: string) => ({
        upsert: vi.fn(async (rows: readonly { readonly id?: string }[]) => {
          const existing = new Map((tables[table] ?? []).map((row) => [(row as { readonly id?: string }).id, row]))
          for (const row of rows) {
            if (!existing.has(row.id)) {
              existing.set(row.id, row)
            }
          }
          tables[table] = Array.from(existing.values())
          return { error: null }
        }),
        select: vi.fn((columns: string) => {
          if (columns === 'id') {
            return {
              in: vi.fn(async (_column: string, ids: readonly string[]) => ({
                data: (tables[table] ?? []).filter((row) => ids.includes(String((row as { readonly id?: string }).id))).map((row) => ({ id: (row as { readonly id?: string }).id })),
                error: null,
              })),
            }
          }
          if (columns === 'projection') {
            return {
              eq: vi.fn((_column: string, id: string) => ({
                maybeSingle: vi.fn(async () => ({
                  data: (tables[table] ?? []).find((row) => (row as { readonly id?: string }).id === id) ?? null,
                  error: null,
                })),
              })),
            }
          }
          return {
            order: vi.fn(async () => ({ data: tables[table] ?? [], error: null })),
          }
        }),
        update: vi.fn((row: { readonly id?: string }) => ({
          eq: vi.fn(async (_column: string, id: string) => {
            tables[table] = (tables[table] ?? []).map((entry) => (entry as { readonly id?: string }).id === id ? row : entry)
            return { error: null }
          }),
        })),
      })),
      removeChannel: vi.fn(async () => ({ error: null })),
      rpc: vi.fn(async () => ({ data: '2026-06-04T12:00:00.000Z', error: null })),
    }) as unknown as BrrrdleSupabaseClient
    const hostRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'host-user' })
    const rivalRepository = createSupabaseMultiplayerRepository({ client: createClient(), userId: 'rival-user' })
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      timeLimitMs: 30_000,
      wordLength: 5,
    })

    await hostRepository.save({ games: [game] })
    const rivalLoaded = await rivalRepository.load()
    const joined = joinMultiplayerGame(rivalLoaded.state, {
      gameId: game.id,
      now: '2026-06-04T12:00:00.000Z',
      userId: 'rival-user',
    })
    await rivalRepository.save(joined.state)
    const hostLoaded = await hostRepository.load()
    const submitted = submitMultiplayerGuess(hostLoaded.state, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      now: '2026-06-04T12:00:05.000Z',
      playerId: 'player-one',
    })
    await hostRepository.save(submitted.state)
    const staleTimeout = expireTimedOutPracticeMultiplayerGames(joined.state, new Date('2026-06-04T12:00:31.000Z'))
    await rivalRepository.save(staleTimeout)
    const hostReloaded = await hostRepository.load()

    expect(hostReloaded.state.games[0].moves).toHaveLength(1)
    expect(hostReloaded.state.games[0].moves[0].playerId).toBe('player-one')
    expect(hostReloaded.state.games[0].timedOutPlayerId).toBeUndefined()
  })
})

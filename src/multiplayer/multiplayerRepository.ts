import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import type { DifficultyTier } from '../data'
import type { GameMode, PlayScope, TileResult } from '../game/types'
import {
  createEmptyMultiplayerState,
  normalizeMultiplayerState,
  type MultiplayerGame,
  type MultiplayerState,
} from './multiplayer'

export interface MultiplayerRepositorySnapshot {
  readonly serverNow: string
  readonly state: MultiplayerState
  readonly version: number
}

export interface MultiplayerRepository {
  readonly getServerNow: () => Promise<string>
  readonly load: () => Promise<MultiplayerRepositorySnapshot>
  readonly save: (state: MultiplayerState, expectedVersion?: number) => Promise<MultiplayerRepositorySnapshot>
  readonly subscribe: (listener: (snapshot: MultiplayerRepositorySnapshot) => void) => () => void
}

export const MULTIPLAYER_STORAGE_KEY = 'brrrdle:async-multiplayer:v1'

export interface MultiplayerKeyValueStorage {
  readonly getItem: (key: string) => string | null
  readonly removeItem?: (key: string) => void
  readonly setItem: (key: string, value: string) => void
}

function getBrowserStorage(): MultiplayerKeyValueStorage | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }
  return window.localStorage
}

function createSnapshot(state: MultiplayerState, version: number, now = new Date().toISOString()): MultiplayerRepositorySnapshot {
  return {
    serverNow: now,
    state: normalizeMultiplayerState(state),
    version,
  }
}

export function loadMultiplayerState(storage: MultiplayerKeyValueStorage | undefined = getBrowserStorage()): MultiplayerState {
  const raw = storage?.getItem(MULTIPLAYER_STORAGE_KEY)
  if (!raw) {
    return createEmptyMultiplayerState()
  }
  try {
    return normalizeMultiplayerState(JSON.parse(raw) as unknown)
  } catch {
    return createEmptyMultiplayerState()
  }
}

export function saveMultiplayerState(state: MultiplayerState, storage: MultiplayerKeyValueStorage | undefined = getBrowserStorage()): void {
  storage?.setItem(MULTIPLAYER_STORAGE_KEY, JSON.stringify(normalizeMultiplayerState(state)))
}

export function createLocalStorageMultiplayerRepository(
  storage: MultiplayerKeyValueStorage | undefined = getBrowserStorage(),
  initialState: unknown = createEmptyMultiplayerState(),
): MultiplayerRepository {
  const storedState = storage?.getItem(MULTIPLAYER_STORAGE_KEY)
  let snapshot = createSnapshot(storedState ? loadMultiplayerState(storage) : normalizeMultiplayerState(initialState), 0)
  const listeners = new Set<(next: MultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    saveMultiplayerState(snapshot.state, storage)
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  return {
    getServerNow: async () => new Date().toISOString(),
    load: async () => snapshot,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Multiplayer repository version conflict.')
      }
      snapshot = createSnapshot(state, snapshot.version + 1)
      publish()
      return snapshot
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(snapshot)
      return () => {
        listeners.delete(listener)
      }
    },
  }
}

export interface SupabaseMultiplayerRepositoryOptions {
  readonly client: BrrrdleSupabaseClient
  readonly userId: string
}

interface MultiplayerGameRow {
  readonly created_at?: string
  readonly id?: string
  readonly projection?: unknown
  readonly updated_at?: string
}

export type AuthenticatedLiveSpectatorSeat = 'player-one' | 'player-two'

export interface AuthenticatedLiveSpectatorPlayer {
  readonly seat: AuthenticatedLiveSpectatorSeat
  readonly label: string
  readonly profile?: {
    readonly accentColor?: string
    readonly avatarUrl?: string
    readonly displayName?: string
    readonly initials?: string
  }
}

export interface AuthenticatedLiveSpectatorMove {
  readonly createdAt?: string
  readonly guess: string
  readonly puzzleIndex: number
  readonly seat: AuthenticatedLiveSpectatorSeat
  readonly tiles: readonly TileResult[]
}

export interface AuthenticatedLiveSpectatorProgress {
  readonly currentPuzzleIndex: number
  readonly latestMoveAt?: string
  readonly moveCount: number
  readonly solvedPuzzleCount: number
}

export interface AuthenticatedLiveSpectatorCapabilities {
  readonly canCancel: false
  readonly canForfeit: false
  readonly canJoin: false
  readonly canMutate: false
  readonly canSubmitGuess: false
}

export interface AuthenticatedLiveSpectatorGame {
  readonly createdAt: string
  readonly currentTurnSeat?: AuthenticatedLiveSpectatorSeat
  readonly dailyDateKey?: string
  readonly deadlineAt?: string
  readonly difficulty: DifficultyTier
  readonly goPuzzleCount?: number
  readonly hardMode: boolean
  readonly id: string
  readonly mode: GameMode
  readonly moves: readonly AuthenticatedLiveSpectatorMove[]
  readonly players: readonly AuthenticatedLiveSpectatorPlayer[]
  readonly progress: AuthenticatedLiveSpectatorProgress
  readonly ranked: boolean
  readonly ratingBucket?: string
  readonly scope: PlayScope
  readonly spectatorCapabilities: AuthenticatedLiveSpectatorCapabilities
  readonly status: 'playing'
  readonly timeLimitMs?: number
  readonly updatedAt: string
  readonly wordLength: number
}

const FORBIDDEN_SPECTATOR_KEYS = new Set([
  'answer',
  'answers',
  'answerWord',
  'answerWords',
  'authId',
  'auth_id',
  'email',
  'hostUserId',
  'host_user_id',
  'playerOneUserId',
  'playerSessions',
  'playerTwoUserId',
  'playerUserIds',
  'player_one_user_id',
  'player_sessions',
  'player_two_user_id',
  'player_user_ids',
  'projection',
  'rawMoveId',
  'raw_move_id',
  'seed',
  'seeds',
  'serializedSession',
  'serialized_session',
  'userId',
  'user_id',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasForbiddenSpectatorKey(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenSpectatorKey)
  }
  if (!isRecord(value)) {
    return false
  }
  return Object.entries(value).some(([key, child]) => (
    FORBIDDEN_SPECTATOR_KEYS.has(key) || hasForbiddenSpectatorKey(child)
  ))
}

function getString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key]
  return typeof value === 'string' && value.trim() ? value : undefined
}

function getBoolean(record: Record<string, unknown>, key: string): boolean | undefined {
  return typeof record[key] === 'boolean' ? record[key] : undefined
}

function getNumber(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function getPositiveInteger(record: Record<string, unknown>, key: string): number | undefined {
  const value = getNumber(record, key)
  return value !== undefined && Number.isInteger(value) && value > 0 ? value : undefined
}

function getNonNegativeInteger(record: Record<string, unknown>, key: string): number | undefined {
  const value = getNumber(record, key)
  return value !== undefined && Number.isInteger(value) && value >= 0 ? value : undefined
}

function parseMode(value: unknown): GameMode | undefined {
  return value === 'og' || value === 'go' ? value : undefined
}

function parseScope(value: unknown): PlayScope | undefined {
  return value === 'daily' || value === 'practice' ? value : undefined
}

function parseDifficulty(value: unknown): DifficultyTier | undefined {
  return value === 'casual' || value === 'standard' || value === 'expert' ? value : undefined
}

function parseSeat(value: unknown): AuthenticatedLiveSpectatorSeat | undefined {
  return value === 'player-one' || value === 'player-two' ? value : undefined
}

function parseTile(value: unknown): TileResult | undefined {
  if (!isRecord(value)) {
    return undefined
  }
  const letter = getString(value, 'letter')
  const state = value.state
  if (!letter || (state !== 'correct' && state !== 'present' && state !== 'absent')) {
    return undefined
  }
  return {
    letter: letter.slice(0, 1).toUpperCase(),
    state,
  }
}

function parseSpectatorPlayers(value: unknown): readonly AuthenticatedLiveSpectatorPlayer[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }
  const players = value.flatMap((entry) => {
    if (!isRecord(entry)) {
      return []
    }
    const seat = parseSeat(entry.seat)
    const label = getString(entry, 'label')
    if (!seat || !label) {
      return []
    }
    const profileRecord = isRecord(entry.profile) ? entry.profile : undefined
    const profile = profileRecord
      ? {
          accentColor: getString(profileRecord, 'accentColor'),
          avatarUrl: getString(profileRecord, 'avatarUrl'),
          displayName: getString(profileRecord, 'displayName'),
          initials: getString(profileRecord, 'initials'),
        }
      : undefined
    return [{
      label,
      profile: profile && Object.values(profile).some(Boolean) ? profile : undefined,
      seat,
    }]
  })
  const seats = new Set(players.map((player) => player.seat))
  return seats.has('player-one') && seats.has('player-two') ? players : undefined
}

function parseSpectatorMoves(value: unknown): readonly AuthenticatedLiveSpectatorMove[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }
  return value.flatMap((entry) => {
    if (!isRecord(entry)) {
      return []
    }
    const seat = parseSeat(entry.seat)
    const guess = getString(entry, 'guess')
    const puzzleIndex = getNonNegativeInteger(entry, 'puzzleIndex')
    const tiles = Array.isArray(entry.tiles) ? entry.tiles.flatMap((tile) => parseTile(tile) ?? []) : []
    if (!seat || !guess || puzzleIndex === undefined) {
      return []
    }
    return [{
      createdAt: getString(entry, 'createdAt'),
      guess: guess.toUpperCase(),
      puzzleIndex,
      seat,
      tiles,
    }]
  })
}

function parseSpectatorProgress(value: unknown): AuthenticatedLiveSpectatorProgress | undefined {
  if (!isRecord(value)) {
    return undefined
  }
  const currentPuzzleIndex = getNonNegativeInteger(value, 'currentPuzzleIndex')
  const moveCount = getNonNegativeInteger(value, 'moveCount')
  const solvedPuzzleCount = getNonNegativeInteger(value, 'solvedPuzzleCount')
  if (currentPuzzleIndex === undefined || moveCount === undefined || solvedPuzzleCount === undefined) {
    return undefined
  }
  return {
    currentPuzzleIndex,
    latestMoveAt: getString(value, 'latestMoveAt'),
    moveCount,
    solvedPuzzleCount,
  }
}

function parseSpectatorCapabilities(value: unknown): AuthenticatedLiveSpectatorCapabilities | undefined {
  if (!isRecord(value)) {
    return undefined
  }
  const capabilities = {
    canCancel: getBoolean(value, 'canCancel') === false,
    canForfeit: getBoolean(value, 'canForfeit') === false,
    canJoin: getBoolean(value, 'canJoin') === false,
    canMutate: getBoolean(value, 'canMutate') === false,
    canSubmitGuess: getBoolean(value, 'canSubmitGuess') === false,
  }
  if (!Object.values(capabilities).every(Boolean)) {
    return undefined
  }
  return {
    canCancel: false,
    canForfeit: false,
    canJoin: false,
    canMutate: false,
    canSubmitGuess: false,
  }
}

function parseAuthenticatedLiveSpectatorRow(row: unknown): AuthenticatedLiveSpectatorGame | undefined {
  if (!isRecord(row) || hasForbiddenSpectatorKey(row)) {
    return undefined
  }
  const id = getString(row, 'id')
  const scope = parseScope(row.scope)
  const mode = parseMode(row.mode)
  const status = row.status === 'playing' ? row.status : undefined
  const wordLength = getPositiveInteger(row, 'word_length')
  const difficulty = parseDifficulty(row.difficulty)
  const hardMode = getBoolean(row, 'hard_mode')
  const ranked = getBoolean(row, 'ranked')
  const createdAt = getString(row, 'created_at')
  const updatedAt = getString(row, 'updated_at')
  const players = parseSpectatorPlayers(row.players)
  const moves = parseSpectatorMoves(row.moves)
  const progress = parseSpectatorProgress(row.progress)
  const spectatorCapabilities = parseSpectatorCapabilities(row.spectator_capabilities)
  if (
    !id || !scope || !mode || !status || !wordLength || !difficulty
    || hardMode === undefined || ranked === undefined || !createdAt || !updatedAt
    || !players || !moves || !progress || !spectatorCapabilities
  ) {
    return undefined
  }
  return {
    createdAt,
    currentTurnSeat: parseSeat(row.current_turn_seat),
    dailyDateKey: getString(row, 'daily_date_key'),
    deadlineAt: getString(row, 'deadline_at'),
    difficulty,
    goPuzzleCount: getPositiveInteger(row, 'go_puzzle_count'),
    hardMode,
    id,
    mode,
    moves,
    players,
    progress,
    ranked,
    ratingBucket: getString(row, 'rating_bucket'),
    scope,
    spectatorCapabilities,
    status,
    timeLimitMs: getPositiveInteger(row, 'time_limit_ms'),
    updatedAt,
    wordLength,
  }
}

export function normalizeAuthenticatedLiveSpectatorRows(value: unknown): readonly AuthenticatedLiveSpectatorGame[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.flatMap((row) => parseAuthenticatedLiveSpectatorRow(row) ?? [])
}

export async function loadAuthenticatedLiveSpectatorRows(
  client: BrrrdleSupabaseClient,
  limit = 50,
): Promise<readonly AuthenticatedLiveSpectatorGame[]> {
  const { data, error } = await client.rpc('get_authenticated_live_v1_spectator_games', {
    p_limit: Math.max(0, Math.min(100, Math.floor(limit))),
  })
  if (error) {
    return []
  }
  return normalizeAuthenticatedLiveSpectatorRows(data)
}

function getStorageRatingBucket(game: MultiplayerGame): 'async:og' | 'async:go' | null {
  if (game.ranked !== true) {
    return null
  }
  return game.mode === 'go' ? 'async:go' : 'async:og'
}

function gameToRow(game: MultiplayerGame, userId: string) {
  return {
    created_at: game.createdAt,
    current_turn: game.currentTurn,
    custom_game_code: game.customGameCode ?? null,
    daily_date_key: game.dailyDateKey ?? null,
    deadline_at: game.deadlineAt ?? null,
    difficulty: game.difficulty,
    ended_at: game.endedAt ?? null,
    go_puzzle_count: game.goPuzzleCount ?? null,
    host_user_id: game.playerUserIds?.['player-one'] ?? userId,
    id: game.id,
    matchmaking_request_id: game.matchmakingRequestId ?? null,
    mode: game.mode,
    player_one_user_id: game.playerUserIds?.['player-one'] ?? null,
    player_two_user_id: game.playerUserIds?.['player-two'] ?? null,
    projection: game,
    ranked: game.ranked === true,
    rating_bucket: getStorageRatingBucket(game),
    scope: game.scope,
    status: game.status,
    updated_at: game.updatedAt,
    winner_player_id: game.winnerId ?? null,
    word_length: game.wordLength,
  }
}

function rowToGame(row: MultiplayerGameRow): MultiplayerGame | undefined {
  return normalizeMultiplayerState({ games: [row.projection] }).games[0]
}

function hasGameProjectionChanged(previous: MultiplayerGame | undefined, next: MultiplayerGame): boolean {
  if (!previous) {
    return true
  }
  return JSON.stringify(previous) !== JSON.stringify(next)
}

async function saveMultiplayerGameRows(client: BrrrdleSupabaseClient, rows: readonly ReturnType<typeof gameToRow>[]): Promise<void> {
  if (rows.length === 0) {
    return
  }

  const ids = rows.map((row) => row.id)
  const existingResult = await client
    .from('async_multiplayer_games')
    .select('id')
    .in('id', ids)
  if (existingResult.error) {
    throw new Error(`Unable to inspect multiplayer games: ${existingResult.error.message}`)
  }

  const existingIds = new Set(
    Array.isArray(existingResult.data)
      ? existingResult.data.flatMap((row) => typeof (row as { readonly id?: unknown }).id === 'string' ? [(row as { readonly id: string }).id] : [])
      : [],
  )
  const insertRows = rows.filter((row) => !existingIds.has(row.id))
  const updateRows = rows.filter((row) => existingIds.has(row.id))

  if (insertRows.length > 0) {
    const { error } = await client.from('async_multiplayer_games').upsert(insertRows, {
      ignoreDuplicates: true,
      onConflict: 'id',
    })
    if (error) {
      throw new Error(`Unable to save multiplayer games: ${error.message}`)
    }
  }

  if (updateRows.length > 0) {
    await updateMultiplayerGameRows(client, updateRows)
  }
}

function isStaleIncomingGame(existing: MultiplayerGame | undefined, incoming: MultiplayerGame | undefined): boolean {
  if (!existing || !incoming || existing.id !== incoming.id) {
    return false
  }
  if (existing.playerUserIds?.['player-two'] && !incoming.playerUserIds?.['player-two']) {
    return true
  }
  if (existing.status !== 'waiting' && incoming.status === 'waiting') {
    return true
  }
  if (
    (existing.status === 'won' || existing.status === 'lost' || existing.status === 'expired')
    && incoming.status === 'playing'
    && incoming.moves.length <= existing.moves.length
  ) {
    return true
  }
  if (incoming.moves.length < existing.moves.length) {
    return true
  }
  const existingMoveIds = new Set(existing.moves.map((move) => move.id))
  const missingExistingMove = existing.moves.length > 0 && existing.moves.some((move) => !incoming.moves.some((incomingMove) => incomingMove.id === move.id))
  if (missingExistingMove && existingMoveIds.size >= incoming.moves.length) {
    return true
  }
  return false
}

async function loadExistingGameForUpdate(client: BrrrdleSupabaseClient, id: string): Promise<MultiplayerGame | undefined> {
  const result = await client
    .from('async_multiplayer_games')
    .select('projection')
    .eq('id', id)
    .maybeSingle()
  if (result.error) {
    return undefined
  }
  return rowToGame(result.data as MultiplayerGameRow)
}

async function updateMultiplayerGameRows(client: BrrrdleSupabaseClient, rows: readonly ReturnType<typeof gameToRow>[]): Promise<void> {
  for (const row of rows) {
    const existing = await loadExistingGameForUpdate(client, row.id)
    const incoming = normalizeMultiplayerState({ games: [row.projection] }).games[0]
    if (isStaleIncomingGame(existing, incoming)) {
      continue
    }
    const { error } = await client.from('async_multiplayer_games').update(row).eq('id', row.id)
    if (error) {
      throw new Error(`Unable to save multiplayer games: ${error.message}`)
    }
  }
}

export function createSupabaseMultiplayerRepository({ client, userId }: SupabaseMultiplayerRepositoryOptions): MultiplayerRepository {
  const channelName = `brrrdle-multiplayer:${userId}`
  let snapshot = createSnapshot(createEmptyMultiplayerState(), 0)
  const listeners = new Set<(next: MultiplayerRepositorySnapshot) => void>()
  const publish = () => {
    for (const listener of listeners) {
      listener(snapshot)
    }
  }

  const refresh = async () => {
    const [serverNow, gamesResult] = await Promise.all([
      (async () => {
        const { data, error } = await client.rpc('get_live_multiplayer_server_time')
        return error || typeof data !== 'string' ? new Date().toISOString() : data
      })(),
      client
        .from('async_multiplayer_games')
        .select('projection, created_at, updated_at')
        .order('updated_at', { ascending: false }),
    ])
    if (gamesResult.error) {
      return snapshot
    }
    const games = Array.isArray(gamesResult.data)
      ? gamesResult.data.flatMap((row) => rowToGame(row as MultiplayerGameRow) ?? [])
      : []
    snapshot = createSnapshot({ games }, snapshot.version + 1, serverNow)
    publish()
    return snapshot
  }

  return {
    getServerNow: async () => {
      const { data, error } = await client.rpc('get_live_multiplayer_server_time')
      if (error || typeof data !== 'string') {
        return new Date().toISOString()
      }
      return data
    },
    load: refresh,
    save: async (state, expectedVersion) => {
      if (expectedVersion !== undefined && expectedVersion !== snapshot.version) {
        throw new Error('Multiplayer repository version conflict.')
      }
      const previousGames = new Map(snapshot.state.games.map((game) => [game.id, game]))
      snapshot = createSnapshot(state, snapshot.version + 1)
      const rows = snapshot.state.games
        .filter((game) => game.playerUserIds?.['player-one'] === userId || game.playerUserIds?.['player-two'] === userId)
        .filter((game) => hasGameProjectionChanged(previousGames.get(game.id), game))
        .map((game) => gameToRow(game, userId))
      await saveMultiplayerGameRows(client, rows.filter((row) => row.host_user_id === userId))
      await updateMultiplayerGameRows(client, rows.filter((row) => row.host_user_id !== userId))
      publish()
      return snapshot
    },
    subscribe: (listener) => {
      listeners.add(listener)
      listener(snapshot)
      const channel = client.channel(channelName)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'async_multiplayer_games' },
          () => {
            void refresh()
          },
        )
        .subscribe()
      return () => {
        listeners.delete(listener)
        void client.removeChannel(channel)
      }
    },
  }
}

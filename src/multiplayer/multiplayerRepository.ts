import type { BrrrdleSupabaseClient } from '../account/supabaseClient'
import type { DifficultyTier } from '../data'
import type { GameMode, PlayScope, TileResult } from '../game/types'
import {
  createEmptyMultiplayerState,
  normalizeMultiplayerState,
  type MultiplayerGame,
  type MultiplayerState,
} from './multiplayer'
import {
  normalizeRatingBucket,
  type MultiplayerRatingTransaction,
  type RatingBucketId,
  type RatingOutcome,
} from './rating'

export interface MultiplayerRepositorySnapshot {
  readonly serverNow: string
  readonly state: MultiplayerState
  readonly version: number
}

export interface MultiplayerRepository {
  readonly getServerNow: () => Promise<string>
  readonly load: () => Promise<MultiplayerRepositorySnapshot>
  readonly save: (state: MultiplayerState, expectedVersion?: number) => Promise<MultiplayerRepositorySnapshot>
  readonly settleRankedGame: (game: MultiplayerGame) => Promise<TrustedRankedSettlementResult | undefined>
  readonly createRankedQueueRequest: (input: CreateRankedQueueRequestInput) => Promise<RankedQueueRequestResult>
  readonly cancelRankedQueueRequest: (requestId: string) => Promise<RankedQueueCancellationResult>
  readonly claimRankedQueuePair: (input: ClaimRankedQueuePairInput) => Promise<RankedQueueClaimResult>
  readonly getRankedQueueStatus: (requestId: string) => Promise<RankedQueueStatusResult>
  readonly finalizeRankedQueueGame: (input: FinalizeRankedQueueGameInput) => Promise<RankedQueueFinalizationResult>
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
    settleRankedGame: async () => undefined,
    createRankedQueueRequest: async () => {
      throw new Error('Ranked queue requires authenticated Supabase multiplayer.')
    },
    cancelRankedQueueRequest: async () => {
      throw new Error('Ranked queue requires authenticated Supabase multiplayer.')
    },
    claimRankedQueuePair: async () => {
      throw new Error('Ranked queue requires authenticated Supabase multiplayer.')
    },
    getRankedQueueStatus: async () => {
      throw new Error('Ranked queue requires authenticated Supabase multiplayer.')
    },
    finalizeRankedQueueGame: async () => {
      throw new Error('Ranked queue requires authenticated Supabase multiplayer.')
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
export type AuthenticatedLiveSpectatorStatus = 'playing' | 'won' | 'lost' | 'expired'

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

export interface AuthenticatedLiveSpectatorOutcome {
  readonly label: string
  readonly status: AuthenticatedLiveSpectatorStatus
  readonly terminal: boolean
  readonly terminalAt?: string
  readonly winnerSeat?: AuthenticatedLiveSpectatorSeat
}

export interface AuthenticatedLiveSpectatorGame {
  readonly createdAt: string
  readonly currentTurnSeat?: AuthenticatedLiveSpectatorSeat
  readonly dailyDateKey?: string
  readonly deadlineAt?: string
  readonly difficulty: DifficultyTier
  readonly endedAt?: string
  readonly goPuzzleCount?: number
  readonly hardMode: boolean
  readonly id: string
  readonly mode: GameMode
  readonly moves: readonly AuthenticatedLiveSpectatorMove[]
  readonly outcome: AuthenticatedLiveSpectatorOutcome
  readonly players: readonly AuthenticatedLiveSpectatorPlayer[]
  readonly progress: AuthenticatedLiveSpectatorProgress
  readonly ranked: boolean
  readonly ratingBucket?: string
  readonly scope: PlayScope
  readonly spectatorCapabilities: AuthenticatedLiveSpectatorCapabilities
  readonly status: AuthenticatedLiveSpectatorStatus
  readonly terminalAt?: string
  readonly terminalHoldUntil?: string
  readonly timeLimitMs?: number
  readonly updatedAt: string
  readonly wordLength: number
}

export interface TrustedRankedSettlementTransaction extends MultiplayerRatingTransaction {
  readonly idempotent: boolean
}

export interface TrustedRankedSettlementResult {
  readonly transactions: readonly TrustedRankedSettlementTransaction[]
}

export type RankedQueueRequestStatus = 'queued' | 'matched' | 'cancelled' | 'expired'
export type RankedQueueViewerSeat = 'player-one' | 'player-two'

export interface CreateRankedQueueRequestInput {
  readonly expiresAt?: string
  readonly hardMode?: boolean
  readonly idempotencyKey?: string
  readonly mode: GameMode
  readonly wordLength: number
}

export interface RankedQueueRequestResult {
  readonly expiresAt?: string
  readonly hardMode: boolean
  readonly queuedAt: string
  readonly ratingBucket: RatingBucketId
  readonly ratingSnapshot: number
  readonly requestId: string
  readonly requestStatus: RankedQueueRequestStatus
  readonly wordLength: number
}

export interface RankedQueueCancellationResult {
  readonly requestId: string
  readonly requestStatus: RankedQueueRequestStatus
}

export interface ClaimRankedQueuePairInput {
  readonly matchedGameId?: string
  readonly requestId: string
}

export interface RankedQueueClaimResult {
  readonly matchedGameId?: string
  readonly opponentRequestId?: string
  readonly requestId: string
  readonly requestStatus: RankedQueueRequestStatus
}

export interface RankedQueueStatusResult {
  readonly hardMode?: boolean
  readonly matchedAt?: string
  readonly matchedGameId?: string
  readonly mode?: GameMode
  readonly opponentRequestId?: string
  readonly playerOneUserId?: string
  readonly playerTwoUserId?: string
  readonly queuedAt: string
  readonly ratingBucket?: RatingBucketId
  readonly requestId: string
  readonly requestStatus: RankedQueueRequestStatus
  readonly scope?: PlayScope
  readonly timeLimitMs?: number
  readonly viewerSeat?: RankedQueueViewerSeat
  readonly wordLength?: number
}

export interface FinalizeRankedQueueGameInput {
  readonly game: MultiplayerGame
  readonly idempotencyKey?: string
  readonly matchedGameId: string
  readonly requestId: string
}

export interface RankedQueueFinalizationResult {
  readonly created: boolean
  readonly gameId: string
  readonly idempotent: boolean
  readonly opponentRequestId?: string
  readonly requestId: string
  readonly requestStatus: RankedQueueRequestStatus
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

const FORBIDDEN_TRUSTED_SETTLEMENT_KEYS = new Set([
  'answer',
  'answers',
  'answerWord',
  'answerWords',
  'email',
  'playerSessions',
  'player_sessions',
  'projection',
  'rawMoveId',
  'raw_move_id',
  'seed',
  'seeds',
  'serializedSession',
  'serialized_session',
])

const FORBIDDEN_RANKED_QUEUE_KEYS = new Set([
  'answer',
  'answers',
  'answerWord',
  'answerWords',
  'authId',
  'auth_id',
  'email',
  'playerSessions',
  'player_sessions',
  'projection',
  'rawMoveId',
  'raw_move_id',
  'seed',
  'seeds',
  'serializedSession',
  'serialized_session',
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

function hasForbiddenTrustedSettlementKey(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenTrustedSettlementKey)
  }
  if (!isRecord(value)) {
    return false
  }
  return Object.entries(value).some(([key, child]) => (
    FORBIDDEN_TRUSTED_SETTLEMENT_KEYS.has(key) || hasForbiddenTrustedSettlementKey(child)
  ))
}

function hasForbiddenRankedQueueKey(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenRankedQueueKey)
  }
  if (!isRecord(value)) {
    return false
  }
  return Object.entries(value).some(([key, child]) => (
    FORBIDDEN_RANKED_QUEUE_KEYS.has(key) || hasForbiddenRankedQueueKey(child)
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

function getNumberLike(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key]
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string' && value.trim()) {
    const numeric = Number(value)
    return Number.isFinite(numeric) ? numeric : undefined
  }
  return undefined
}

function getIntegerLike(record: Record<string, unknown>, key: string): number | undefined {
  const value = getNumberLike(record, key)
  return value !== undefined ? Math.round(value) : undefined
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

function parseSpectatorStatus(value: unknown): AuthenticatedLiveSpectatorStatus | undefined {
  return value === 'playing' || value === 'won' || value === 'lost' || value === 'expired' ? value : undefined
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

function parseTrustedSettlementBucket(value: unknown): RatingBucketId | undefined {
  if (
    value === 'async:og'
    || value === 'async:go'
    || value === 'multiplayer:og'
    || value === 'multiplayer:go'
  ) {
    return normalizeRatingBucket(value)
  }
  return undefined
}

function parseTrustedSettlementOutcome(value: unknown): RatingOutcome | undefined {
  return value === 'win' || value === 'loss' || value === 'draw' ? value : undefined
}

function parseRankedQueueRequestStatus(value: unknown): RankedQueueRequestStatus | undefined {
  return value === 'queued' || value === 'matched' || value === 'cancelled' || value === 'expired' ? value : undefined
}

function parseRankedQueueViewerSeat(value: unknown): RankedQueueViewerSeat | undefined {
  return value === 'player-one' || value === 'player-two' ? value : undefined
}

function parseRankedQueueBucket(value: unknown): RatingBucketId | undefined {
  return parseTrustedSettlementBucket(value)
}

function parseRankedQueueRequestRow(row: unknown): RankedQueueRequestResult | undefined {
  if (!isRecord(row) || hasForbiddenRankedQueueKey(row)) {
    return undefined
  }
  const requestId = getString(row, 'request_id')
  const requestStatus = parseRankedQueueRequestStatus(row.request_status)
  const ratingBucket = parseRankedQueueBucket(row.rating_bucket)
  const ratingSnapshot = getIntegerLike(row, 'rating_snapshot')
  const hardMode = getBoolean(row, 'hard_mode')
  const wordLength = getPositiveInteger(row, 'word_length')
  const queuedAt = getString(row, 'queued_at')
  if (!requestId || !requestStatus || !ratingBucket || ratingSnapshot === undefined || hardMode === undefined || !wordLength || !queuedAt) {
    return undefined
  }
  return {
    expiresAt: getString(row, 'expires_at'),
    hardMode,
    queuedAt,
    ratingBucket,
    ratingSnapshot,
    requestId,
    requestStatus,
    wordLength,
  }
}

function parseRankedQueueCancellationRow(row: unknown): RankedQueueCancellationResult | undefined {
  if (!isRecord(row) || hasForbiddenRankedQueueKey(row)) {
    return undefined
  }
  const requestId = getString(row, 'request_id')
  const requestStatus = parseRankedQueueRequestStatus(row.request_status)
  return requestId && requestStatus ? { requestId, requestStatus } : undefined
}

function parseRankedQueueClaimRow(row: unknown): RankedQueueClaimResult | undefined {
  if (!isRecord(row) || hasForbiddenRankedQueueKey(row)) {
    return undefined
  }
  const requestId = getString(row, 'request_id')
  const requestStatus = parseRankedQueueRequestStatus(row.request_status)
  if (!requestId || !requestStatus) {
    return undefined
  }
  return {
    matchedGameId: getString(row, 'matched_game_id'),
    opponentRequestId: getString(row, 'opponent_request_id'),
    requestId,
    requestStatus,
  }
}

function parseRankedQueueStatusRow(row: unknown): RankedQueueStatusResult | undefined {
  if (!isRecord(row) || hasForbiddenRankedQueueKey(row)) {
    return undefined
  }
  const requestId = getString(row, 'request_id')
  const requestStatus = parseRankedQueueRequestStatus(row.request_status)
  const queuedAt = getString(row, 'queued_at')
  if (!requestId || !requestStatus || !queuedAt) {
    return undefined
  }
  return {
    hardMode: getBoolean(row, 'hard_mode'),
    matchedAt: getString(row, 'matched_at'),
    matchedGameId: getString(row, 'matched_game_id'),
    mode: parseMode(row.mode),
    opponentRequestId: getString(row, 'opponent_request_id'),
    playerOneUserId: getString(row, 'player_one_user_id'),
    playerTwoUserId: getString(row, 'player_two_user_id'),
    queuedAt,
    ratingBucket: parseRankedQueueBucket(row.rating_bucket),
    requestId,
    requestStatus,
    scope: parseScope(row.scope),
    timeLimitMs: getPositiveInteger(row, 'time_limit_ms'),
    viewerSeat: parseRankedQueueViewerSeat(row.viewer_seat),
    wordLength: getPositiveInteger(row, 'word_length'),
  }
}

function parseRankedQueueFinalizationRow(row: unknown): RankedQueueFinalizationResult | undefined {
  if (!isRecord(row) || hasForbiddenRankedQueueKey(row)) {
    return undefined
  }
  const gameId = getString(row, 'game_id')
  const requestId = getString(row, 'request_id')
  const requestStatus = parseRankedQueueRequestStatus(row.request_status)
  const created = getBoolean(row, 'created')
  const idempotent = getBoolean(row, 'idempotent')
  if (!gameId || !requestId || !requestStatus || created === undefined || idempotent === undefined) {
    return undefined
  }
  return {
    created,
    gameId,
    idempotent,
    opponentRequestId: getString(row, 'opponent_request_id'),
    requestId,
    requestStatus,
  }
}

function parseSingleRpcRow<T>(value: unknown, parser: (row: unknown) => T | undefined, errorMessage: string): T {
  const rows = Array.isArray(value) ? value : [value]
  const parsed = rows.flatMap((row) => parser(row) ?? [])
  if (parsed.length !== 1) {
    throw new Error(errorMessage)
  }
  return parsed[0]
}

function parseTrustedRankedSettlementRow(row: unknown, now: string): TrustedRankedSettlementTransaction | undefined {
  if (!isRecord(row) || hasForbiddenTrustedSettlementKey(row)) {
    return undefined
  }
  const matchId = getString(row, 'match_result_id')
  const bucket = parseTrustedSettlementBucket(row.bucket)
  const userId = getString(row, 'user_id')
  const opponentUserId = getString(row, 'opponent_user_id')
  const outcome = parseTrustedSettlementOutcome(row.outcome)
  const oldRating = getIntegerLike(row, 'old_rating')
  const newRating = getIntegerLike(row, 'new_rating')
  const ratingDelta = getIntegerLike(row, 'rating_delta')
  const expectedScore = getNumberLike(row, 'expected_score')
  const idempotent = getBoolean(row, 'idempotent')
  if (
    !matchId || !bucket || !userId || !opponentUserId || !outcome
    || oldRating === undefined || newRating === undefined || ratingDelta === undefined
    || expectedScore === undefined || idempotent === undefined
  ) {
    return undefined
  }
  return {
    bucket,
    createdAt: now,
    expectedScore: Math.max(0, Math.min(1, expectedScore)),
    id: `trusted-${matchId}-${bucket}-${userId}`,
    idempotent,
    matchId,
    newRating,
    oldRating,
    opponentUserId,
    outcome,
    ratingDelta,
    userId,
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

function parseSpectatorOutcome(value: unknown): AuthenticatedLiveSpectatorOutcome | undefined {
  if (!isRecord(value)) {
    return undefined
  }
  const label = getString(value, 'label')
  const status = parseSpectatorStatus(value.status)
  const terminal = getBoolean(value, 'terminal')
  if (!label || !status || terminal === undefined) {
    return undefined
  }
  return {
    label,
    status,
    terminal,
    terminalAt: getString(value, 'terminalAt'),
    winnerSeat: parseSeat(value.winnerSeat),
  }
}

function parseAuthenticatedLiveSpectatorRow(row: unknown): AuthenticatedLiveSpectatorGame | undefined {
  if (!isRecord(row) || hasForbiddenSpectatorKey(row)) {
    return undefined
  }
  const id = getString(row, 'id')
  const scope = parseScope(row.scope)
  const mode = parseMode(row.mode)
  const status = parseSpectatorStatus(row.status)
  const wordLength = getPositiveInteger(row, 'word_length')
  const difficulty = parseDifficulty(row.difficulty)
  const hardMode = getBoolean(row, 'hard_mode')
  const ranked = getBoolean(row, 'ranked')
  const createdAt = getString(row, 'created_at')
  const updatedAt = getString(row, 'updated_at')
  const endedAt = getString(row, 'ended_at')
  const terminalAt = getString(row, 'terminal_at')
  const terminalHoldUntil = getString(row, 'terminal_hold_until')
  const players = parseSpectatorPlayers(row.players)
  const moves = parseSpectatorMoves(row.moves)
  const outcome = parseSpectatorOutcome(row.outcome)
  const progress = parseSpectatorProgress(row.progress)
  const spectatorCapabilities = parseSpectatorCapabilities(row.spectator_capabilities)
  const terminal = status !== undefined && status !== 'playing'
  if (
    !id || !scope || !mode || !status || !wordLength || !difficulty
    || hardMode === undefined || ranked === undefined || !createdAt || !updatedAt
    || !players || !moves || !outcome || !progress || !spectatorCapabilities
  ) {
    return undefined
  }
  if (outcome.status !== status || outcome.terminal !== terminal) {
    return undefined
  }
  if (terminal && (!terminalAt || !terminalHoldUntil)) {
    return undefined
  }
  return {
    createdAt,
    currentTurnSeat: parseSeat(row.current_turn_seat),
    dailyDateKey: getString(row, 'daily_date_key'),
    deadlineAt: getString(row, 'deadline_at'),
    difficulty,
    endedAt,
    goPuzzleCount: getPositiveInteger(row, 'go_puzzle_count'),
    hardMode,
    id,
    mode,
    moves,
    outcome,
    players,
    progress,
    ranked,
    ratingBucket: getString(row, 'rating_bucket'),
    scope,
    spectatorCapabilities,
    status,
    terminalAt,
    terminalHoldUntil,
    timeLimitMs: getPositiveInteger(row, 'time_limit_ms'),
    updatedAt,
    wordLength,
  }
}

function getUtcDateKey(now: Date): string {
  return Number.isNaN(now.getTime()) ? new Date().toISOString().slice(0, 10) : now.toISOString().slice(0, 10)
}

function isCurrentDailyLiveSpectatorRow(row: AuthenticatedLiveSpectatorGame, now: Date): boolean {
  return row.scope === 'daily' && row.dailyDateKey === getUtcDateKey(now)
}

export function normalizeAuthenticatedLiveSpectatorRows(
  value: unknown,
  now = new Date(),
): readonly AuthenticatedLiveSpectatorGame[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value
    .flatMap((row) => parseAuthenticatedLiveSpectatorRow(row) ?? [])
    .filter((row) => !isCurrentDailyLiveSpectatorRow(row, now))
}

export function normalizeTrustedRankedSettlementRows(
  value: unknown,
  now = new Date().toISOString(),
): readonly TrustedRankedSettlementTransaction[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.flatMap((row) => parseTrustedRankedSettlementRow(row, now) ?? [])
}

export async function loadAuthenticatedLiveSpectatorRows(
  client: BrrrdleSupabaseClient,
  limit = 50,
  terminalWindowSeconds = 15,
  now = new Date(),
): Promise<readonly AuthenticatedLiveSpectatorGame[]> {
  const { data, error } = await client.rpc('get_authenticated_live_v1_spectator_games_v2', {
    p_limit: Math.max(0, Math.min(100, Math.floor(limit))),
    p_terminal_window_seconds: Math.max(0, Math.min(60, Math.floor(terminalWindowSeconds))),
  })
  if (error) {
    return []
  }
  return normalizeAuthenticatedLiveSpectatorRows(data, now)
}

function getStorageRatingBucket(game: MultiplayerGame): 'async:og' | 'async:go' | null {
  if (game.ranked !== true) {
    return null
  }
  return game.mode === 'go' ? 'async:go' : 'async:og'
}

export function isTrustedRankedPracticeSettlementCandidate(game: MultiplayerGame): boolean {
  return game.ranked === true
    && game.scope === 'practice'
    && !game.customGameCode
    && !(typeof game.timeLimitMs === 'number' && game.timeLimitMs > 0)
    && (game.status === 'won' || game.status === 'lost')
    && typeof game.matchmakingRequestId === 'string'
    && game.matchmakingRequestId.trim().length > 0
    && typeof game.playerUserIds?.['player-one'] === 'string'
    && typeof game.playerUserIds?.['player-two'] === 'string'
    && game.playerUserIds['player-one'] !== game.playerUserIds['player-two']
    && getStorageRatingBucket(game) !== null
}

function getTrustedSettlementIdempotencyKey(game: MultiplayerGame): string | undefined {
  const bucket = getStorageRatingBucket(game)
  return bucket ? `phase27-ranked-v1:async:${game.id}:${bucket}` : undefined
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
    settleRankedGame: async (game) => {
      if (!isTrustedRankedPracticeSettlementCandidate(game)) {
        return undefined
      }
      const idempotencyKey = getTrustedSettlementIdempotencyKey(game)
      if (!idempotencyKey) {
        return undefined
      }
      const { data, error } = await client.rpc('settle_ranked_async_multiplayer_match', {
        p_game_id: game.id,
        p_idempotency_key: idempotencyKey,
      })
      if (error) {
        throw new Error(`Unable to settle ranked multiplayer game: ${error.message}`)
      }
      const transactions = normalizeTrustedRankedSettlementRows(data)
      if (transactions.length !== 2) {
        throw new Error('Unable to parse ranked multiplayer settlement result.')
      }
      return { transactions }
    },
    createRankedQueueRequest: async (input) => {
      const { data, error } = await client.rpc('create_ranked_async_matchmaking_request', {
        p_expires_at: input.expiresAt ?? null,
        p_hard_mode: input.hardMode === true,
        p_idempotency_key: input.idempotencyKey ?? null,
        p_mode: input.mode,
        p_scope: 'practice',
        p_time_limit_ms: null,
        p_word_length: input.wordLength,
      })
      if (error) {
        throw new Error(`Unable to create ranked queue request: ${error.message}`)
      }
      return parseSingleRpcRow(data, parseRankedQueueRequestRow, 'Unable to parse ranked queue request result.')
    },
    cancelRankedQueueRequest: async (requestId) => {
      const { data, error } = await client.rpc('cancel_ranked_async_matchmaking_request', {
        p_request_id: requestId,
      })
      if (error) {
        throw new Error(`Unable to cancel ranked queue request: ${error.message}`)
      }
      return parseSingleRpcRow(data, parseRankedQueueCancellationRow, 'Unable to parse ranked queue cancellation result.')
    },
    claimRankedQueuePair: async (input) => {
      const { data, error } = await client.rpc('claim_ranked_async_matchmaking_pair', {
        p_matched_game_id: input.matchedGameId ?? null,
        p_request_id: input.requestId,
      })
      if (error) {
        throw new Error(`Unable to claim ranked queue pair: ${error.message}`)
      }
      return parseSingleRpcRow(data, parseRankedQueueClaimRow, 'Unable to parse ranked queue claim result.')
    },
    getRankedQueueStatus: async (requestId) => {
      const { data, error } = await client.rpc('get_ranked_async_matchmaking_status', {
        p_request_id: requestId,
      })
      if (error) {
        throw new Error(`Unable to load ranked queue status: ${error.message}`)
      }
      return parseSingleRpcRow(data, parseRankedQueueStatusRow, 'Unable to parse ranked queue status result.')
    },
    finalizeRankedQueueGame: async (input) => {
      const { data, error } = await client.rpc('finalize_ranked_async_matchmaking_game', {
        p_game_projection: input.game,
        p_idempotency_key: input.idempotencyKey ?? null,
        p_matched_game_id: input.matchedGameId,
        p_request_id: input.requestId,
      })
      if (error) {
        throw new Error(`Unable to finalize ranked queue game: ${error.message}`)
      }
      return parseSingleRpcRow(data, parseRankedQueueFinalizationRow, 'Unable to parse ranked queue finalization result.')
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

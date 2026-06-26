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
  getRankedPracticeRatingBucket,
  getRankedPracticeStorageBucket,
  normalizeRankedPracticeTimeLimitMs,
  parseRatingBucket,
  type MultiplayerRatingTransaction,
  type RankedPracticeStorageBucketId,
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
  readonly requestPracticeRematch: (input: RequestPracticeRematchInput) => Promise<PracticeRematchRequestResult>
  readonly listPracticeRematchRequests: (input?: ListPracticeRematchRequestsInput) => Promise<readonly PracticeRematchRequestResult[]>
  readonly cancelPracticeRematch: (requestId: string) => Promise<PracticeRematchRequestResult>
  readonly declinePracticeRematch: (requestId: string) => Promise<PracticeRematchRequestResult>
  readonly acceptPracticeRematch: (input: AcceptPracticeRematchInput) => Promise<PracticeRematchRequestResult>
  readonly getParticipantIdentitySummaries: (input: GetParticipantIdentitySummariesInput) => Promise<readonly ParticipantIdentitySummaryResult[]>
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
    requestPracticeRematch: async () => {
      throw new Error('Practice rematch requests require authenticated Supabase multiplayer.')
    },
    listPracticeRematchRequests: async () => [],
    cancelPracticeRematch: async () => {
      throw new Error('Practice rematch requests require authenticated Supabase multiplayer.')
    },
    declinePracticeRematch: async () => {
      throw new Error('Practice rematch requests require authenticated Supabase multiplayer.')
    },
    acceptPracticeRematch: async () => {
      throw new Error('Practice rematch requests require authenticated Supabase multiplayer.')
    },
    getParticipantIdentitySummaries: async () => [],
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
  readonly timeLimitMs?: number | null
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
  readonly timeLimitMs?: number
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

export type PracticeRematchRequestStatus = 'cancelled' | 'created' | 'declined' | 'expired' | 'requested'
export type PracticeRematchViewerRole = 'opponent' | 'participant' | 'requester'

export interface PracticeRematchRequestResult {
  readonly created: boolean
  readonly createdAt: string
  readonly createdGameId?: string
  readonly expired: boolean
  readonly expiresAt: string
  readonly goPuzzleCount?: number
  readonly hardMode: boolean
  readonly idempotent: boolean
  readonly mode: GameMode
  readonly opponentSeat: RankedQueueViewerSeat
  readonly requestId: string
  readonly requesterSeat: RankedQueueViewerSeat
  readonly requestStatus: PracticeRematchRequestStatus
  readonly respondedAt?: string
  readonly sourceGameId: string
  readonly timeLimitMs?: number
  readonly updatedAt: string
  readonly viewerCanAccept: boolean
  readonly viewerCanCancel: boolean
  readonly viewerRole: PracticeRematchViewerRole
  readonly wordLength: number
}

export interface RequestPracticeRematchInput {
  readonly expiresAt?: string
  readonly idempotencyKey?: string
  readonly sourceGameId: string
}

export interface ListPracticeRematchRequestsInput {
  readonly limit?: number
  readonly sourceGameId?: string | null
}

export interface AcceptPracticeRematchInput {
  readonly game: MultiplayerGame
  readonly idempotencyKey?: string
  readonly requestId: string
}

export interface GetParticipantIdentitySummariesInput {
  readonly gameId?: string | null
  readonly rankedRequestId?: string | null
}

export interface ParticipantIdentitySummaryResult {
  readonly accentColor?: string
  readonly avatarUrl?: string
  readonly displayName?: string
  readonly flairKey?: string
  readonly identityAvailable: boolean
  readonly isViewer: boolean
  readonly publicProfileId?: string
  readonly seat: RankedQueueViewerSeat
  readonly updatedAt?: string
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

const PRACTICE_REMATCH_ALLOWED_KEYS = new Set([
  'created',
  'created_at',
  'created_game_id',
  'expires_at',
  'go_puzzle_count',
  'hard_mode',
  'idempotent',
  'mode',
  'opponent_seat',
  'request_id',
  'request_status',
  'requester_seat',
  'responded_at',
  'source_game_id',
  'time_limit_ms',
  'updated_at',
  'viewer_can_accept',
  'viewer_can_cancel',
  'viewer_role',
  'word_length',
])

const PARTICIPANT_IDENTITY_ALLOWED_KEYS = new Set([
  'accent_color',
  'avatar_url',
  'display_name',
  'flair_key',
  'identity_available',
  'is_viewer',
  'public_profile_id',
  'seat',
  'updated_at',
])

const FORBIDDEN_PRACTICE_REMATCH_KEYS = new Set([
  'accept_idempotency_key',
  'answer',
  'answers',
  'answerWord',
  'answerWords',
  'authId',
  'auth_id',
  'auth_user_id',
  'daily_claim_id',
  'email',
  'hostUserId',
  'host_user_id',
  'match_id',
  'matchmaking_request_id',
  'opponent_user_id',
  'playerOneUserId',
  'playerSessions',
  'playerTwoUserId',
  'playerUserIds',
  'player_one_user_id',
  'player_sessions',
  'player_two_user_id',
  'player_user_ids',
  'projection',
  'queue_id',
  'rating_bucket',
  'rating_transaction_id',
  'rawMoveId',
  'raw_move_id',
  'request_idempotency_key',
  'requester_user_id',
  'seed',
  'seeds',
  'serializedSession',
  'serialized_session',
  'session',
  'sessions',
  'settlement_id',
  'token',
  'tokens',
  'userId',
  'user_id',
])

const FORBIDDEN_PARTICIPANT_IDENTITY_KEYS = new Set([
  'answer',
  'answers',
  'answerWord',
  'answerWords',
  'authId',
  'auth_id',
  'auth_user_id',
  'email',
  'game_id',
  'hostUserId',
  'host_user_id',
  'match_id',
  'matchmaking_request_id',
  'matched_game_id',
  'matched_match_id',
  'opponent_request_id',
  'owner_user_id',
  'playerOneUserId',
  'playerSessions',
  'playerTwoUserId',
  'playerUserIds',
  'player_one_user_id',
  'player_sessions',
  'player_two_user_id',
  'player_user_ids',
  'profile_owner_id',
  'projection',
  'queue_id',
  'rating_snapshot',
  'rating_transaction_id',
  'rawMoveId',
  'raw_move_id',
  'request_id',
  'seed',
  'seeds',
  'serializedSession',
  'serialized_session',
  'session',
  'sessions',
  'settlement_id',
  'token',
  'tokens',
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

function hasForbiddenPracticeRematchKey(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenPracticeRematchKey)
  }
  if (!isRecord(value)) {
    return false
  }
  return Object.entries(value).some(([key, child]) => (
    FORBIDDEN_PRACTICE_REMATCH_KEYS.has(key) || hasForbiddenPracticeRematchKey(child)
  ))
}

function hasForbiddenParticipantIdentityKey(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some(hasForbiddenParticipantIdentityKey)
  }
  if (!isRecord(value)) {
    return false
  }
  return Object.entries(value).some(([key, child]) => (
    FORBIDDEN_PARTICIPANT_IDENTITY_KEYS.has(key) || hasForbiddenParticipantIdentityKey(child)
  ))
}

function hasOnlyPracticeRematchKeys(record: Record<string, unknown>): boolean {
  return Object.keys(record).every((key) => PRACTICE_REMATCH_ALLOWED_KEYS.has(key))
}

function hasOnlyParticipantIdentityKeys(record: Record<string, unknown>): boolean {
  return Object.keys(record).every((key) => PARTICIPANT_IDENTITY_ALLOWED_KEYS.has(key))
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
  return parseRatingBucket(value)
}

function parseRankedQueueTimeLimitMs(value: unknown): { readonly ok: true; readonly value?: number } | { readonly ok: false } {
  if (value === null || value === undefined) {
    return { ok: true }
  }
  const timeLimitMs = getIntegerLike({ time_limit_ms: value }, 'time_limit_ms')
  if (timeLimitMs === undefined) {
    return { ok: false }
  }
  const normalizedTimeLimitMs = normalizeRankedPracticeTimeLimitMs(timeLimitMs)
  if (normalizedTimeLimitMs === undefined) {
    return { ok: false }
  }
  return normalizedTimeLimitMs === null ? { ok: true } : { ok: true, value: normalizedTimeLimitMs }
}

function isRankedQueueBucketCompatible(mode: GameMode | undefined, bucket: RatingBucketId | undefined, timeLimitMs: number | undefined): boolean {
  if (!mode || !bucket) {
    return true
  }
  return getRankedPracticeRatingBucket(mode, timeLimitMs ?? null) === bucket
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

function parsePracticeRematchRequestStatus(value: unknown): PracticeRematchRequestStatus | undefined {
  return value === 'requested' || value === 'created' || value === 'declined' || value === 'cancelled' || value === 'expired'
    ? value
    : undefined
}

function parsePracticeRematchViewerRole(value: unknown): PracticeRematchViewerRole | undefined {
  return value === 'requester' || value === 'opponent' || value === 'participant' ? value : undefined
}

function parseTimestamp(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined
  }
  return Number.isNaN(Date.parse(value)) ? undefined : value
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
  const timeLimitMs = parseRankedQueueTimeLimitMs(row.time_limit_ms)
  const ratingSnapshot = getIntegerLike(row, 'rating_snapshot')
  const hardMode = getBoolean(row, 'hard_mode')
  const wordLength = getPositiveInteger(row, 'word_length')
  const queuedAt = getString(row, 'queued_at')
  if (
    !requestId || !requestStatus || !ratingBucket || !timeLimitMs.ok
    || ratingSnapshot === undefined || hardMode === undefined || !wordLength || !queuedAt
  ) {
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
    timeLimitMs: timeLimitMs.value,
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
  const mode = parseMode(row.mode)
  const ratingBucket = parseRankedQueueBucket(row.rating_bucket)
  const timeLimitMs = parseRankedQueueTimeLimitMs(row.time_limit_ms)
  if (!requestId || !requestStatus || !queuedAt) {
    return undefined
  }
  if (!timeLimitMs.ok || !isRankedQueueBucketCompatible(mode, ratingBucket, timeLimitMs.value)) {
    return undefined
  }
  return {
    hardMode: getBoolean(row, 'hard_mode'),
    matchedAt: getString(row, 'matched_at'),
    matchedGameId: getString(row, 'matched_game_id'),
    mode,
    opponentRequestId: getString(row, 'opponent_request_id'),
    playerOneUserId: getString(row, 'player_one_user_id'),
    playerTwoUserId: getString(row, 'player_two_user_id'),
    queuedAt,
    ratingBucket,
    requestId,
    requestStatus,
    scope: parseScope(row.scope),
    timeLimitMs: timeLimitMs.value,
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

function parsePracticeRematchRequestRow(row: unknown, now = new Date()): PracticeRematchRequestResult | undefined {
  if (!isRecord(row) || !hasOnlyPracticeRematchKeys(row) || hasForbiddenPracticeRematchKey(row)) {
    return undefined
  }
  const requestId = getString(row, 'request_id')
  const sourceGameId = getString(row, 'source_game_id')
  const requestStatus = parsePracticeRematchRequestStatus(row.request_status)
  const requesterSeat = parseRankedQueueViewerSeat(row.requester_seat)
  const opponentSeat = parseRankedQueueViewerSeat(row.opponent_seat)
  const viewerRole = parsePracticeRematchViewerRole(row.viewer_role)
  const viewerCanAccept = getBoolean(row, 'viewer_can_accept')
  const viewerCanCancel = getBoolean(row, 'viewer_can_cancel')
  const mode = parseMode(row.mode)
  const wordLength = getPositiveInteger(row, 'word_length')
  const hardMode = getBoolean(row, 'hard_mode')
  const timeLimitMs = getPositiveInteger(row, 'time_limit_ms')
  const goPuzzleCount = getPositiveInteger(row, 'go_puzzle_count')
  const createdAt = parseTimestamp(row.created_at)
  const expiresAt = parseTimestamp(row.expires_at)
  const respondedAt = parseTimestamp(row.responded_at)
  const updatedAt = parseTimestamp(row.updated_at)
  const created = getBoolean(row, 'created')
  const idempotent = getBoolean(row, 'idempotent')
  const createdGameId = getString(row, 'created_game_id')

  if (
    !requestId || !sourceGameId || !requestStatus || !requesterSeat || !opponentSeat || !viewerRole
    || viewerCanAccept === undefined || viewerCanCancel === undefined || !mode || !wordLength
    || hardMode === undefined || !createdAt || !expiresAt || !updatedAt
    || created === undefined || idempotent === undefined
  ) {
    return undefined
  }
  if (requesterSeat === opponentSeat) {
    return undefined
  }
  if (mode === 'go' && goPuzzleCount === undefined) {
    return undefined
  }
  if (mode === 'og' && goPuzzleCount !== undefined) {
    return undefined
  }
  if (requestStatus === 'created' && !createdGameId) {
    return undefined
  }

  const expiresAtMs = Date.parse(expiresAt)
  const nowMs = Number.isFinite(now.getTime()) ? now.getTime() : Date.now()
  const expired = requestStatus === 'expired' || expiresAtMs <= nowMs
  const createdState = created || requestStatus === 'created'

  return {
    created: createdState,
    createdAt,
    createdGameId,
    expired,
    expiresAt,
    goPuzzleCount,
    hardMode,
    idempotent,
    mode,
    opponentSeat,
    requestId,
    requesterSeat,
    requestStatus,
    respondedAt,
    sourceGameId,
    timeLimitMs,
    updatedAt,
    viewerCanAccept: expired ? false : viewerCanAccept,
    viewerCanCancel,
    viewerRole,
    wordLength,
  }
}

function parseParticipantIdentitySummaryRow(row: unknown): ParticipantIdentitySummaryResult | undefined {
  if (!isRecord(row) || !hasOnlyParticipantIdentityKeys(row) || hasForbiddenParticipantIdentityKey(row)) {
    return undefined
  }
  const seat = parseRankedQueueViewerSeat(row.seat)
  const isViewer = getBoolean(row, 'is_viewer')
  const identityAvailable = getBoolean(row, 'identity_available')
  if (!seat || isViewer === undefined || identityAvailable === undefined) {
    return undefined
  }
  const publicProfileId = getString(row, 'public_profile_id')
  const displayName = getString(row, 'display_name')
  const updatedAt = parseTimestamp(row.updated_at)
  if (identityAvailable && (!publicProfileId || !displayName || !updatedAt)) {
    return undefined
  }
  return {
    accentColor: identityAvailable ? getString(row, 'accent_color') : undefined,
    avatarUrl: identityAvailable ? getString(row, 'avatar_url') : undefined,
    displayName: identityAvailable ? displayName : undefined,
    flairKey: identityAvailable ? getString(row, 'flair_key') : undefined,
    identityAvailable,
    isViewer,
    publicProfileId: identityAvailable ? publicProfileId : undefined,
    seat,
    updatedAt: identityAvailable ? updatedAt : undefined,
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

export function normalizePracticeRematchRequestRows(
  value: unknown,
  now = new Date(),
): readonly PracticeRematchRequestResult[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.flatMap((row) => parsePracticeRematchRequestRow(row, now) ?? [])
}

export function normalizeParticipantIdentitySummaryRows(value: unknown): readonly ParticipantIdentitySummaryResult[] {
  if (!Array.isArray(value)) {
    return []
  }
  return value.flatMap((row) => parseParticipantIdentitySummaryRow(row) ?? [])
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

function getExpectedRankedPracticeRatingBucket(game: Pick<MultiplayerGame, 'mode' | 'ratingBucket' | 'timeLimitMs'>): RatingBucketId | null {
  const expectedBucket = getRankedPracticeRatingBucket(game.mode, game.timeLimitMs)
  if (!expectedBucket || (game.ratingBucket && game.ratingBucket !== expectedBucket)) {
    return null
  }
  return expectedBucket
}

function getStorageRatingBucket(game: MultiplayerGame): RankedPracticeStorageBucketId | null {
  if (game.ranked !== true) {
    return null
  }
  const expectedBucket = getExpectedRankedPracticeRatingBucket(game)
  return expectedBucket ? getRankedPracticeStorageBucket(expectedBucket) : null
}

export function isTrustedRankedPracticeSettlementCandidate(game: MultiplayerGame): boolean {
  return game.ranked === true
    && game.scope === 'practice'
    && !game.customGameCode
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
  if (!bucket) {
    return undefined
  }
  const namespace = bucket.includes(':timed:v1') ? 'phase33-ranked-timed-v1' : 'phase27-ranked-v1'
  return `${namespace}:async:${game.id}:${bucket}`
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
      const timeLimitMs = normalizeRankedPracticeTimeLimitMs(input.timeLimitMs)
      if (timeLimitMs === undefined) {
        throw new Error('Timed Practice ranked supports only the canonical five-minute clock.')
      }
      const { data, error } = await client.rpc('create_ranked_async_matchmaking_request', {
        p_expires_at: input.expiresAt ?? null,
        p_hard_mode: input.hardMode === true,
        p_idempotency_key: input.idempotencyKey ?? null,
        p_mode: input.mode,
        p_scope: 'practice',
        p_time_limit_ms: timeLimitMs,
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
    requestPracticeRematch: async (input) => {
      const { data, error } = await client.rpc('request_practice_multiplayer_rematch', {
        p_expires_at: input.expiresAt ?? null,
        p_idempotency_key: input.idempotencyKey ?? null,
        p_source_game_id: input.sourceGameId,
      })
      if (error) {
        throw new Error(`Unable to request Practice rematch: ${error.message}`)
      }
      return parseSingleRpcRow(
        data,
        (row) => parsePracticeRematchRequestRow(row),
        'Unable to parse Practice rematch request result.',
      )
    },
    listPracticeRematchRequests: async (input = {}) => {
      const limit = input.limit ?? 50
      if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        throw new Error('Practice rematch request limit must be between 1 and 100.')
      }
      const { data, error } = await client.rpc('get_practice_multiplayer_rematch_requests', {
        p_limit: limit,
        p_source_game_id: input.sourceGameId ?? null,
      })
      if (error) {
        return []
      }
      return normalizePracticeRematchRequestRows(data)
    },
    cancelPracticeRematch: async (requestId) => {
      const { data, error } = await client.rpc('cancel_practice_multiplayer_rematch', {
        p_request_id: requestId,
      })
      if (error) {
        throw new Error(`Unable to cancel Practice rematch: ${error.message}`)
      }
      return parseSingleRpcRow(
        data,
        (row) => parsePracticeRematchRequestRow(row),
        'Unable to parse Practice rematch cancellation result.',
      )
    },
    declinePracticeRematch: async (requestId) => {
      const { data, error } = await client.rpc('decline_practice_multiplayer_rematch', {
        p_request_id: requestId,
      })
      if (error) {
        throw new Error(`Unable to decline Practice rematch: ${error.message}`)
      }
      return parseSingleRpcRow(
        data,
        (row) => parsePracticeRematchRequestRow(row),
        'Unable to parse Practice rematch decline result.',
      )
    },
    acceptPracticeRematch: async (input) => {
      const { data, error } = await client.rpc('accept_practice_multiplayer_rematch', {
        p_game_projection: input.game,
        p_idempotency_key: input.idempotencyKey ?? null,
        p_request_id: input.requestId,
      })
      if (error) {
        throw new Error(`Unable to accept Practice rematch: ${error.message}`)
      }
      return parseSingleRpcRow(
        data,
        (row) => parsePracticeRematchRequestRow(row),
        'Unable to parse Practice rematch accept result.',
      )
    },
    getParticipantIdentitySummaries: async (input) => {
      const gameId = typeof input.gameId === 'string' && input.gameId.trim() ? input.gameId : null
      const rankedRequestId = typeof input.rankedRequestId === 'string' && input.rankedRequestId.trim() ? input.rankedRequestId : null
      if ((gameId && rankedRequestId) || (!gameId && !rankedRequestId)) {
        throw new Error('Exactly one participant identity context is required.')
      }
      const { data, error } = await client.rpc('get_multiplayer_participant_identity_summaries', {
        p_game_id: gameId,
        p_ranked_request_id: rankedRequestId,
      })
      if (error) {
        throw new Error(`Unable to load participant identity summaries: ${error.message}`)
      }
      return normalizeParticipantIdentitySummaryRows(data)
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

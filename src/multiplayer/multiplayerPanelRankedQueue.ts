import type { DifficultyTier } from '../data'
import type { GoPuzzleCount } from '../game/constants'
import type { GameMode } from '../game/types'
import type { MultiplayerProfileSummary } from './dailyMultiplayer'
import {
  createMultiplayerGame,
  type MultiplayerGame,
  type MultiplayerPlayerId,
  type PracticeMultiplayerTimeLimitMs,
} from './multiplayer'
import type { CreateRankedQueueRequestInput, RankedQueueStatusResult } from './multiplayerRepository'
import {
  normalizeRankedPracticeTimeLimitMs,
  TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
} from './rating'

export interface RankedQueueSelectionSettings {
  readonly hardMode: boolean
  readonly mode: GameMode
  readonly timeLimitMs?: PracticeMultiplayerTimeLimitMs | null
  readonly wordLength: number
}

export interface BuildFinalizedRankedGameInput {
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly status: RankedQueueStatusResult
  readonly viewerProfile?: MultiplayerProfileSummary
}

function getRankedPracticeTimeLimitMs(value: unknown): PracticeMultiplayerTimeLimitMs | null | undefined {
  const normalized = normalizeRankedPracticeTimeLimitMs(value)
  if (normalized === undefined) {
    return undefined
  }
  return normalized === null ? null : TIMED_RANKED_PRACTICE_TIME_LIMIT_MS
}

export function buildRankedQueueRequestInput(
  settings: RankedQueueSelectionSettings,
): CreateRankedQueueRequestInput | undefined {
  const timeLimitMs = getRankedPracticeTimeLimitMs(settings.timeLimitMs)
  if (timeLimitMs === undefined) {
    return undefined
  }
  return {
    hardMode: settings.hardMode,
    mode: settings.mode,
    timeLimitMs,
    wordLength: settings.wordLength,
  }
}

export function getRankedQueueFinalizationIdempotencyKey(status: RankedQueueStatusResult): string | undefined {
  if (!status.matchedGameId) {
    return undefined
  }
  const namespace = status.timeLimitMs === TIMED_RANKED_PRACTICE_TIME_LIMIT_MS
    ? 'phase33-ranked-timed-v1'
    : 'phase27-ranked-v1'
  return `${namespace}:finalize:${status.matchedGameId}`
}

export function buildFinalizedRankedGameFromStatus({
  defaultDifficulty,
  defaultGoPuzzleCount,
  status,
  viewerProfile,
}: BuildFinalizedRankedGameInput): MultiplayerGame | undefined {
  const rankedTimeLimitMs = getRankedPracticeTimeLimitMs(status.timeLimitMs)
  if (
    status.requestStatus !== 'matched'
    || !status.matchedGameId
    || !status.mode
    || status.scope !== 'practice'
    || !status.ratingBucket
    || !status.wordLength
    || status.hardMode === undefined
    || rankedTimeLimitMs === undefined
    || !status.playerOneUserId
    || !status.playerTwoUserId
    || status.playerOneUserId === status.playerTwoUserId
    || !status.viewerSeat
  ) {
    return undefined
  }
  const playerProfiles: Partial<Record<MultiplayerPlayerId, MultiplayerProfileSummary>> | undefined = viewerProfile
    ? { [status.viewerSeat]: viewerProfile }
    : undefined
  return createMultiplayerGame({
    createdAt: status.matchedAt ?? status.queuedAt,
    difficulty: defaultDifficulty,
    goPuzzleCount: defaultGoPuzzleCount,
    hardMode: status.hardMode,
    id: status.matchedGameId,
    matchmakingRequestId: status.requestId,
    mode: status.mode,
    playerProfiles,
    playerUserIds: {
      'player-one': status.playerOneUserId,
      'player-two': status.playerTwoUserId,
    },
    ranked: true,
    ratingBucket: status.ratingBucket,
    scope: 'practice',
    timeLimitMs: rankedTimeLimitMs,
    wordLength: status.wordLength,
  })
}

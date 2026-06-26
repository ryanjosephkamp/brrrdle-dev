import type { GameMode, PlayScope } from '../game/types'
import { getUtcDailyDateKey } from '../daily'
import {
  getRankedPracticeRatingBucket,
  getRatingBucket,
  normalizeRankedPracticeTimeLimitMs,
  type RatingBucketId,
} from './rating'

export type MatchmakingStatus = 'queued' | 'matched' | 'cancelled' | 'expired'

export interface MatchmakingRequest {
  readonly createdAt: string
  readonly dailyDateKey?: string
  readonly expiresAt?: string
  readonly hardMode?: boolean
  readonly id: string
  readonly mode: GameMode
  readonly rating: number
  readonly ratingBucket: RatingBucketId
  readonly ranked: boolean
  readonly scope: PlayScope
  readonly status: MatchmakingStatus
  readonly timeLimitMs?: number
  readonly userId: string
  readonly wordLength?: number
}

export interface MatchmakingSelection {
  readonly left: MatchmakingRequest
  readonly reason: string
  readonly right: MatchmakingRequest
  readonly ratingGap: number
  readonly searchBand: number
}

export interface CreateMatchmakingRequestInput {
  readonly createdAt?: string
  readonly dailyDateKey?: string
  readonly hardMode?: boolean
  readonly id?: string
  readonly mode: GameMode
  readonly rating?: number
  readonly ranked?: boolean
  readonly scope: PlayScope
  readonly timeLimitMs?: number | null
  readonly userId: string
  readonly wordLength?: number
}

export interface RankedMatchmakingEligibilityInput {
  readonly ranked?: boolean
  readonly scope: PlayScope
  readonly timeLimitMs?: number | null
}

export interface RankedMatchmakingEligibility {
  readonly eligible: boolean
  readonly reason: string
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function normalizeRatingSnapshot(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : 1200
}

function normalizePracticeTimeLimitMs(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.trunc(value) : undefined
}

function parseTime(value: string): number | undefined {
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function isExpired(expiresAt: string | undefined, now: Date): boolean {
  if (!expiresAt) {
    return false
  }
  const expiresAtMs = parseTime(expiresAt)
  return expiresAtMs === undefined || expiresAtMs <= now.getTime()
}

export function getRankedMatchmakingEligibility(input: RankedMatchmakingEligibilityInput): RankedMatchmakingEligibility {
  if (input.ranked === false) {
    return { eligible: false, reason: 'Unranked matchmaking request.' }
  }
  if (input.scope !== 'practice') {
    return { eligible: false, reason: 'Daily ranked matchmaking is deferred.' }
  }
  const rankedTimeLimitMs = normalizeRankedPracticeTimeLimitMs(input.timeLimitMs)
  if (rankedTimeLimitMs === undefined) {
    return { eligible: false, reason: 'Timed Practice ranked supports only the canonical five-minute clock.' }
  }
  if (rankedTimeLimitMs !== null) {
    return { eligible: true, reason: 'Eligible for timed Practice ranked matchmaking.' }
  }
  return { eligible: true, reason: 'Eligible for untimed Practice ranked matchmaking.' }
}

export function getSearchBand(request: MatchmakingRequest, now = new Date(request.createdAt)): number {
  const createdAtMs = parseTime(request.createdAt)
  const nowMs = Number.isFinite(now.getTime()) ? now.getTime() : createdAtMs
  const queuedMs = createdAtMs !== undefined && nowMs !== undefined ? Math.max(0, nowMs - createdAtMs) : 0
  const rating = normalizeRatingSnapshot(request.rating)
  const initial = rating === 1200 ? 200 : 100
  const stepMs = 10 * 60_000
  const step = Math.floor(queuedMs / stepMs) * 50
  return Math.min(600, initial + step)
}

export function createMatchmakingRequest(input: CreateMatchmakingRequestInput): MatchmakingRequest {
  const createdAt = input.createdAt ?? new Date().toISOString()
  const dailyDateKey = input.scope === 'daily'
    ? input.dailyDateKey ?? getUtcDailyDateKey(new Date(createdAt))
    : undefined
  const timeLimitMs = input.scope === 'practice' ? normalizePracticeTimeLimitMs(input.timeLimitMs) : undefined
  const rankedEligibility = getRankedMatchmakingEligibility({
    ranked: input.ranked !== false,
    scope: input.scope,
    timeLimitMs: input.scope === 'practice' ? input.timeLimitMs : null,
  })
  const ratingBucket = rankedEligibility.eligible
    ? getRankedPracticeRatingBucket(input.mode, input.scope === 'practice' ? input.timeLimitMs : null) ?? getRatingBucket(input.mode)
    : getRatingBucket(input.mode)
  return {
    createdAt,
    dailyDateKey,
    hardMode: input.scope === 'practice' ? input.hardMode === true : undefined,
    id: input.id ?? createId(`matchmaking-multiplayer-${input.mode}`),
    mode: input.mode,
    rating: normalizeRatingSnapshot(input.rating),
    ratingBucket,
    ranked: rankedEligibility.eligible,
    scope: input.scope,
    status: 'queued',
    timeLimitMs,
    userId: input.userId,
    wordLength: input.scope === 'practice' ? input.wordLength : undefined,
  }
}

export function isMatchmakingCompatible(left: MatchmakingRequest, right: MatchmakingRequest, now = new Date()): boolean {
  if (left.id === right.id || left.status !== 'queued' || right.status !== 'queued') {
    return false
  }
  if (!left.ranked || !right.ranked || left.userId === right.userId) {
    return false
  }
  if (!getRankedMatchmakingEligibility(left).eligible || !getRankedMatchmakingEligibility(right).eligible) {
    return false
  }
  if (left.mode !== right.mode || left.scope !== right.scope || left.ratingBucket !== right.ratingBucket) {
    return false
  }
  if (left.scope === 'daily') {
    const currentDaily = getUtcDailyDateKey(now)
    if (left.dailyDateKey !== right.dailyDateKey || left.dailyDateKey !== currentDaily) {
      return false
    }
  }
  if (left.scope === 'practice' && left.wordLength !== right.wordLength) {
    return false
  }
  if (left.scope === 'practice' && (left.timeLimitMs ?? null) !== (right.timeLimitMs ?? null)) {
    return false
  }
  if (left.scope === 'practice' && (left.hardMode === true) !== (right.hardMode === true)) {
    return false
  }
  if (isExpired(left.expiresAt, now)) {
    return false
  }
  if (isExpired(right.expiresAt, now)) {
    return false
  }
  const gap = Math.abs(normalizeRatingSnapshot(left.rating) - normalizeRatingSnapshot(right.rating))
  return gap <= Math.max(getSearchBand(left, now), getSearchBand(right, now))
}

export function findBestMatchForRequest(request: MatchmakingRequest, candidates: readonly MatchmakingRequest[], now = new Date()): MatchmakingSelection | undefined {
  return candidates
    .filter((candidate) => isMatchmakingCompatible(request, candidate, now))
    .map((candidate) => ({
      left: request,
      ratingGap: Math.abs(request.rating - candidate.rating),
      reason: 'Compatible ranked match.',
      right: candidate,
      searchBand: Math.max(getSearchBand(request, now), getSearchBand(candidate, now)),
    }))
    .sort((left, right) => left.ratingGap - right.ratingGap || left.right.createdAt.localeCompare(right.right.createdAt))[0]
}

export function markMatched(requests: readonly MatchmakingRequest[], selection: MatchmakingSelection): readonly MatchmakingRequest[] {
  const matchedIds = new Set([selection.left.id, selection.right.id])
  return requests.map((request) => matchedIds.has(request.id) ? { ...request, status: 'matched' } : request)
}

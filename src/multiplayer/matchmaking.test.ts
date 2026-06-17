import { describe, expect, it } from 'vitest'
import {
  createMatchmakingRequest,
  findBestMatchForRequest,
  getRankedMatchmakingEligibility,
  getSearchBand,
  isMatchmakingCompatible,
  markMatched,
} from './matchmaking'

describe('multiplayer matchmaking', () => {
  it('widens search bands over wait time', () => {
    const request = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      rating: 1400,
      scope: 'practice',
      userId: 'user-a',
    })

    expect(getSearchBand(request, new Date('2026-06-04T12:00:00.000Z'))).toBe(100)
    expect(getSearchBand(request, new Date('2026-06-04T12:10:00.000Z'))).toBe(150)
    expect(getSearchBand({ ...request, createdAt: 'not-a-date', rating: Number.NaN }, new Date('2026-06-04T12:10:00.000Z'))).toBe(200)
  })

  it('filters by mode, scope, word length, Hard Mode, and distinct users', () => {
    const left = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      hardMode: true,
      mode: 'go',
      rating: 1200,
      scope: 'practice',
      userId: 'user-a',
      wordLength: 8,
    })
    const right = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      hardMode: true,
      mode: 'go',
      rating: 1210,
      scope: 'practice',
      userId: 'user-b',
      wordLength: 8,
    })
    const wrongLength = { ...right, id: 'wrong-length', wordLength: 9 }
    const wrongHardMode = { ...right, hardMode: false, id: 'wrong-hard-mode' }
    const sameUser = { ...right, id: 'same-user', userId: 'user-a' }

    expect(isMatchmakingCompatible(left, right, new Date('2026-06-04T12:00:01.000Z'))).toBe(true)
    expect(isMatchmakingCompatible(left, wrongLength, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
    expect(isMatchmakingCompatible(left, wrongHardMode, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
    expect(isMatchmakingCompatible(left, sameUser, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
  })

  it('keeps Daily ranked matchmaking deferred', () => {
    const left = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      scope: 'daily',
      userId: 'user-a',
    })
    const right = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      scope: 'daily',
      userId: 'user-b',
    })

    expect(left.ranked).toBe(false)
    expect(right.ranked).toBe(false)
    expect(getRankedMatchmakingEligibility({ ranked: true, scope: 'daily' })).toMatchObject({
      eligible: false,
      reason: 'Daily ranked matchmaking is deferred.',
    })
    expect(isMatchmakingCompatible(left, right, new Date('2026-06-04T23:59:00.000Z'))).toBe(false)
    expect(isMatchmakingCompatible(left, right, new Date('2026-06-05T00:01:00.000Z'))).toBe(false)
  })

  it('keeps timed Practice ranked matchmaking deferred', () => {
    const left = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      rating: 1200,
      scope: 'practice',
      timeLimitMs: 30_000,
      userId: 'user-a',
      wordLength: 5,
    })
    const right = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      rating: 1210,
      scope: 'practice',
      timeLimitMs: 30_000,
      userId: 'user-b',
      wordLength: 5,
    })

    expect(left.ranked).toBe(false)
    expect(getRankedMatchmakingEligibility({ ranked: true, scope: 'practice', timeLimitMs: 30_000 })).toMatchObject({
      eligible: false,
      reason: 'Timed Practice ranked matchmaking is deferred.',
    })
    expect(isMatchmakingCompatible(left, right, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
  })

  it('selects the closest compatible queued opponent and marks both matched', () => {
    const left = createMatchmakingRequest({ id: 'left', mode: 'og', rating: 1300, scope: 'practice', userId: 'user-a' })
    const close = createMatchmakingRequest({ id: 'close', mode: 'og', rating: 1320, scope: 'practice', userId: 'user-b' })
    const far = createMatchmakingRequest({ id: 'far', mode: 'og', rating: 1500, scope: 'practice', userId: 'user-c' })

    const selection = findBestMatchForRequest(left, [far, close], new Date(left.createdAt))
    expect(selection?.right.id).toBe('close')
    expect(markMatched([left, close, far], selection!).filter((request) => request.status === 'matched').map((request) => request.id)).toEqual(['left', 'close'])
  })

  it('does not match expired or corrupt queue rows', () => {
    const left = createMatchmakingRequest({ id: 'left', mode: 'og', rating: 1300, scope: 'practice', userId: 'user-a' })
    const expired = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      id: 'expired',
      mode: 'og',
      rating: 1310,
      scope: 'practice',
      userId: 'user-b',
    })

    expect(isMatchmakingCompatible(left, { ...expired, expiresAt: '2026-06-04T12:00:30.000Z' }, new Date('2026-06-04T12:01:00.000Z'))).toBe(false)
    expect(isMatchmakingCompatible(left, { ...expired, expiresAt: 'not-a-date' }, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
  })
})

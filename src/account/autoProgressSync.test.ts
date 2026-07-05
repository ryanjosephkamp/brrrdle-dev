import { describe, expect, it } from 'vitest'
import {
  canRefreshAuthenticatedProgress,
  createAuthenticatedProgressSyncRequest,
  shouldApplyAuthenticatedProgressSyncResult,
} from './autoProgressSync'
import { createDefaultGuestProgress } from './storageSchema'
import type { AuthState } from './auth'

const authState: AuthState = {
  status: 'authenticated',
  user: { id: 'account-a', roles: [] },
}

describe('authenticated automatic progress sync guards', () => {
  it('creates signed-in sync requests only for the matching authenticated progress scope', () => {
    const progress = createDefaultGuestProgress()
    const now = () => new Date('2026-07-05T12:00:00.000Z')

    expect(createAuthenticatedProgressSyncRequest({
      authState,
      localProgress: progress,
      now,
      scope: { kind: 'authenticated', userId: 'account-a' },
      version: 7,
    })).toEqual({
      localProgress: progress,
      localUpdatedAt: '2026-07-05T12:00:00.000Z',
      userId: 'account-a',
      version: 7,
    })

    expect(createAuthenticatedProgressSyncRequest({
      authState,
      localProgress: progress,
      now,
      scope: { kind: 'guest' },
      version: 8,
    })).toBeUndefined()
    expect(createAuthenticatedProgressSyncRequest({
      authState,
      localProgress: progress,
      now,
      scope: { kind: 'authenticated', userId: 'account-b' },
      version: 9,
    })).toBeUndefined()
  })

  it('allows cloud refresh only when no authenticated upload can be overwritten', () => {
    const scope = { kind: 'authenticated' as const, userId: 'account-a' }

    expect(canRefreshAuthenticatedProgress({
      authState,
      hasPendingUpload: false,
      hasScheduledUpload: false,
      isUploadInFlight: false,
      scope,
    })).toBe(true)

    expect(canRefreshAuthenticatedProgress({
      authState,
      hasPendingUpload: true,
      hasScheduledUpload: false,
      isUploadInFlight: false,
      scope,
    })).toBe(false)
    expect(canRefreshAuthenticatedProgress({
      authState,
      hasPendingUpload: false,
      hasScheduledUpload: true,
      isUploadInFlight: false,
      scope,
    })).toBe(false)
    expect(canRefreshAuthenticatedProgress({
      authState,
      hasPendingUpload: false,
      hasScheduledUpload: false,
      isUploadInFlight: true,
      scope,
    })).toBe(false)
  })

  it('drops stale automatic sync results after newer local signed-in work is scheduled', () => {
    expect(shouldApplyAuthenticatedProgressSyncResult({ currentVersion: 2, requestVersion: 2 })).toBe(true)
    expect(shouldApplyAuthenticatedProgressSyncResult({ currentVersion: 3, requestVersion: 2 })).toBe(false)
  })
})

import type { AuthState } from './auth'
import { canSyncProgressForAuthState, type ActiveProgressScope } from './accountScopedProgress'
import type { GuestProgressState } from './storageSchema'

export const AUTHENTICATED_PROGRESS_AUTO_SYNC_DEBOUNCE_MS = 750

export interface AuthenticatedProgressSyncRequest {
  readonly localProgress: GuestProgressState
  readonly localUpdatedAt: string
  readonly userId: string
  readonly version: number
}

export interface CreateAuthenticatedProgressSyncRequestInput {
  readonly authState: AuthState
  readonly localProgress: GuestProgressState
  readonly now?: () => Date
  readonly scope: ActiveProgressScope
  readonly version: number
}

export interface AuthenticatedProgressRefreshGuardInput {
  readonly authState: AuthState
  readonly hasPendingUpload: boolean
  readonly hasScheduledUpload: boolean
  readonly isUploadInFlight: boolean
  readonly scope: ActiveProgressScope
}

export function createAuthenticatedProgressSyncRequest(
  input: CreateAuthenticatedProgressSyncRequestInput,
): AuthenticatedProgressSyncRequest | undefined {
  if (input.scope.kind !== 'authenticated' || !canSyncProgressForAuthState(input.authState, input.scope)) {
    return undefined
  }

  return {
    localProgress: input.localProgress,
    localUpdatedAt: (input.now ?? (() => new Date()))().toISOString(),
    userId: input.scope.userId,
    version: input.version,
  }
}

export function canRefreshAuthenticatedProgress(input: AuthenticatedProgressRefreshGuardInput): boolean {
  return canSyncProgressForAuthState(input.authState, input.scope)
    && !input.hasPendingUpload
    && !input.hasScheduledUpload
    && !input.isUploadInFlight
}

export function shouldApplyAuthenticatedProgressSyncResult(input: {
  readonly currentVersion: number
  readonly requestVersion: number
}): boolean {
  return input.currentVersion === input.requestVersion
}

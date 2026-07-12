import type { ActiveProgressScope, GuestProgressState } from '../account'
import { createEmptyMultiplayerState, type MultiplayerState } from '../multiplayer'

export interface SelectScopedProgressMultiplayerStateInput {
  readonly currentAuthorityUserId?: string
  readonly currentMultiplayerState: MultiplayerState
  readonly nextProgress: GuestProgressState
  readonly nextScope: ActiveProgressScope
}

export function selectScopedProgressMultiplayerState(
  input: SelectScopedProgressMultiplayerStateInput,
): MultiplayerState {
  const nextAuthenticatedUserId = input.nextScope.kind === 'authenticated'
    ? input.nextScope.userId
    : undefined
  if (nextAuthenticatedUserId) {
    if (input.currentAuthorityUserId === nextAuthenticatedUserId) {
      return input.currentMultiplayerState
    }
    return createEmptyMultiplayerState()
  }

  return input.nextProgress.multiplayer ?? createEmptyMultiplayerState()
}

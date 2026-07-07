import type { ActiveProgressScope, GuestProgressState } from '../account'
import { createEmptyMultiplayerState, type MultiplayerState } from '../multiplayer'

export interface SelectScopedProgressMultiplayerStateInput {
  readonly currentMultiplayerState: MultiplayerState
  readonly currentScope: ActiveProgressScope
  readonly nextProgress: GuestProgressState
  readonly nextScope: ActiveProgressScope
}

export function selectScopedProgressMultiplayerState(
  input: SelectScopedProgressMultiplayerStateInput,
): MultiplayerState {
  if (
    input.currentScope.kind === 'authenticated'
    && input.nextScope.kind === 'authenticated'
    && input.currentScope.userId === input.nextScope.userId
  ) {
    return input.currentMultiplayerState
  }

  return input.nextProgress.multiplayer ?? createEmptyMultiplayerState()
}

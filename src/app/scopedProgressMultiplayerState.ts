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

  const nextAuthenticatedUserId = input.nextScope.kind === 'authenticated'
    ? input.nextScope.userId
    : undefined
  if (
    nextAuthenticatedUserId
    && input.currentMultiplayerState.games.length > 0
    && input.currentMultiplayerState.games.every((game) => (
      game.playerUserIds?.['player-one'] === nextAuthenticatedUserId
      || game.playerUserIds?.['player-two'] === nextAuthenticatedUserId
    ))
  ) {
    return input.currentMultiplayerState
  }

  return input.nextProgress.multiplayer ?? createEmptyMultiplayerState()
}

import { describe, expect, it } from 'vitest'
import { createDefaultGuestProgress, type ActiveProgressScope } from '../account'
import { createMultiplayerGame, type MultiplayerState } from '../multiplayer'
import { selectScopedProgressMultiplayerState } from './scopedProgressMultiplayerState'

const accountScope: ActiveProgressScope = { kind: 'authenticated', userId: 'account-a' }
const rivalAccountScope: ActiveProgressScope = { kind: 'authenticated', userId: 'account-b' }
const guestScope: ActiveProgressScope = { kind: 'guest' }

function createState(gameId: string): MultiplayerState {
  return {
    games: [
      createMultiplayerGame({
        id: gameId,
        mode: 'og',
        playerUserIds: { 'player-one': 'account-a' },
        scope: 'practice',
        wordLength: 5,
      }),
    ],
  }
}

describe('selectScopedProgressMultiplayerState', () => {
  it('preserves visible async multiplayer rows during same-account progress hydration', () => {
    const currentMultiplayerState = createState('visible-game')
    const nextProgress = {
      ...createDefaultGuestProgress(),
      multiplayer: createState('stale-progress-cache-game'),
    }

    expect(selectScopedProgressMultiplayerState({
      currentMultiplayerState,
      currentScope: accountScope,
      nextProgress,
      nextScope: accountScope,
    })).toBe(currentMultiplayerState)
  })

  it('uses the next progress state when switching identities or guest scopes', () => {
    const currentMultiplayerState = createState('previous-account-game')
    const nextMultiplayerState = createState('next-scope-game')
    const nextProgress = {
      ...createDefaultGuestProgress(),
      multiplayer: nextMultiplayerState,
    }

    expect(selectScopedProgressMultiplayerState({
      currentMultiplayerState,
      currentScope: accountScope,
      nextProgress,
      nextScope: rivalAccountScope,
    })).toBe(nextMultiplayerState)

    expect(selectScopedProgressMultiplayerState({
      currentMultiplayerState,
      currentScope: accountScope,
      nextProgress,
      nextScope: guestScope,
    })).toBe(nextMultiplayerState)
  })
})

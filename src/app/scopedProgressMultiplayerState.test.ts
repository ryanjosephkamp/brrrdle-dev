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

function createStateForUser(gameId: string, userId: string): MultiplayerState {
  return {
    games: [
      createMultiplayerGame({
        id: gameId,
        mode: 'og',
        playerUserIds: { 'player-one': userId },
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

  it('preserves already-loaded target-account rows during guest-to-account hydration', () => {
    const freshTargetState = createStateForUser('fresh-server-game', accountScope.userId)
    const unrelatedState = createStateForUser('unrelated-public-lobby', rivalAccountScope.userId)
    const currentMultiplayerState = { games: [...freshTargetState.games, ...unrelatedState.games] }
    const nextProgress = {
      ...createDefaultGuestProgress(),
      multiplayer: createStateForUser('stale-progress-cache-game', accountScope.userId),
    }

    expect(selectScopedProgressMultiplayerState({
      currentMultiplayerState,
      currentScope: guestScope,
      nextProgress,
      nextScope: accountScope,
    })).toEqual(freshTargetState)
  })

  it('does not preserve rows belonging only to another account during identity hydration', () => {
    const currentMultiplayerState = createStateForUser('previous-account-game', rivalAccountScope.userId)
    const nextMultiplayerState = createStateForUser('target-account-game', accountScope.userId)
    const nextProgress = {
      ...createDefaultGuestProgress(),
      multiplayer: nextMultiplayerState,
    }

    expect(selectScopedProgressMultiplayerState({
      currentMultiplayerState,
      currentScope: guestScope,
      nextProgress,
      nextScope: accountScope,
    })).toBe(nextMultiplayerState)
  })
})

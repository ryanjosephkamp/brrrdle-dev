import { describe, expect, it } from 'vitest'
import type { AuthState } from '../account/auth'
import {
  createMultiplayerGame,
  getMultiplayerAnswerWords,
  joinMultiplayerGame,
  submitMultiplayerGuess,
} from './multiplayer'
import {
  createEmptyCompetitiveMultiplayerState,
  settleMultiplayerStateResults,
} from './competitiveMultiplayer'
import {
  selectActiveMultiplayerGameRows,
  selectLiveMultiplayerRows,
  selectMultiplayerLobbyRows,
  selectRecentMultiplayerResults,
  selectRestrictedLiveMultiplayerCount,
} from './multiplayerViewModels'

const authenticatedHost: AuthState = {
  status: 'authenticated',
  user: {
    id: 'host-user',
    roles: [],
  },
}

describe('multiplayer view models', () => {
  it('projects active participant games newest first without exposing unrelated authenticated games', () => {
    const hostPractice = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      timeLimitMs: 60_000,
      wordLength: 6,
    })
    const rivalDaily = createMultiplayerGame({
      createdAt: '2026-06-04T13:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'go',
      playerUserIds: { 'player-one': 'rival-user' },
      scope: 'daily',
    })
    const unrelated = createMultiplayerGame({
      createdAt: '2026-06-04T14:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'other-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joinedDaily = joinMultiplayerGame({ games: [rivalDaily] }, {
      gameId: rivalDaily.id,
      now: '2026-06-04T13:01:00.000Z',
      userId: 'host-user',
    }).game!
    const rows = selectActiveMultiplayerGameRows({ games: [hostPractice, joinedDaily, unrelated] }, 'host-user')

    expect(rows.map((row) => row.id)).toEqual([joinedDaily.id, hostPractice.id])
    expect(rows[0].title).toBe('Daily Multiplayer GO · 2026-06-04')
    expect(rows[0].ruleLabel).toBe('UTC daily · 5 letters · no clock')
    expect(rows[1].ruleLabel).toBe('6 letters · 1 minute per side')
  })

  it('projects waiting Practice lobbies with join and manage controls from existing guards', () => {
    const ownLobby = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      hardMode: true,
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      timeLimitMs: 120_000,
      wordLength: 5,
    })
    const rivalLobby = createMultiplayerGame({
      createdAt: '2026-06-04T12:05:00.000Z',
      mode: 'go',
      playerUserIds: { 'player-one': 'rival-user' },
      scope: 'practice',
      wordLength: 7,
    })
    const rows = selectMultiplayerLobbyRows({ games: [ownLobby, rivalLobby] }, {
      viewerUserId: 'host-user',
    })

    expect(rows.map((row) => row.id)).toEqual([rivalLobby.id, ownLobby.id])
    expect(rows[0]).toMatchObject({
      actionLabel: 'Open to join',
      canJoin: true,
      scopeLabel: 'Practice Multiplayer',
      timeLimitLabel: 'No time limit',
    })
    expect(rows[1]).toMatchObject({
      actionLabel: 'Manage lobby',
      canCancel: true,
      hardModeLabel: 'Hard Mode on',
      timeLimitLabel: '2 minutes per side',
    })
  })

  it('keeps Daily lobby rows claim-safe and free of Practice-only controls', () => {
    const claimedDaily = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'daily',
    })
    const rivalDaily = createMultiplayerGame({
      createdAt: '2026-06-04T12:05:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'rival-user' },
      scope: 'daily',
    })
    const rows = selectMultiplayerLobbyRows({ games: [claimedDaily, rivalDaily] }, {
      dailyDateKey: '2026-06-04',
      viewerUserId: 'host-user',
    })
    const rivalRow = rows.find((row) => row.id === rivalDaily.id)

    expect(rivalRow).toMatchObject({
      actionLabel: 'Daily already claimed',
      canJoin: false,
      claimBlocked: true,
      hardModeLabel: undefined,
      timeLimitLabel: 'No clock',
    })
    expect(rivalRow?.detailLabel).toBe('UTC daily · 5 letters · no clock')
  })

  it('projects recent multiplayer results from settled competitive state', () => {
    const game = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      ranked: true,
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const submitted = submitMultiplayerGuess({ games: [game] }, {
      gameId: game.id,
      guess: getMultiplayerAnswerWords(game)[0],
      now: '2026-06-04T12:01:00.000Z',
      playerId: 'player-one',
    })
    const competitive = settleMultiplayerStateResults(
      createEmptyCompetitiveMultiplayerState(),
      submitted.state,
      authenticatedHost,
    )

    const rows = selectRecentMultiplayerResults(competitive, 'host-user')

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      completedAt: '2026-06-04T12:01:00.000Z',
      modeLabel: 'OG',
      outcomeLabel: 'Won',
      scopeLabel: 'Practice Multiplayer',
    })
    expect(rows[0].detailLabel).toContain('Won in 1 guess')
  })

  it('projects Live v0 rows for authenticated participant playing games only', () => {
    const hostPractice = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      scope: 'practice',
      timeLimitMs: 60_000,
      wordLength: 6,
    })
    const rivalDaily = createMultiplayerGame({
      createdAt: '2026-06-04T13:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'go',
      playerUserIds: { 'player-one': 'rival-user' },
      scope: 'daily',
    })
    const joinedDaily = joinMultiplayerGame({ games: [rivalDaily] }, {
      gameId: rivalDaily.id,
      now: '2026-06-04T13:01:00.000Z',
      userId: 'host-user',
    }).game!
    const unrelated = createMultiplayerGame({
      createdAt: '2026-06-04T14:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'other-user', 'player-two': 'third-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const waitingOwnLobby = createMultiplayerGame({
      createdAt: '2026-06-04T15:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const terminal = {
      ...hostPractice,
      id: 'terminal-live-candidate',
      status: 'won' as const,
      updatedAt: '2026-06-04T16:00:00.000Z',
    }

    const rows = selectLiveMultiplayerRows({
      games: [hostPractice, joinedDaily, unrelated, waitingOwnLobby, terminal],
    }, 'host-user')

    expect(rows.map((row) => row.id)).toEqual([joinedDaily.id, hostPractice.id])
    expect(rows[0]).toMatchObject({
      actionLabel: 'Resume live game',
      ruleLabel: 'UTC daily · 5 letters · no clock',
      scopeLabel: 'Daily Multiplayer',
    })
    expect(selectRestrictedLiveMultiplayerCount({ games: [hostPractice, joinedDaily, unrelated] }, 'host-user')).toBe(1)
  })

  it('keeps Live v0 closed to anonymous users and nonparticipant terminal data', () => {
    const active = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const expired = {
      ...active,
      id: 'expired-game',
      status: 'expired' as const,
      updatedAt: '2026-06-04T12:05:00.000Z',
    }
    const cancelled = {
      ...active,
      id: 'cancelled-game',
      status: 'cancelled' as const,
      updatedAt: '2026-06-04T12:06:00.000Z',
    }

    expect(selectLiveMultiplayerRows({ games: [active] })).toEqual([])
    expect(selectRestrictedLiveMultiplayerCount({ games: [active] })).toBe(0)
    expect(selectLiveMultiplayerRows({ games: [expired, cancelled] }, 'host-user')).toEqual([])
    expect(selectRestrictedLiveMultiplayerCount({ games: [expired, cancelled] }, 'host-user')).toBe(0)
  })
})

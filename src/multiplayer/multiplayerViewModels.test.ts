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
import type { AuthenticatedLiveSpectatorGame } from './multiplayerRepository'
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

const spectatorGame: AuthenticatedLiveSpectatorGame = {
  createdAt: '2026-06-04T15:00:00.000Z',
  currentTurnSeat: 'player-two',
  dailyDateKey: undefined,
  deadlineAt: undefined,
  difficulty: 'expert',
  goPuzzleCount: undefined,
  hardMode: true,
  id: 'spectator-game-1',
  mode: 'og',
  moves: [
    {
      createdAt: '2026-06-04T15:01:00.000Z',
      guess: 'ROBOT',
      puzzleIndex: 0,
      seat: 'player-one',
      tiles: [
        { letter: 'R', state: 'absent' },
        { letter: 'O', state: 'present' },
        { letter: 'B', state: 'absent' },
        { letter: 'O', state: 'correct' },
        { letter: 'T', state: 'correct' },
      ],
    },
  ],
  outcome: {
    label: 'In progress',
    status: 'playing',
    terminal: false,
  },
  players: [
    { label: 'Host', profile: { displayName: 'Host player', initials: 'H' }, seat: 'player-one' },
    { label: 'Rival', profile: { displayName: 'Rival player', initials: 'R' }, seat: 'player-two' },
  ],
  progress: {
    currentPuzzleIndex: 0,
    latestMoveAt: '2026-06-04T15:01:00.000Z',
    moveCount: 1,
    solvedPuzzleCount: 0,
  },
  ranked: false,
  ratingBucket: undefined,
  scope: 'practice',
  spectatorCapabilities: {
    canCancel: false,
    canForfeit: false,
    canJoin: false,
    canMutate: false,
    canSubmitGuess: false,
  },
  status: 'playing',
  timeLimitMs: 300000,
  updatedAt: '2026-06-04T15:02:00.000Z',
  wordLength: 5,
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
      actionLabel: 'Join',
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

    const signedOutRows = selectMultiplayerLobbyRows({ games: [rivalLobby] })
    expect(signedOutRows[0]).toMatchObject({
      actionLabel: 'Sign in to join',
      canCancel: false,
      canJoin: false,
      claimBlocked: false,
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

  it('projects Live v1 rows for authenticated participant playing games only', () => {
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
      canResume: true,
      canSpectate: false,
      rankingLabel: 'Unranked',
      ruleLabel: 'UTC daily · 5 letters · no clock',
      scopeLabel: 'Daily Multiplayer',
      viewerRole: 'participant',
    })
    expect(selectRestrictedLiveMultiplayerCount({ games: [hostPractice, joinedDaily, unrelated] }, 'host-user')).toBe(1)
  })

  it('prefers safe participant profile names and falls back away from stale You labels in Live rows', () => {
    const profiled = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      playerProfiles: {
        'player-one': { displayName: 'kiki', initials: 'K', label: 'kiki' },
        'player-two': { displayName: 'claudine', initials: 'C', label: 'claudine' },
      },
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      ranked: true,
      scope: 'practice',
      wordLength: 5,
    })
    const staleProfiled = {
      ...profiled,
      players: profiled.players.map((player) => player.id === 'player-two' ? { ...player, label: 'You' } : player),
    }
    const staleFallback = createMultiplayerGame({
      createdAt: '2026-06-04T12:01:00.000Z',
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const staleFallbackWithoutProfile = {
      ...staleFallback,
      players: staleFallback.players.map((player) => player.id === 'player-two' ? { ...player, label: 'You' } : player),
    }

    const rows = selectLiveMultiplayerRows({
      games: [staleFallbackWithoutProfile, staleProfiled],
    }, 'host-user')

    expect(rows.find((row) => row.id === staleProfiled.id)).toMatchObject({
      opponentLabel: 'claudine',
      rankingLabel: 'Ranked',
    })
    expect(rows.find((row) => row.id === staleFallbackWithoutProfile.id)).toMatchObject({
      opponentLabel: 'Rival',
      rankingLabel: 'Unranked',
    })
  })

  it('projects authenticated spectator RPC rows as read-only Live v1 rows', () => {
    const participant = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const matchingRestricted = createMultiplayerGame({
      createdAt: '2026-06-04T15:00:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'other-user', 'player-two': 'third-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const rows = selectLiveMultiplayerRows({
      games: [participant, { ...matchingRestricted, id: spectatorGame.id }],
    }, 'host-user', [spectatorGame])

    expect(rows.map((row) => row.id)).toEqual([spectatorGame.id, participant.id])
    expect(rows[0]).toMatchObject({
      actionLabel: 'Spectate live game',
      canResume: false,
      canSpectate: true,
      detailLabel: 'Read-only · 1 turn submitted',
      opponentLabel: 'Host player vs Rival player',
      rankingLabel: 'Unranked',
      ruleLabel: '5 letters · 5 minutes per side · Hard Mode',
      turnLabel: "Rival player's turn",
      viewerRole: 'spectator',
    })
    expect(rows[0].spectatorDetails?.capabilityLabel).toContain('Read-only spectator view')
    expect(rows[0].spectatorDetails?.moves[0]).toMatchObject({
      guess: 'ROBOT',
      playerLabel: 'Host player',
      puzzleLabel: 'Puzzle 1',
    })
    expect(selectRestrictedLiveMultiplayerCount({
      games: [participant, { ...matchingRestricted, id: spectatorGame.id }],
    }, 'host-user', [spectatorGame])).toBe(0)
  })

  it('keeps spectator Live matchup labels on safe fallbacks when profile names are unavailable', () => {
    const rows = selectLiveMultiplayerRows({ games: [] }, 'spectator-user', [{
      ...spectatorGame,
      players: [
        { label: 'You', seat: 'player-one' },
        { label: 'Rival', seat: 'player-two' },
      ],
    }])

    expect(rows[0]).toMatchObject({
      opponentLabel: 'Player one vs Rival',
      turnLabel: "Rival's turn",
    })
    expect(rows[0].opponentLabel).not.toContain('You')
  })

  it('keeps sanitized terminal spectator hold rows visible briefly with outcome copy', () => {
    const terminalSpectatorGame: AuthenticatedLiveSpectatorGame = {
      ...spectatorGame,
      currentTurnSeat: undefined,
      endedAt: '2026-06-04T15:05:00.000Z',
      outcome: {
        label: 'Player one won',
        status: 'won',
        terminal: true,
        terminalAt: '2026-06-04T15:05:00.000Z',
        winnerSeat: 'player-one',
      },
      status: 'won',
      terminalAt: '2026-06-04T15:05:00.000Z',
      terminalHoldUntil: '2026-06-04T15:05:15.000Z',
      updatedAt: '2026-06-04T15:05:00.000Z',
    }

    const rows = selectLiveMultiplayerRows({ games: [] }, 'spectator-user', [terminalSpectatorGame])

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      detailLabel: 'Read-only · Player one won · Final · 1 turn submitted',
      turnLabel: 'Player one won',
      updatedAt: '2026-06-04T15:05:00.000Z',
      viewerRole: 'spectator',
    })
    expect(rows[0].spectatorDetails).toMatchObject({
      outcomeLabel: 'Player one won',
      progressLabel: 'Final · 1 turn submitted',
      terminal: true,
      terminalHoldUntil: '2026-06-04T15:05:15.000Z',
      terminalLabel: 'Player one won. Final board visible briefly.',
    })
  })

  it('keeps Live v1 closed to anonymous users and nonparticipant terminal data', () => {
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

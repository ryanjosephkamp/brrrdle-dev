import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DEFAULT_DIFFICULTY_TIER } from '../data/difficulty'
import { createPracticeGoSetup } from '../game'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import {
  addMultiplayerGame,
  cancelMultiplayerGame,
  createMultiplayerGame,
  createEmptyMultiplayerState,
  forfeitMultiplayerGame,
  getMultiplayerAnswerWords,
  joinMultiplayerGame,
  submitMultiplayerGuess,
  type MultiplayerGame,
} from './multiplayer'
import { createDailyMultiplayerGoSetup } from './dailyMultiplayer'
import { getPracticePostgameActions } from './postgameActions'
import {
  MultiplayerPanel,
  PrivateMatchRequestsPanel,
  PracticePostgameActionsPanel,
} from './MultiplayerPanel'
import {
  buildFinalizedRankedGameFromStatus,
  buildRankedQueueRequestInput,
  getRankedQueueFinalizationIdempotencyKey,
} from './multiplayerPanelRankedQueue'
import {
  getCreatorJoinedGameAutoRouteId,
  mergeFinalizedRankedGameIntoLocalState,
  getMultiplayerPlayerDisplayLabel,
  shouldAutoRefreshRankedQueue,
} from './multiplayerPanelRouting'
import type {
  MultiplayerRepository,
  PracticeRematchRequestResult,
  PrivateMatchRequestResult,
  RankedQueueCancellationResult,
  RankedQueueClaimResult,
  RankedQueueFinalizationResult,
  RankedQueueRequestResult,
  RankedQueueStatusResult,
} from './multiplayerRepository'
import { TIMED_RANKED_PRACTICE_TIME_LIMIT_MS } from './rating'

function noop() {}

type RankedQueueActionsFixture = Pick<
  MultiplayerRepository,
  'cancelRankedQueueRequest'
  | 'claimRankedQueuePair'
  | 'createRankedQueueRequest'
  | 'finalizeRankedQueueGame'
  | 'getRankedQueueStatus'
>

type PracticeRematchActionsFixture = Pick<
  MultiplayerRepository,
  'acceptPracticeRematch'
  | 'cancelPracticeRematch'
  | 'declinePracticeRematch'
  | 'listPracticeRematchRequests'
  | 'requestPracticeRematch'
>

function terminalPracticeGame(overrides: Partial<MultiplayerGame> = {}): MultiplayerGame {
  const game = createMultiplayerGame({
    hardMode: true,
    mode: 'og',
    playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
    scope: 'practice',
    seed: 31,
    wordLength: 6,
    ...overrides,
  })
  return {
    ...game,
    endedAt: '2026-06-24T00:20:00.000Z',
    status: 'won',
    updatedAt: '2026-06-24T00:20:00.000Z',
    winnerId: 'player-one',
    ...overrides,
  }
}

function createPracticeRematchRequestFixture(
  overrides: Partial<PracticeRematchRequestResult> = {},
): PracticeRematchRequestResult {
  return {
    created: false,
    createdAt: '2026-06-24T00:21:00.000Z',
    expired: false,
    expiresAt: '2026-06-24T00:31:00.000Z',
    hardMode: true,
    idempotent: false,
    mode: 'og',
    opponentSeat: 'player-two',
    requestId: 'rematch-request-1',
    requesterSeat: 'player-one',
    requestStatus: 'requested',
    sourceGameId: 'terminal-practice-1',
    updatedAt: '2026-06-24T00:21:00.000Z',
    viewerCanAccept: false,
    viewerCanCancel: true,
    viewerRole: 'requester',
    wordLength: 6,
    ...overrides,
  }
}

function createPrivateMatchRequestFixture(
  overrides: Partial<PrivateMatchRequestResult> = {},
): PrivateMatchRequestResult {
  return {
    created: false,
    createdAt: '2026-07-01T23:45:00.000Z',
    expired: false,
    expiresAt: '2026-07-02T00:00:00.000Z',
    hardMode: false,
    idempotent: false,
    mode: 'og',
    opponent: {
      displayName: 'Kiki',
      identityAvailable: true,
      publicProfileId: '22222222-2222-4222-8222-222222222222',
      updatedAt: '2026-07-01T23:40:00.000Z',
    },
    requestId: 'private-request-1',
    requester: {
      displayName: 'Claudine',
      identityAvailable: true,
      publicProfileId: '11111111-1111-4111-8111-111111111111',
      updatedAt: '2026-07-01T23:39:00.000Z',
    },
    requestStatus: 'requested',
    updatedAt: '2026-07-01T23:45:00.000Z',
    viewerCanAccept: true,
    viewerCanCancel: false,
    viewerCanDecline: true,
    viewerRole: 'opponent',
    wordLength: 5,
    ...overrides,
  }
}

function createPracticeRematchActionsFixture(): PracticeRematchActionsFixture {
  const result = createPracticeRematchRequestFixture()
  return {
    acceptPracticeRematch: async () => ({
      ...result,
      created: true,
      createdGameId: 'rematch-game-1',
      requestStatus: 'created',
    }),
    cancelPracticeRematch: async () => ({ ...result, requestStatus: 'cancelled' }),
    declinePracticeRematch: async () => ({ ...result, requestStatus: 'declined' }),
    listPracticeRematchRequests: async () => [],
    requestPracticeRematch: async () => result,
  }
}

function createRankedQueueActionsFixture(): RankedQueueActionsFixture {
  const request: RankedQueueRequestResult = {
    hardMode: true,
    queuedAt: '2026-06-24T00:25:00.000Z',
    ratingBucket: 'multiplayer:og',
    ratingSnapshot: 1200,
    requestId: 'queue-request-1',
    requestStatus: 'queued',
    wordLength: 6,
  }
  const cancellation: RankedQueueCancellationResult = {
    requestId: request.requestId,
    requestStatus: 'cancelled',
  }
  const claim: RankedQueueClaimResult = {
    requestId: request.requestId,
    requestStatus: 'queued',
  }
  const status: RankedQueueStatusResult = {
    queuedAt: request.queuedAt,
    requestId: request.requestId,
    requestStatus: 'queued',
  }
  const finalization: RankedQueueFinalizationResult = {
    created: false,
    gameId: 'ranked-rematch-game-1',
    idempotent: false,
    requestId: request.requestId,
    requestStatus: 'queued',
  }
  return {
    cancelRankedQueueRequest: async () => cancellation,
    claimRankedQueuePair: async () => claim,
    createRankedQueueRequest: async () => request,
    finalizeRankedQueueGame: async () => finalization,
    getRankedQueueStatus: async () => status,
  }
}

describe('PrivateMatchRequestsPanel', () => {
  it('renders incoming private match actions without exposing opaque profile ids', () => {
    const html = renderToStaticMarkup(
      <PrivateMatchRequestsPanel
        busy={false}
        onAccept={noop}
        onCancel={noop}
        onDecline={noop}
        requests={[createPrivateMatchRequestFixture()]}
      />,
    )

    expect(html).toContain('Private Practice requests')
    expect(html).toContain('Claudine requested a private match.')
    expect(html).toContain('Accept private match')
    expect(html).toContain('Decline')
    expect(html).not.toContain('11111111-1111-4111-8111-111111111111')
    expect(html).not.toContain('22222222-2222-4222-8222-222222222222')
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('playerUserIds')
  })

  it('renders outgoing private match cancellation as requester-only', () => {
    const html = renderToStaticMarkup(
      <PrivateMatchRequestsPanel
        busy={false}
        message="Private match request cancelled."
        onAccept={noop}
        onCancel={noop}
        onDecline={noop}
        requests={[
          createPrivateMatchRequestFixture({
            viewerCanAccept: false,
            viewerCanCancel: true,
            viewerCanDecline: false,
            viewerRole: 'requester',
          }),
        ]}
      />,
    )

    expect(html).toContain('Waiting on Kiki.')
    expect(html).toContain('Cancel request')
    expect(html).toContain('Private match request cancelled.')
    expect(html).not.toContain('Accept private match')
  })
})

describe('MultiplayerPanel', () => {
  it('shows creator-only cancellation for an unjoined multiplayer lobby', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Cancel Lobby')
    expect(html).not.toContain('Forfeit match')
  })

  it('shows join but not cancellation to a rival viewing a waiting multiplayer lobby', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="rival-user"
      />,
    )

    expect(html).toContain('Join multiplayer match')
    expect(html).not.toContain('Cancel Lobby')
  })

  it('joins an eligible Lobby row through the guarded domain path without creating duplicates', () => {
    const lobby = createMultiplayerGame({
      id: 'one-click-lobby-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const joined = joinMultiplayerGame(state, {
      gameId: lobby.id,
      now: '2026-06-26T22:45:00.000Z',
      userId: 'rival-user',
    })
    const duplicate = joinMultiplayerGame(joined.state, {
      gameId: lobby.id,
      now: '2026-06-26T22:46:00.000Z',
      userId: 'rival-user',
    })

    expect(joined.error).toBeUndefined()
    expect(joined.game).toMatchObject({
      id: lobby.id,
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      status: 'playing',
    })
    expect(joined.state.games).toHaveLength(1)
    expect(duplicate.error).toBe('This multiplayer match is not available to join.')
    expect(duplicate.state.games).toHaveLength(1)
  })

  it('auto-routes a creator into a newly joined lobby without stealing a different active game', () => {
    const waitingLobby = createMultiplayerGame({
      id: 'creator-lobby-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joinedLobby = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), waitingLobby), {
      gameId: waitingLobby.id,
      userId: 'rival-user',
    }).game!
    const olderTerminal = terminalPracticeGame({ id: 'older-terminal-1' })
    const activeUnrelated = createMultiplayerGame({
      id: 'active-unrelated-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'other-rival' },
      scope: 'practice',
      wordLength: 5,
    })

    expect(getCreatorJoinedGameAutoRouteId({
      currentGames: [olderTerminal, joinedLobby],
      previousGames: [olderTerminal, waitingLobby],
      selectedGame: olderTerminal,
      viewerUserId: 'host-user',
    })).toBe(joinedLobby.id)
    expect(getCreatorJoinedGameAutoRouteId({
      currentGames: [activeUnrelated, joinedLobby],
      previousGames: [activeUnrelated, waitingLobby],
      selectedGame: activeUnrelated,
      viewerUserId: 'host-user',
    })).toBeUndefined()
  })

  it('preserves an existing terminal ranked game when finalization is idempotent', () => {
    const terminalRanked = terminalPracticeGame({
      id: 'ranked-terminal-1',
      matchmakingRequestId: 'queue-request-1',
      ranked: true,
      ratingBucket: 'multiplayer:og',
      timeLimitMs: null,
    })
    const finalizedProjection = createMultiplayerGame({
      id: terminalRanked.id,
      matchmakingRequestId: 'queue-request-1',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      ranked: true,
      ratingBucket: 'multiplayer:og',
      scope: 'practice',
      wordLength: 6,
    })

    const merged = mergeFinalizedRankedGameIntoLocalState([terminalRanked], finalizedProjection)

    expect(merged).toHaveLength(1)
    expect(merged[0]).toMatchObject({
      id: terminalRanked.id,
      status: 'won',
      winnerId: 'player-one',
    })
  })

  it('polls queued ranked requests only while the creator has a valid active queue', () => {
    expect(shouldAutoRefreshRankedQueue({
      hasRankedQueueActions: true,
      readOnly: false,
      requestId: 'queue-request-1',
      status: 'queued',
    })).toBe(true)
    expect(shouldAutoRefreshRankedQueue({
      hasRankedQueueActions: true,
      readOnly: false,
      requestId: 'queue-request-1',
      status: 'matched',
    })).toBe(false)
    expect(shouldAutoRefreshRankedQueue({
      hasRankedQueueActions: true,
      readOnly: true,
      requestId: 'queue-request-1',
      status: 'queued',
    })).toBe(false)
    expect(shouldAutoRefreshRankedQueue({
      hasRankedQueueActions: false,
      readOnly: false,
      requestId: 'queue-request-1',
      status: 'queued',
    })).toBe(false)
  })

  it('builds ranked queue payloads for untimed and canonical timed Practice only', () => {
    expect(buildRankedQueueRequestInput({
      hardMode: false,
      mode: 'og',
      timeLimitMs: null,
      wordLength: 5,
    })).toEqual({
      hardMode: false,
      mode: 'og',
      timeLimitMs: null,
      wordLength: 5,
    })

    expect(buildRankedQueueRequestInput({
      hardMode: true,
      mode: 'go',
      timeLimitMs: TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
      wordLength: 6,
    })).toEqual({
      hardMode: true,
      mode: 'go',
      timeLimitMs: TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
      wordLength: 6,
    })

    expect(buildRankedQueueRequestInput({
      hardMode: true,
      mode: 'og',
      timeLimitMs: 120_000,
      wordLength: 5,
    })).toBeUndefined()
  })

  it('builds timed ranked finalized game projections from matched queue status', () => {
    const status: RankedQueueStatusResult = {
      hardMode: true,
      matchedAt: '2026-06-26T00:30:00.000Z',
      matchedGameId: 'ranked-timed-game-1',
      mode: 'go',
      playerOneUserId: 'host-user',
      playerTwoUserId: 'rival-user',
      queuedAt: '2026-06-26T00:25:00.000Z',
      ratingBucket: 'multiplayer:go:timed:v1',
      requestId: 'ranked-timed-request-1',
      requestStatus: 'matched',
      scope: 'practice',
      timeLimitMs: TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
      viewerSeat: 'player-one',
      wordLength: 6,
    }

    expect(getRankedQueueFinalizationIdempotencyKey(status)).toBe('phase33-ranked-timed-v1:finalize:ranked-timed-game-1')
    expect(buildFinalizedRankedGameFromStatus({
      defaultDifficulty: DEFAULT_DIFFICULTY_TIER,
      defaultGoPuzzleCount: DEFAULT_GO_PUZZLE_COUNT,
      status,
    })).toMatchObject({
      hardMode: true,
      id: 'ranked-timed-game-1',
      matchmakingRequestId: 'ranked-timed-request-1',
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      ranked: true,
      ratingBucket: 'multiplayer:go:timed:v1',
      scope: 'practice',
      status: 'playing',
      timeLimitMs: TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
      timeRemainingMs: {
        'player-one': TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
        'player-two': TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
      },
      wordLength: 6,
    })
  })

  it('rejects malformed ranked queue status before building a finalized game projection', () => {
    expect(buildFinalizedRankedGameFromStatus({
      defaultDifficulty: DEFAULT_DIFFICULTY_TIER,
      defaultGoPuzzleCount: DEFAULT_GO_PUZZLE_COUNT,
      status: {
        hardMode: true,
        matchedGameId: 'ranked-malformed-game-1',
        mode: 'og',
        playerOneUserId: 'host-user',
        playerTwoUserId: 'rival-user',
        queuedAt: '2026-06-26T00:25:00.000Z',
        ratingBucket: 'multiplayer:og',
        requestId: 'ranked-malformed-request-1',
        requestStatus: 'matched',
        scope: 'practice',
        timeLimitMs: 120_000,
        viewerSeat: 'player-one',
        wordLength: 5,
      } as RankedQueueStatusResult,
    })).toBeUndefined()
  })

  it('uses safe opponent profile labels and never displays an opponent as You', () => {
    const game = createMultiplayerGame({
      mode: 'og',
      playerProfiles: {
        'player-two': {
          accentColor: 'rose',
          displayName: 'kiki',
          initials: 'K',
          label: 'kiki',
        },
      },
      playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const staleYouOpponent: MultiplayerGame = {
      ...game,
      players: game.players.map((player) => (
        player.id === 'player-two' ? { ...player, label: 'You' } : player
      )),
    }

    expect(getMultiplayerPlayerDisplayLabel(staleYouOpponent, 'player-one', 'player-one', staleYouOpponent.playerProfiles)).toBe('You')
    expect(getMultiplayerPlayerDisplayLabel(staleYouOpponent, 'player-two', 'player-one', staleYouOpponent.playerProfiles)).toBe('kiki')
    expect(getMultiplayerPlayerDisplayLabel({ ...staleYouOpponent, playerProfiles: undefined }, 'player-two', 'player-one')).toBe('Rival')
  })

  it('derives the multiplayer status box from shared game state after a rival joins', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const hostHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={joined.state}
        viewerUserId="host-user"
      />,
    )
    const rivalHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={joined.state}
        viewerUserId="rival-user"
      />,
    )

    expect(hostHtml).toContain('Rival joined. Your turn.')
    expect(rivalHtml).toContain('Joined multiplayer match. Waiting for the next player.')
  })

  it('updates the multiplayer status box from shared turns and forfeit terminal state', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      seed: 1,
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const answer = getMultiplayerAnswerWords(lobby)[0]
    const wrongGuess = 'bough' === answer ? 'cigar' : 'bough'
    const submitted = submitMultiplayerGuess(joined.state, {
      gameId: lobby.id,
      guess: wrongGuess,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-one',
    })
    const afterTurnHostHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={submitted.state}
        viewerUserId="host-user"
      />,
    )
    const afterTurnRivalHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={submitted.state}
        viewerUserId="rival-user"
      />,
    )
    const forfeited = forfeitMultiplayerGame(submitted.state, {
      gameId: lobby.id,
      now: '2026-06-04T12:01:00.000Z',
      playerId: 'player-one',
    })
    const forfeitedHostHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={forfeited.state}
        viewerUserId="host-user"
      />,
    )
    const forfeitedRivalHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={forfeited.state}
        viewerUserId="rival-user"
      />,
    )

    expect(afterTurnHostHtml).toContain('Turn submitted. Waiting for the next player.')
    expect(afterTurnRivalHtml).toContain('Rival submitted a turn. Your turn.')
    expect(forfeitedHostHtml).toContain('You forfeited this multiplayer match.')
    expect(forfeitedRivalHtml).toContain('Rival forfeited. You won this multiplayer match.')
  })

  it('does not reveal answers for a cancelled daily multiplayer lobby', () => {
    const lobby = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'daily',
    })
    const cancelled = cancelMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'host-user',
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        readOnly
        scope="daily"
        state={cancelled.state}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('cancelled')
    expect(html).not.toContain('Answer and definitions')
  })

  it('shows the Practice time limit picker before a lobby is created', () => {
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        onOpenEloAbout={noop}
        scope="practice"
        state={createEmptyMultiplayerState()}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Time per side')
    expect(html).toContain('No time limit')
    expect(html).toContain('30 seconds')
    expect(html).toContain('Ranked Practice v1')
    expect(html).toContain('How is Elo calculated?')
    expect(html).toContain('Choose no clock for the current ranked track or 5 minutes for the separate timed ranked track.')
    expect(html).toContain('Daily ranked and ranked custom-code games remain deferred.')
    expect(html).toContain('Points decide the match result first. Elo changes afterward only after trusted settlement')
    expect(html).not.toContain('Each ranked bucket starts at 1200')
    expect(html).not.toContain('Your first 10 ranked Practice games are provisional with K=40')
    expect(html).not.toContain('standard 400-point Elo curve')
  })

  it('explains ranked selected-game settlement and forfeit behavior', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      ranked: true,
      ratingBucket: 'multiplayer:og',
      scope: 'practice',
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={joined.state}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Ranked · trusted settlement after terminal result')
    expect(html).toContain('Forfeiting ends this ranked game and can settle as a ranked loss once trusted settlement confirms both participants.')
  })

  it('shows Practice Hard Mode creation controls and rival-visible lobby status', () => {
    const lobby = createMultiplayerGame({
      hardMode: true,
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const state = addMultiplayerGame(createEmptyMultiplayerState(), lobby)
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={state}
        viewerUserId="rival-user"
      />,
    )

    expect(html).toContain('Hard Mode')
    expect(html).toContain('On')
    expect(html).toContain('Join multiplayer match')
  })

  it('does not show Practice Hard Mode lobby controls for Daily Multiplayer', () => {
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="daily"
        state={createEmptyMultiplayerState()}
        viewerUserId="host-user"
      />,
    )

    expect(html).not.toContain('Hard Mode')
    expect(html).not.toContain('Time per side')
  })

  it.each(['practice', 'daily'] as const)('keeps a completed %s go surface visible briefly before terminal definitions', (scope) => {
    const lobby = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      goPuzzleCount: 5,
      mode: 'go',
      playerUserIds: { 'player-one': 'host-user' },
      scope,
      seed: 1,
      wordLength: 5,
    })
    const setup = scope === 'daily'
      ? createDailyMultiplayerGoSetup(new Date('2026-06-04T00:00:00.000Z'), DEFAULT_DIFFICULTY_TIER, 5)
      : createPracticeGoSetup(5, 1)
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const answers = getMultiplayerAnswerWords(joined.game!)
    let state = joined.state
    let current = joined.game!
    for (const answer of answers.slice(0, -1)) {
      const submitted = submitMultiplayerGuess(state, {
        gameId: current.id,
        guess: answer,
        playerId: current.currentTurn,
      })
      state = submitted.state
      current = submitted.game!
    }
    const finalAnswer = answers[answers.length - 1]
    const wrongGuesses = [...setup.validGuesses].filter((candidate) => candidate !== finalAnswer).slice(0, 4)
    expect(wrongGuesses).toHaveLength(4)
    for (const wrongGuess of wrongGuesses) {
      const submitted = submitMultiplayerGuess(state, {
        gameId: current.id,
        guess: wrongGuess,
        playerId: current.currentTurn,
      })
      expect(submitted.error).toBeUndefined()
      state = submitted.state
      current = submitted.game!
      expect(current.status).toBe('playing')
    }
    const finalSubmitted = submitMultiplayerGuess(state, {
      gameId: current.id,
      guess: finalAnswer,
      playerId: current.currentTurn,
    })
    state = finalSubmitted.state
    current = finalSubmitted.game!

    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope={scope}
        state={state}
        viewerUserId="host-user"
      />,
    )

    expect(current.status).toBe('won')
    expect(html).toContain('Multiplayer guess grid')
    expect(html).toContain('Advancing to final results')
    expect(html).not.toContain('Answer and definitions')
  })

  it.each(['practice', 'daily'] as const)('keeps a completed %s og surface visible briefly before terminal definitions', (scope) => {
    const lobby = createMultiplayerGame({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope,
      seed: 1,
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const answer = getMultiplayerAnswerWords(joined.game!)[0]
    const finalSubmitted = submitMultiplayerGuess(joined.state, {
      gameId: joined.game!.id,
      guess: answer,
      playerId: joined.game!.currentTurn,
    })
    const current = finalSubmitted.game!

    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-04"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope={scope}
        state={finalSubmitted.state}
        viewerUserId="host-user"
      />,
    )

    expect(current.status).toBe('won')
    expect(html).toContain('Multiplayer guess grid')
    expect(html).toContain('Advancing to final results')
    expect(html).not.toContain('Answer and definitions')
    for (const [index, letter] of [...answer].entries()) {
      expect(html).toContain(`Row 1, tile ${index + 1}, ${letter}`)
    }
  })

  it('does not mount the gameplay surface for an authenticated nonparticipant observer', () => {
    const lobby = createMultiplayerGame({
      mode: 'og',
      playerUserIds: { 'player-one': 'host-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const joined = joinMultiplayerGame(addMultiplayerGame(createEmptyMultiplayerState(), lobby), {
      gameId: lobby.id,
      userId: 'rival-user',
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        scope="practice"
        state={joined.state}
        viewerUserId="observer-user"
      />,
    )

    expect(joined.game?.status).toBe('playing')
    expect(html).toContain('Status: playing')
    expect(html).not.toContain('Multiplayer guess grid')
    expect(html).not.toContain('Forfeit match')
  })

  it('renders terminal unranked Practice postgame rematch and same-settings actions for participants', () => {
    const game = terminalPracticeGame({ id: 'terminal-practice-1' })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        postgameActions={createPracticeRematchActionsFixture()}
        scope="practice"
        state={{ games: [game] }}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Postgame actions')
    expect(html).toContain('Request rematch')
    expect(html).toContain('Open new unranked match')
    expect(html).toContain('Same settings')
    expect(html).not.toContain('Search ranked Practice again')
    expect(html).not.toContain('Daily Multiplayer does not support rematch')
  })

  it('keeps ranked Practice postgame continuation on the ranked queue path', () => {
    const ranked = terminalPracticeGame({
      id: 'ranked-terminal-1',
      matchmakingRequestId: 'queue-request-original',
      ranked: true,
      ratingBucket: 'multiplayer:og',
      timeLimitMs: null,
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        postgameActions={createPracticeRematchActionsFixture()}
        rankedQueueActions={createRankedQueueActionsFixture()}
        scope="practice"
        state={{ games: [ranked] }}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Postgame actions')
    expect(html).toContain('Search ranked Practice again')
    expect(html).toContain('trusted ranked queue')
    expect(html).not.toContain('Request rematch')
    expect(html).not.toContain('Open new unranked match')
  })

  it('shows canonical timed ranked postgame search-again through the ranked queue path', () => {
    const timedRanked = terminalPracticeGame({
      id: 'timed-ranked-terminal-1',
      matchmakingRequestId: 'queue-request-original',
      ranked: true,
      ratingBucket: 'multiplayer:og:timed:v1',
      timeLimitMs: TIMED_RANKED_PRACTICE_TIME_LIMIT_MS,
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        postgameActions={createPracticeRematchActionsFixture()}
        rankedQueueActions={createRankedQueueActionsFixture()}
        scope="practice"
        state={{ games: [timedRanked] }}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Postgame actions')
    expect(html).toContain('Same settings: OG, 6 letters, Hard Mode on, 5:00 per side')
    expect(html).toContain('Search ranked Practice again')
    expect(html).toContain('trusted ranked queue')
    expect(html).not.toContain('Timed Practice ranked search-again is deferred')
  })

  it('renders custom Practice postgame setup-prefill without direct rematch', () => {
    const custom = terminalPracticeGame({
      customGameCode: 'ABC123',
      id: 'custom-terminal-1',
    })
    const html = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        postgameActions={createPracticeRematchActionsFixture()}
        scope="practice"
        state={{ games: [custom] }}
        viewerUserId="host-user"
      />,
    )

    expect(html).toContain('Postgame actions')
    expect(html).toContain('Set up custom play again')
    expect(html).toContain('Custom Practice games use setup-prefill instead of direct rematch.')
    expect(html).not.toContain('Request rematch')
  })

  it('keeps postgame actions hidden for Daily games and nonparticipants', () => {
    const daily = terminalPracticeGame({
      dailyDateKey: '2026-06-24',
      id: 'daily-terminal-1',
      scope: 'daily',
    })
    const practice = terminalPracticeGame({ id: 'terminal-practice-1' })
    const dailyHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        dailyDateKey="2026-06-24"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        postgameActions={createPracticeRematchActionsFixture()}
        scope="daily"
        state={{ games: [daily] }}
        viewerUserId="host-user"
      />,
    )
    const observerHtml = renderToStaticMarkup(
      <MultiplayerPanel
        authStatus="authenticated"
        defaultDifficulty={DEFAULT_DIFFICULTY_TIER}
        defaultGoPuzzleCount={DEFAULT_GO_PUZZLE_COUNT}
        onChange={noop}
        postgameActions={createPracticeRematchActionsFixture()}
        scope="practice"
        state={{ games: [practice] }}
        viewerUserId="observer-user"
      />,
    )

    expect(dailyHtml).not.toContain('Postgame actions')
    expect(observerHtml).not.toContain('Postgame actions')
  })

  it('renders rematch request lifecycle controls from sanitized request rows', () => {
    const game = terminalPracticeGame({ id: 'terminal-practice-1' })
    const opponentRequest = createPracticeRematchRequestFixture({
      opponentSeat: 'player-one',
      requesterSeat: 'player-two',
      viewerCanAccept: true,
      viewerCanCancel: false,
      viewerRole: 'opponent',
    })
    const requesterRequest = createPracticeRematchRequestFixture()

    const opponentHtml = renderToStaticMarkup(
      <PracticePostgameActionsPanel
        actions={getPracticePostgameActions(game, 'host-user')}
        busy={false}
        gameId={game.id}
        isOnlineReady
        message={undefined}
        onAcceptRematch={noop}
        onCancelRematch={noop}
        onDeclineRematch={noop}
        onPlayAgain={noop}
        onRequestRematch={noop}
        onSearchAgain={noop}
        rematchActionsAvailable
        rematchRequests={[opponentRequest]}
      />,
    )
    const requesterHtml = renderToStaticMarkup(
      <PracticePostgameActionsPanel
        actions={getPracticePostgameActions(game, 'host-user')}
        busy={false}
        gameId={game.id}
        isOnlineReady
        message="Rematch request sent."
        onAcceptRematch={noop}
        onCancelRematch={noop}
        onDeclineRematch={noop}
        onPlayAgain={noop}
        onRequestRematch={noop}
        onSearchAgain={noop}
        rematchActionsAvailable
        rematchRequests={[requesterRequest]}
      />,
    )

    expect(opponentHtml).toContain('Rival requested a rematch.')
    expect(opponentHtml).toContain('Accept rematch')
    expect(opponentHtml).toContain('Decline')
    expect(requesterHtml).toContain('Waiting for rival to accept.')
    expect(requesterHtml).toContain('Cancel request')
    expect(requesterHtml).toContain('Rematch request sent.')
  })

  it('renders non-actionable rematch lifecycle states so participants do not stay stale', () => {
    const game = terminalPracticeGame({ id: 'terminal-practice-1' })
    const declinedRequest = createPracticeRematchRequestFixture({
      requestStatus: 'declined',
      updatedAt: '2026-06-24T00:24:00.000Z',
      viewerCanCancel: false,
    })
    const cancelledRequest = createPracticeRematchRequestFixture({
      requestStatus: 'cancelled',
      updatedAt: '2026-06-24T00:25:00.000Z',
      viewerCanCancel: false,
      viewerRole: 'opponent',
    })
    const expiredRequest = createPracticeRematchRequestFixture({
      expired: true,
      expiresAt: '2026-06-24T00:22:00.000Z',
      requestStatus: 'expired',
      updatedAt: '2026-06-24T00:26:00.000Z',
      viewerCanCancel: false,
    })
    const idempotentCreatedRequest = createPracticeRematchRequestFixture({
      created: true,
      createdGameId: 'rematch-game-1',
      idempotent: true,
      requestStatus: 'created',
      updatedAt: '2026-06-24T00:27:00.000Z',
      viewerCanCancel: false,
    })

    const renderLifecycle = (request: PracticeRematchRequestResult) => renderToStaticMarkup(
      <PracticePostgameActionsPanel
        actions={getPracticePostgameActions(game, 'host-user')}
        busy={false}
        gameId={game.id}
        isOnlineReady
        message={undefined}
        onAcceptRematch={noop}
        onCancelRematch={noop}
        onDeclineRematch={noop}
        onPlayAgain={noop}
        onRequestRematch={noop}
        onSearchAgain={noop}
        rematchActionsAvailable
        rematchRequests={[request]}
      />,
    )

    expect(renderLifecycle(declinedRequest)).toContain('Rematch request declined.')
    expect(renderLifecycle(cancelledRequest)).toContain('Rematch request cancelled.')
    expect(renderLifecycle(expiredRequest)).toContain('Rematch request expired.')
    expect(renderLifecycle(idempotentCreatedRequest)).toContain('Rematch game already created.')
  })
})

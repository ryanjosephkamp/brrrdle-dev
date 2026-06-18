import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { AuthenticatedLiveSpectatorGame } from './multiplayerRepository'
import { createMultiplayerGame, joinMultiplayerGame } from './multiplayer'
import { MultiplayerWorkspace } from './MultiplayerWorkspace'

const spectatorGame: AuthenticatedLiveSpectatorGame = {
  createdAt: '2026-06-14T06:30:00.000Z',
  currentTurnSeat: 'player-two',
  dailyDateKey: undefined,
  deadlineAt: undefined,
  difficulty: 'standard',
  goPuzzleCount: undefined,
  hardMode: false,
  id: 'spectator-game-1',
  mode: 'og',
  moves: [
    {
      createdAt: '2026-06-14T06:31:00.000Z',
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
    { label: 'Host', profile: { displayName: 'Host player' }, seat: 'player-one' },
    { label: 'Rival', profile: { displayName: 'Rival player' }, seat: 'player-two' },
  ],
  progress: {
    currentPuzzleIndex: 0,
    latestMoveAt: '2026-06-14T06:31:00.000Z',
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
  timeLimitMs: undefined,
  updatedAt: '2026-06-14T06:32:00.000Z',
  wordLength: 5,
}

describe('MultiplayerWorkspace', () => {
  it('renders workspace attention cues and Lobby/Live freshness summaries', () => {
    const lobby = createMultiplayerGame({
      createdAt: '2026-06-14T06:20:00.000Z',
      mode: 'og',
      playerUserIds: { 'player-one': 'rival-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const activeBase = createMultiplayerGame({
      createdAt: '2026-06-14T06:25:00.000Z',
      mode: 'go',
      playerUserIds: { 'player-one': 'rival-user' },
      scope: 'practice',
      wordLength: 5,
    })
    const active = joinMultiplayerGame({ games: [activeBase] }, {
      gameId: activeBase.id,
      now: '2026-06-14T06:26:00.000Z',
      userId: 'viewer-user',
    }).game!

    const html = renderToStaticMarkup(
      <MultiplayerWorkspace
        activeSubtab="overview"
        attention={{
          active: {
            ariaLabel: '1 Multiplayer game needs your turn',
            label: '1',
            tone: 'urgent',
          },
          live: {
            ariaLabel: '1 Live v1 game visible to you',
            label: '1',
            tone: 'neutral',
          },
          lobby: {
            ariaLabel: '1 open Multiplayer lobby',
            label: '1',
            tone: 'attention',
          },
        }}
        dailyDateKey="2026-06-14"
        onOpenHistory={() => undefined}
        onResumeGame={() => undefined}
        onSelectGame={() => undefined}
        onSubtabChange={() => undefined}
        renderDailyPanel={() => <div>Daily panel</div>}
        renderPracticePanel={() => <div>Practice panel</div>}
        state={{ games: [lobby, active] }}
        viewerUserId="viewer-user"
      />,
    )

    expect(html).toContain('Multiplayer workspace sections')
    expect(html).toContain('aria-label="Active Games"')
    expect(html).toContain('aria-describedby="subtab-multiplayer-workspace-sections-active-attention"')
    expect(html).toContain('1 Multiplayer game needs your turn')
    expect(html).toContain('aria-label="Lobby"')
    expect(html).toContain('aria-describedby="subtab-multiplayer-workspace-sections-lobby-attention"')
    expect(html).toContain('1 open Multiplayer lobby')
    expect(html).toContain('aria-label="Live"')
    expect(html).toContain('aria-describedby="subtab-multiplayer-workspace-sections-live-attention"')
    expect(html).toContain('1 Live v1 game visible to you')
    expect(html).toContain('Freshest Jun 14, 2026')
    expect(html).toContain('Live v1')
  })

  it('renders authenticated spectator Live v1 rows as read-only in the Live subtab', () => {
    const html = renderToStaticMarkup(
      <MultiplayerWorkspace
        activeSubtab="live"
        dailyDateKey="2026-06-14"
        liveSpectatorRows={[spectatorGame]}
        onOpenHistory={() => undefined}
        onResumeGame={() => undefined}
        onSelectGame={() => undefined}
        onSubtabChange={() => undefined}
        renderDailyPanel={() => <div>Daily panel</div>}
        renderPracticePanel={() => <div>Practice panel</div>}
        selectedGameId="spectator-game-1"
        state={{ games: [] }}
        viewerUserId="spectator-user"
      />,
    )

    expect(html).toContain('Participant resume and authenticated read-only spectator visibility')
    expect(html).toContain('Spectate live game')
    expect(html).toContain('Spectator view')
    expect(html).toContain('Read-only')
    expect(html).toContain('Host player')
    expect(html).not.toContain('Submit guess')
    expect(html).not.toContain('Forfeit')
    expect(html).not.toContain('Cancel game')
    expect(html).not.toContain('Join game')
  })

  it('renders a focused read-only spectator view when a spectator game is opened', () => {
    const html = renderToStaticMarkup(
      <MultiplayerWorkspace
        activeSubtab="live"
        dailyDateKey="2026-06-14"
        focusedSpectatorGameId="spectator-game-1"
        liveSpectatorRows={[spectatorGame]}
        onCloseFocusedSpectatorGame={() => undefined}
        onOpenHistory={() => undefined}
        onOpenFocusedSpectatorGame={() => undefined}
        onResumeGame={() => undefined}
        onSelectGame={() => undefined}
        onSubtabChange={() => undefined}
        renderDailyPanel={() => <div>Daily panel</div>}
        renderPracticePanel={() => <div>Practice panel</div>}
        state={{ games: [] }}
        viewerUserId="spectator-user"
      />,
    )

    expect(html).toContain('Focused spectator view')
    expect(html).toContain('Practice Multiplayer OG')
    expect(html).toContain('Host vs Rival')
    expect(html).toContain('Back to Live list')
    expect(html).toContain('focused-live-spectator-details-spectator-game-1')
    expect(html).not.toContain('Multiplayer workspace sections')
    expect(html).not.toContain('Submit guess')
    expect(html).not.toContain('Forfeit')
    expect(html).not.toContain('Cancel game')
    expect(html).not.toContain('Join game')
  })
})

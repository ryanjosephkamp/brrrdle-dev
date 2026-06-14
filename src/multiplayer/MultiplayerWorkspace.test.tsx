import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createMultiplayerGame, joinMultiplayerGame } from './multiplayer'
import { MultiplayerWorkspace } from './MultiplayerWorkspace'

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
            ariaLabel: '1 Live v0 game visible to you',
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
    expect(html).toContain('1 Live v0 game visible to you')
    expect(html).toContain('Freshest Jun 14, 2026')
    expect(html).toContain('Live v0')
  })
})

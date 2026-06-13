import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { MultiplayerLiveGameViewModel } from './multiplayerViewModels'
import { MultiplayerLive } from './MultiplayerLive'

function noop() {}

const liveGame: MultiplayerLiveGameViewModel = {
  actionLabel: 'Resume live game',
  detailLabel: 'Your turn · 2 turns submitted',
  id: 'live-game-1',
  mode: 'og',
  modeLabel: 'OG',
  opponentLabel: 'Rival',
  ruleLabel: '5 letters · No time limit',
  scope: 'practice',
  scopeLabel: 'Practice Multiplayer',
  title: 'Practice Multiplayer OG',
  turnLabel: 'Your turn',
  updatedAt: '2026-06-13T05:00:00.000Z',
}

describe('MultiplayerLive', () => {
  it('renders an auth-required state for anonymous viewers', () => {
    const html = renderToStaticMarkup(
      <MultiplayerLive liveGames={[]} onResumeGame={noop} restrictedGameCount={0} />,
    )

    expect(html).toContain('Sign in to view Live games.')
    expect(html).toContain('only shows active Multiplayer games that belong to your account')
  })

  it('renders participant-resumable Live rows', () => {
    const html = renderToStaticMarkup(
      <MultiplayerLive liveGames={[liveGame]} onResumeGame={noop} restrictedGameCount={0} viewerUserId="host-user" />,
    )

    expect(html).toContain('Practice Multiplayer')
    expect(html).toContain('Resume live game')
    expect(html).toContain('Your turn')
    expect(html).toContain('Live')
  })

  it('renders restricted messaging without exposing nonparticipant rows', () => {
    const html = renderToStaticMarkup(
      <MultiplayerLive liveGames={[]} onResumeGame={noop} restrictedGameCount={2} viewerUserId="host-user" />,
    )

    expect(html).toContain('No live games ready to resume.')
    expect(html).toContain('2 active games are hidden')
    expect(html).not.toContain('Resume live game')
  })
})

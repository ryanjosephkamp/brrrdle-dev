import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MultiplayerStatsPanel } from './MultiplayerStatsPanel'

describe('MultiplayerStatsPanel', () => {
  it('renders empty competitive multiplayer state without touching solo stats', () => {
    const html = renderToStaticMarkup(<MultiplayerStatsPanel />)

    expect(html).toContain('Competitive multiplayer')
    expect(html).toContain('No rated results yet')
    expect(html).toContain('No multiplayer results recorded yet')
    expect(html).toContain('How ranked Elo works')
    expect(html).toContain('Ranked Practice starts each rating bucket at 1200')
    expect(html).toContain('first 10 ranked Practice games are provisional and move faster with K=40')
    expect(html).toContain('established ratings use K=24')
    expect(html).toContain('standard 400-point expected-score curve')
    expect(html).toContain('wins count as 1, draws as 0.5, and losses as 0')
    expect(html).toContain('Only eligible ranked Practice v1 games affect Elo')
  })

  it('renders rating profiles and recent result summaries', () => {
    const html = renderToStaticMarkup(
      <MultiplayerStatsPanel
        state={{
          customGames: [],
          rating: {
            profiles: [{
              bucket: 'multiplayer:og',
              draws: 0,
              gamesPlayed: 1,
              losses: 0,
              provisional: true,
              rating: 1220,
              updatedAt: '2026-06-04T12:00:00.000Z',
              userId: 'user-a',
              wins: 1,
            }],
            transactions: [{
              bucket: 'multiplayer:og',
              createdAt: '2026-06-04T12:05:00.000Z',
              expectedScore: 0.5,
              id: 'transaction-1',
              matchId: 'match-1',
              newRating: 1220,
              oldRating: 1200,
              opponentUserId: 'user-b',
              outcome: 'win',
              ratingDelta: 20,
              userId: 'user-a',
            }],
          },
          results: [
            {
              bucket: 'multiplayer:og',
              mode: 'og',
              players: [],
              ranked: true,
              scope: 'practice',
              sourceMatchId: 'match-1',
              status: 'completed',
              summary: 'You won the multiplayer match',
            },
            {
              bucket: 'multiplayer:og',
              mode: 'og',
              players: [],
              ranked: false,
              scope: 'practice',
              sourceMatchId: 'match-2',
              status: 'completed',
              summary: 'You won an unranked multiplayer match',
            },
          ],
        }}
      />,
    )

    expect(html).toContain('1220')
    expect(html).toContain('MULTIPLAYER OG')
    expect(html).toContain('Provisional · 9 matches until established')
    expect(html).toContain('You won the multiplayer match')
    expect(html).toContain('Points decide match results; Elo changes only after trusted settlement')
    expect(html).toContain('Unranked, custom, Daily, timed Practice, guest, corrupt, or spectator-only outcomes do not move Elo.')
    expect(html).toContain('These rows come from trusted settlement transactions.')
  })
})

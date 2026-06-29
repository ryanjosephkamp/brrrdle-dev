import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { LeaderboardPanel } from './LeaderboardPanel'

describe('LeaderboardPanel', () => {
  it('renders the public ranked leaderboard and competitive multiplayer ratings outside Stats', () => {
    const html = renderToStaticMarkup(
      <LeaderboardPanel authStatus="anonymous" />,
    )

    expect(html).toContain('Leaderboard')
    expect(html).toContain('Public ranked Practice leaderboards and competitive multiplayer ratings live here')
    expect(html).toContain('Ranked Practice leaderboard')
    expect(html).toContain('Sign in to view public ranked Practice leaderboards')
    expect(html).toContain('Competitive multiplayer')
    expect(html).toContain('No rated results yet')
    expect(html).toContain('public leaderboards are display-only')
    expect(html).not.toContain('All buckets')
    expect(html).not.toContain('multiplayer:og:timed:v1')
  })

  it('passes viewer rating state through to the competitive rating panel', () => {
    const html = renderToStaticMarkup(
      <LeaderboardPanel
        authStatus="authenticated"
        competitiveMultiplayer={{
          customGames: [],
          rating: {
            profiles: [
              {
                bucket: 'multiplayer:og',
                draws: 0,
                gamesPlayed: 12,
                losses: 4,
                provisional: false,
                rating: 1340,
                updatedAt: '2026-06-28T19:00:00.000Z',
                userId: 'viewer',
                wins: 8,
              },
              {
                bucket: 'multiplayer:og',
                draws: 0,
                gamesPlayed: 12,
                losses: 2,
                provisional: false,
                rating: 1450,
                updatedAt: '2026-06-28T19:01:00.000Z',
                userId: 'rival',
                wins: 10,
              },
            ],
            transactions: [],
          },
          results: [],
        }}
        viewerUserId="viewer"
      />,
    )

    expect(html).toContain('Ranked Practice OG')
    expect(html).toContain('1340')
    expect(html).toContain('Gold band')
    expect(html).not.toContain('1450')
  })
})

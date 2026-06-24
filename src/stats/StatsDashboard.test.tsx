import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { createEmptyStatistics } from './statistics'
import { StatsDashboard } from './StatsDashboard'

describe('StatsDashboard', () => {
  it('surfaces public ranked leaderboards while preserving local stats copy', () => {
    const html = renderToStaticMarkup(
      <StatsDashboard authStatus="anonymous" stats={createEmptyStatistics()} />,
    )

    expect(html).toContain('Statistics')
    expect(html).toContain('Local stats stay private on this device')
    expect(html).toContain('Ranked Practice leaderboard')
    expect(html).toContain('Sign in to view public ranked Practice leaderboards')
    expect(html).toContain('og daily')
    expect(html).toContain('Competitive multiplayer')
  })

  it('keeps chart accessibility tables visually hidden with the project helper', () => {
    const html = renderToStaticMarkup(
      <StatsDashboard authStatus="anonymous" stats={createEmptyStatistics()} />,
    )

    expect(html).toContain('<table class="brrrdle-visually-hidden">')
    expect(html).not.toContain('<table class="sr-only">')
    expect(html).toContain('<caption>Win rate by mode &amp; scope</caption>')
    expect(html).toContain('<caption>Recent activity</caption>')
  })
})

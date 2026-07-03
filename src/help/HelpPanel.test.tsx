import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { HelpPanel } from './HelpPanel'

describe('HelpPanel', () => {
  it('covers current onboarding, help, and tutorial topics without persistence or mutation controls', () => {
    const html = renderToStaticMarkup(<HelpPanel />)

    expect(html).toContain('Help and tutorials')
    expect(html).toContain('Solo Daily')
    expect(html).toContain('Solo Practice')
    expect(html).toContain('OG and GO')
    expect(html).toContain('Daily versus Practice')
    expect(html).toContain('Hard Mode')
    expect(html).toContain('Practice Multiplayer')
    expect(html).toContain('Daily Multiplayer')
    expect(html).toContain('Ranked Practice')
    expect(html).toContain('Elo and ranks are display-only explanations')
    expect(html).toContain('Leaderboards and profiles')
    expect(html).toContain('Public profile links use only approved public profile fields')
    expect(html).toContain('Private Practice requests')
    expect(html).toContain('accepted games through participant-owned open or resume flows')
    expect(html).toContain('Public and guest Live spectator surfaces are read-only')
    expect(html).toContain('Daily spectator access remains excluded')
    expect(html).toContain('Definitions, stats, and history')
    expect(html).toContain('Settings controls preferences')
    expect(html).toContain('Feedback opens the pre-filled report surface')
    expect(html).toContain('These steps are guidance only')
    expect(html).toContain('They do not save settings, claim a Daily game, join a queue, or create a match')
  })

  it('renders route buttons only when a route handler is provided', () => {
    const staticHtml = renderToStaticMarkup(<HelpPanel />)
    const navigableHtml = renderToStaticMarkup(<HelpPanel onNavigate={() => undefined} />)

    expect(staticHtml).not.toContain('Open Multiplayer')
    expect(navigableHtml).toContain('Open Multiplayer')
    expect(navigableHtml).toContain('Open Settings')
  })
})

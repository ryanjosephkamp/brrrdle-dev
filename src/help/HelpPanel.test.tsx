import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { HelpPanel } from './HelpPanel'

describe('HelpPanel', () => {
  it('keeps Help focused on quick routing and first-run guidance without persistence or mutation controls', () => {
    const html = renderToStaticMarkup(<HelpPanel />)

    expect(html).toContain('Help and tutorials')
    expect(html).toContain('A short, read-only route guide')
    expect(html).toContain('Quick route guide')
    expect(html).toContain('A safe first run')
    expect(html).toContain('These steps are guidance only')
    expect(html).toContain('They do not save settings, claim a Daily game, join a queue, or create a match')
    expect(html).toContain('Need the rule details?')
    expect(html).toContain('About page keeps the deeper OG/GO')
    expect(html).not.toContain('Elo and ranks are display-only explanations')
    expect(html).not.toContain('Public and guest Live spectator surfaces are read-only')
  })

  it('renders route buttons only when a route handler is provided', () => {
    const staticHtml = renderToStaticMarkup(<HelpPanel />)
    const navigableHtml = renderToStaticMarkup(<HelpPanel onNavigate={() => undefined} />)

    expect(staticHtml).not.toContain('Open Multiplayer')
    expect(navigableHtml).toContain('Open Multiplayer')
    expect(navigableHtml).toContain('Open Settings')
    expect(navigableHtml).toContain('Open About')
  })
})

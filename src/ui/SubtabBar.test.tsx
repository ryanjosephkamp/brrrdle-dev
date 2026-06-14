import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { SubtabBar } from './SubtabBar'

describe('SubtabBar', () => {
  it('renders accessible tab semantics with one active tab', () => {
    const html = renderToStaticMarkup(
      <SubtabBar
        activeId="daily"
        label="Solo sections"
        onSelect={() => undefined}
        options={[
          { id: 'overview', label: 'Overview' },
          { id: 'daily', label: 'Daily' },
          { id: 'practice', label: 'Practice' },
        ]}
      />,
    )

    expect(html).toContain('role="tablist"')
    expect(html).toContain('aria-label="Solo sections"')
    expect(html).toContain('role="tab"')
    expect(html).toContain('aria-selected="true"')
    expect(html).toContain('tabindex="0"')
    expect(html).toContain('tabindex="-1"')
  })

  it('renders optional attention badges as descriptions without changing tab names', () => {
    const html = renderToStaticMarkup(
      <SubtabBar
        activeId="overview"
        label="Multiplayer sections"
        onSelect={() => undefined}
        options={[
          { id: 'overview', label: 'Overview' },
          {
            attention: {
              ariaLabel: '2 Multiplayer games need your turn',
              label: '2',
              tone: 'urgent',
            },
            id: 'active',
            label: 'Active',
          },
        ]}
      />,
    )

    expect(html).toContain('role="tablist"')
    expect(html).toContain('aria-label="Active"')
    expect(html).toContain('aria-describedby="subtab-multiplayer-sections-active-attention"')
    expect(html).toContain('2 Multiplayer games need your turn')
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('data-tone="urgent"')
  })
})

import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { SoloWorkspace } from './SoloWorkspace'

describe('SoloWorkspace', () => {
  it('renders workspace attention cues in Solo subtabs', () => {
    const html = renderToStaticMarkup(
      <SoloWorkspace
        activeSubtab="overview"
        attention={{
          active: {
            ariaLabel: '2 active Solo games',
            label: '2',
            tone: 'attention',
          },
          daily: {
            ariaLabel: 'Daily Solo is ready',
            label: 'Ready',
            tone: 'attention',
          },
        }}
        dailyMode="og"
        history={[]}
        onDailyModeChange={() => undefined}
        onOpenCalendar={() => undefined}
        onOpenHistory={() => undefined}
        onPracticeModeChange={() => undefined}
        onResumeGame={() => undefined}
        onSelectActiveGame={() => undefined}
        onSubtabChange={() => undefined}
        practiceMode="og"
        renderDailyGame={() => <div>Daily game</div>}
        renderPracticeGame={() => <div>Practice game</div>}
        resumeSlots={{}}
      />,
    )

    expect(html).toContain('Solo workspace sections')
    expect(html).toContain('aria-label="Active Games"')
    expect(html).toContain('aria-describedby="subtab-solo-workspace-sections-active-attention"')
    expect(html).toContain('2 active Solo games')
    expect(html).toContain('aria-label="Daily Solo"')
    expect(html).toContain('aria-describedby="subtab-solo-workspace-sections-daily-attention"')
    expect(html).toContain('Daily Solo is ready')
    expect(html).toContain('No active solo games.')
  })
})

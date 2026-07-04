import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { GameHistoryEntry } from '../account'
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

  it('keeps Solo mode controls compact and renders recent results without horizontal tables', () => {
    const history: GameHistoryEntry[] = [
      {
        attemptsUsed: 11,
        coinAward: 12,
        completedAt: '2026-06-13T03:00:00.000Z',
        gameId: 'daily-go-1',
        mode: 'go',
        scope: 'daily',
        status: 'lost',
        word: 'crane,plumb,sleet',
        wordLength: 5,
        xpAward: 60,
      },
      {
        attemptsUsed: 4,
        coinAward: 8,
        completedAt: '2026-06-13T01:00:00.000Z',
        gameId: 'practice-og-1',
        mode: 'og',
        scope: 'practice',
        status: 'won',
        word: 'brisk',
        wordLength: 5,
        xpAward: 40,
      },
    ]
    const overviewHtml = renderToStaticMarkup(
      <SoloWorkspace
        activeSubtab="overview"
        dailyMode="og"
        history={history}
        onDailyModeChange={() => undefined}
        onOpenCalendar={() => undefined}
        onOpenHistory={() => undefined}
        onPracticeModeChange={() => undefined}
        onResumeGame={() => undefined}
        onSelectActiveGame={() => undefined}
        onSubtabChange={() => undefined}
        practiceMode="go"
        renderDailyGame={() => <div>Daily game</div>}
        renderPracticeGame={() => <div>Practice game</div>}
        resumeSlots={{}}
      />,
    )
    const practiceHtml = renderToStaticMarkup(
      <SoloWorkspace
        activeSubtab="practice"
        dailyMode="og"
        history={history}
        onDailyModeChange={() => undefined}
        onOpenCalendar={() => undefined}
        onOpenHistory={() => undefined}
        onPracticeModeChange={() => undefined}
        onResumeGame={() => undefined}
        onSelectActiveGame={() => undefined}
        onSubtabChange={() => undefined}
        practiceMode="go"
        renderDailyGame={() => <div>Daily game</div>}
        renderPracticeGame={() => <div>Practice game</div>}
        resumeSlots={{}}
      />,
    )

    expect(practiceHtml).toContain('aria-label="Practice Solo mode"')
    expect(practiceHtml).toContain('inline-flex w-fit')
    expect(overviewHtml).toContain('Daily Solo GO')
    expect(overviewHtml).toContain('Lost · 11 guesses')
    expect(overviewHtml).toContain('CRANE / PLUMB / SLEET')
    expect(overviewHtml).not.toContain('<table')
    expect(overviewHtml).not.toContain('overflow-x-auto')
    expect(overviewHtml).not.toContain('min-w-[42rem]')
  })
})

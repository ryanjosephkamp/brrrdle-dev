import { expect, test } from '@playwright/test'
import { createPracticeOgSetup } from '../../src/game'
import {
  collectScrollDiagnostics,
  expectLocatorCenterNotCovered,
  expectNoConsoleFailures,
  expectNoHorizontalOverflow,
  expectPageCanScrollToEnd,
  expectPageCanScrollVertically,
  installConsoleGuards,
} from '../fixtures/assertions'
import { chooseSoloPracticeMode, navigateToSoloPractice, submitSoloGuessWithKeyboard } from '../fixtures/gameActions'

const MOBILE_VIEWPORT = { height: 844, width: 390 } as const

interface MobileRouteTarget {
  readonly label: string
  readonly navigationName?: RegExp
  readonly title: RegExp
}

const MOBILE_SCROLL_TARGETS: readonly MobileRouteTarget[] = [
  { label: 'Home', title: /^Home$/i },
  { label: 'Solo', navigationName: /^Solo$/i, title: /^Solo$/i },
  { label: 'Calendar', navigationName: /^Calendar$/i, title: /^Calendar$/i },
  { label: 'Multiplayer', navigationName: /^Multiplayer$/i, title: /^Multiplayer$/i },
  { label: 'History', navigationName: /^History$/i, title: /^History$/i },
  { label: 'Stats', navigationName: /^Stats$/i, title: /^Stats$/i },
  { label: 'Leaderboard', navigationName: /^Leaderboard$/i, title: /^Leaderboard$/i },
  { label: 'Word Explorer', navigationName: /^Words$/i, title: /^Word Explorer$/i },
  { label: 'Profile', navigationName: /^Profile$/i, title: /^Profile$/i },
  { label: 'Settings', navigationName: /^Settings$/i, title: /^Settings$/i },
  { label: 'About Brrrdle', navigationName: /^About$/i, title: /^About Brrrdle$/i },
]

function getWrongPracticeOgGuess(): string {
  const setup = createPracticeOgSetup(5, 0)
  const guess = [...setup.validGuesses].find((candidate) => candidate !== setup.answer)
  if (!guess) {
    throw new Error('Practice OG fixture did not include a wrong valid guess.')
  }
  return guess
}

test.describe('mobile scroll and layout regression harness @layout', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: MOBILE_VIEWPORT })

  for (const route of MOBILE_SCROLL_TARGETS) {
    test(`${route.label} remains scrollable without overflow or overlay occlusion`, async ({ page }) => {
      const consoleFailures = installConsoleGuards(page)
      await page.goto('/')

      if (route.navigationName) {
        const routeRail = page.getByRole('navigation', { name: /^Brrrdle destinations$/i })
        await expect(routeRail).toBeVisible()
        await routeRail.getByRole('button', { name: route.navigationName }).click()
      }

      const routeTitle = page.getByRole('heading', { level: 1, name: route.title })
      await expect(routeTitle).toBeVisible()
      await expectNoHorizontalOverflow(page)

      const diagnostics = await expectPageCanScrollVertically(page)
      console.log(`mobile-scroll-diagnostics ${route.label}: ${JSON.stringify(diagnostics)}`)
      await expectPageCanScrollToEnd(page)

      await expectLocatorCenterNotCovered(routeTitle)
      if (route.navigationName) {
        const routeRail = page.getByRole('navigation', { name: /^Brrrdle destinations$/i })
        await expectLocatorCenterNotCovered(routeRail.getByRole('button', { name: route.navigationName }))
      }

      const finalDiagnostics = await collectScrollDiagnostics(page)
      expect(finalDiagnostics.scrollWidth).toBeLessThanOrEqual(finalDiagnostics.clientWidth + 1)
      await expectNoConsoleFailures(consoleFailures)
    })
  }

  test('Solo Practice OG keeps submitted-row context and keyboard visible after the first valid guess', async ({ page }) => {
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')
    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'og')

    await submitSoloGuessWithKeyboard(page, /Practice og puzzle/i, getWrongPracticeOgGuess())

    const soloRegion = page.getByRole('region', { name: /Practice og puzzle/i })
    const submittedTile = soloRegion.getByRole('gridcell', { name: /^Row 1, tile 1,/i })
    const keyboard = soloRegion.getByRole('region', { name: /^Keyboard$/i })
    await expect(soloRegion.getByText(/5 attempts remaining/i)).toBeVisible()
    await expect(submittedTile).toBeInViewport({ ratio: 0.4 })
    await expect(keyboard).toBeInViewport({ ratio: 0.75 })
    await expectNoHorizontalOverflow(page)
    await expectNoConsoleFailures(consoleFailures)
  })
})

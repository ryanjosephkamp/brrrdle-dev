import { expect, test } from '@playwright/test'
import {
  collectScrollDiagnostics,
  expectLocatorCenterNotCovered,
  expectNoConsoleFailures,
  expectNoHorizontalOverflow,
  expectPageCanScrollToEnd,
  expectPageCanScrollVertically,
  installConsoleGuards,
} from '../fixtures/assertions'

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
})

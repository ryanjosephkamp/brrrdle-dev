import { expect, test } from '@playwright/test'
import { expectNoConsoleFailures, installConsoleGuards } from '../fixtures/assertions'

const BROWSER_NAVIGATION_HISTORY_KEY = '__brrrdleNavigation'
const NAVIGATION_STORAGE_KEY = 'brrrdle:navigation:v2'

async function expectSelectedTab(page: import('@playwright/test').Page, name: RegExp): Promise<void> {
  await expect(page.getByRole('tab', { name })).toHaveAttribute('aria-selected', 'true')
}

test.describe('refresh route persistence @navigation', () => {
  test('uses the last saved tab navigation when browser history is stale during refresh', async ({ page }) => {
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')

    await page.evaluate(({ historyKey, storageKey }) => {
      const currentNavigation = {
        activeRouteId: 'solo',
        historyFilters: { mode: 'all', player: 'all', scope: 'all' },
        legacyPracticeMode: 'go',
        multiplayerSubtab: 'overview',
        selectedSoloGameKey: 'practice-go',
        soloSubtab: 'practice',
      }
      const staleNavigation = {
        activeRouteId: 'home',
        historyFilters: { mode: 'all', player: 'all', scope: 'all' },
        legacyPracticeMode: 'og',
        multiplayerSubtab: 'overview',
        soloSubtab: 'overview',
      }
      window.localStorage.setItem(storageKey, JSON.stringify(currentNavigation))
      window.sessionStorage.setItem(storageKey, JSON.stringify(currentNavigation))
      window.history.replaceState({
        [historyKey]: {
          version: 1,
          viewState: { navigation: staleNavigation },
        },
      }, '', window.location.href)
    }, {
      historyKey: BROWSER_NAVIGATION_HISTORY_KEY,
      storageKey: NAVIGATION_STORAGE_KEY,
    })

    await page.reload({ waitUntil: 'domcontentloaded' })

    await expect(page.locator('#solo-workspace-title')).toBeVisible()
    await expectSelectedTab(page, /^Practice Solo$/i)
    await expect(page.getByRole('region', { name: /Practice go chain/i })).toBeVisible()
    await expectNoConsoleFailures(consoleFailures)
  })

  test('keeps a newly selected Solo Practice GO surface after an immediate browser refresh', async ({ page }) => {
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')

    await page.getByRole('button', { name: /^Solo$/i }).click()
    await expect(page.locator('#solo-workspace-title')).toBeVisible()
    await page.getByRole('tab', { name: /^Practice Solo$/i }).click()
    await expect(page.getByRole('group', { name: /^Practice Solo mode$/i })).toBeVisible()
    await page.getByRole('group', { name: /^Practice Solo mode$/i }).getByRole('button', { name: /^GO$/i }).click()

    await page.reload({ waitUntil: 'domcontentloaded' })

    await expect(page.locator('#solo-workspace-title')).toBeVisible()
    await expectSelectedTab(page, /^Practice Solo$/i)
    await expect(page.getByRole('region', { name: /Practice go chain/i })).toBeVisible()
    await expectNoConsoleFailures(consoleFailures)
  })

  test('keeps a newly selected Multiplayer Lobby surface after an immediate browser refresh', async ({ page }) => {
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')

    await page.getByRole('button', { name: /^Multiplayer$/i }).click()
    await expect(page.locator('#multiplayer-workspace-title')).toBeVisible()
    await page.getByRole('tab', { name: /^Lobby$/i }).click()

    await page.reload({ waitUntil: 'domcontentloaded' })

    await expect(page.locator('#multiplayer-workspace-title')).toBeVisible()
    await expectSelectedTab(page, /^Lobby$/i)
    await expect(page.getByRole('heading', { level: 3, name: /^Lobby$/i })).toBeVisible()
    await expectNoConsoleFailures(consoleFailures)
  })
})

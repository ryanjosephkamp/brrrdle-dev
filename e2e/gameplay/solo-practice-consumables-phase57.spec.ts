import { expect, test } from '@playwright/test'
import { createDefaultGuestProgress } from '../../src/account'
import { createPracticeGoSetup, createPracticeOgSetup } from '../../src/game'
import { expectNoConsoleFailures, installConsoleGuards } from '../fixtures/assertions'
import { chooseSoloPracticeMode, navigateToSoloPractice } from '../fixtures/gameActions'

const GUEST_PROGRESS_STORAGE_KEY = 'brrrdle:guest-progress:v1'

test.describe('Phase 57 Solo Practice marketplace and consumables @solo @practice', () => {
  test('buys, uses, persists, and scope-gates both consumables', async ({ page }) => {
    const seeded = createDefaultGuestProgress()
    await page.addInitScript(({ key, progress }) => {
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, JSON.stringify(progress))
      }
    }, {
      key: GUEST_PROGRESS_STORAGE_KEY,
      progress: { ...seeded, progression: { ...seeded.progression, coins: 100 } },
    })
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')

    await page.getByRole('button', { name: /^Market$/i }).click()
    await expect(page.locator('#marketplace-title')).toBeVisible()
    await page.getByRole('button', { name: /Buy for 25 coins/i }).click()
    await expect(page.getByText('Purchase complete.')).toBeVisible()
    await expect(page.getByText('75 coins available.')).toBeVisible()
    await page.getByRole('button', { name: /Buy for 40 coins/i }).click()
    await expect(page.getByText('35 coins available.')).toBeVisible()

    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'og')
    const game = page.getByRole('region', { name: /Practice og puzzle/i })
    await expect(game.getByText('Solo Practice tools')).toBeVisible()
    await game.getByRole('button', { name: /Reveal letter \(1\)/i }).click()
    await expect(game.getByText(/^Revealed: 1:/i)).toBeVisible()
    await game.getByRole('button', { name: /Remove incorrect letters \(1\)/i }).click()

    const answer = createPracticeOgSetup(5, 0).answer.toLocaleLowerCase('en-US')
    const removedLetter = [...'abcdefghijklmnopqrstuvwxyz'].find((letter) => !answer.includes(letter))
    expect(removedLetter).toBeTruthy()
    const removedKey = game.getByRole('button', { name: new RegExp(`^Enter ${removedLetter}$`, 'i') })
    await expect(removedKey).toBeDisabled()
    await expect.poll(async () => page.evaluate((key) => {
      const raw = window.localStorage.getItem(key)
      if (!raw) return undefined
      const progress = JSON.parse(raw) as { resumeSlots?: { 'practice-og'?: { serializedSession?: { consumableEffects?: unknown } } } }
      return progress.resumeSlots?.['practice-og']?.serializedSession?.consumableEffects
    }, GUEST_PROGRESS_STORAGE_KEY)).toEqual({
      removedLetters: expect.arrayContaining([removedLetter]),
      revealedHints: [expect.objectContaining({ index: 0 })],
    })

    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(page.locator('#dashboard-home-title')).toBeVisible()
    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'og')
    await expect(page.getByRole('region', { name: /Practice og puzzle/i }).getByText(/^Revealed: 1:/i)).toBeVisible()
    await expect(page.getByRole('region', { name: /Practice og puzzle/i }).getByRole('button', { name: new RegExp(`^Enter ${removedLetter}$`, 'i') })).toBeDisabled()

    await page.getByRole('tab', { name: /^Daily Solo$/i }).click()
    await expect(page.getByText('Solo Practice tools')).toHaveCount(0)
    await page.getByRole('button', { name: /^Multiplayer$/i }).click()
    await expect(page.getByText('Solo Practice tools')).toHaveCount(0)
    await expectNoConsoleFailures(consoleFailures)
  })

  test('persists GO consumable effects for the active chain puzzle', async ({ page }) => {
    const seeded = createDefaultGuestProgress()
    await page.addInitScript(({ key, progress }) => {
      if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, JSON.stringify(progress))
    }, {
      key: GUEST_PROGRESS_STORAGE_KEY,
      progress: {
        ...seeded,
        progression: {
          ...seeded.progression,
          consumables: { removeIncorrectLetters: 1, revealOneLetter: 1 },
        },
      },
    })
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')
    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'go')
    const game = page.getByRole('region', { name: /Practice go chain/i })
    await game.getByRole('button', { name: /Reveal letter \(1\)/i }).click()
    await game.getByRole('button', { name: /Remove incorrect letters \(1\)/i }).click()

    const answer = createPracticeGoSetup(5, 0).puzzles[0]!.answer.toLocaleLowerCase('en-US')
    const removedLetter = [...'abcdefghijklmnopqrstuvwxyz'].find((letter) => !answer.includes(letter))!
    await expect(game.getByRole('button', { name: new RegExp(`^Enter ${removedLetter}$`, 'i') })).toBeDisabled()
    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(page.locator('#dashboard-home-title')).toBeVisible()
    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'go')
    const restored = page.getByRole('region', { name: /Practice go chain/i })
    await expect(restored.getByText(/^Revealed: 1:/i)).toBeVisible()
    await expect(restored.getByRole('button', { name: new RegExp(`^Enter ${removedLetter}$`, 'i') })).toBeDisabled()
    await expectNoConsoleFailures(consoleFailures)
  })
})

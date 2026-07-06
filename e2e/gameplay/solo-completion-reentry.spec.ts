import { expect, test, type Page } from '@playwright/test'
import { dateKeyToLocalDate } from '../../src/daily'
import { createDailyGoSetup, createPracticeGoSetup } from '../../src/game/go/session'
import { createDailyOgSetup, createPracticeOgSetup } from '../../src/game/og/session'
import { expectNoConsoleFailures, installConsoleGuards } from '../fixtures/assertions'
import { installFixedBrowserTime } from '../fixtures/dailyClock'
import { chooseSoloPracticeMode, navigateToSoloPractice, submitSoloGuessWithKeyboard } from '../fixtures/gameActions'

const GUEST_PROGRESS_STORAGE_KEY = 'brrrdle:guest-progress:v1'
const FIXED_DAILY_DATE_KEY = '2026-06-11'
const FIXED_DAILY_ISO = `${FIXED_DAILY_DATE_KEY}T16:00:00.000Z`

type SoloSlotKey = 'daily-og' | 'daily-go' | 'practice-og' | 'practice-go'

interface GuestProgressSnapshot {
  readonly completedGameIds: readonly string[]
  readonly history: readonly { readonly gameId: string }[]
  readonly progression: { readonly coins: number; readonly xp: number }
  readonly resumeSlot?: unknown
  readonly resumeSlots?: Partial<Record<SoloSlotKey, unknown>>
}

async function readGuestProgress(page: Page): Promise<GuestProgressSnapshot> {
  const rawProgress = await page.evaluate((key) => window.localStorage.getItem(key), GUEST_PROGRESS_STORAGE_KEY)
  if (!rawProgress) {
    throw new Error('Guest progress was not written to localStorage.')
  }
  return JSON.parse(rawProgress) as GuestProgressSnapshot
}

async function waitForCompletedGame(page: Page, gameId: string, slotKey: SoloSlotKey): Promise<GuestProgressSnapshot> {
  await expect.poll(async () => {
    const progress = await readGuestProgress(page)
    return progress.completedGameIds.includes(gameId) && !progress.resumeSlots?.[slotKey]
  }, { timeout: 20_000 }).toBe(true)
  return readGuestProgress(page)
}

async function navigateToSoloDaily(page: Page, mode: 'go' | 'og'): Promise<void> {
  await page.getByRole('button', { name: /^Solo$/i }).click()
  await expect(page.locator('#solo-workspace-title')).toBeVisible()
  await page.getByRole('tab', { name: /^Daily Solo$/i }).click()
  const modeGroup = page.getByRole('group', { name: /^Daily Solo mode$/i })
  await expect(modeGroup).toBeVisible()
  await modeGroup.getByRole('button', { name: new RegExp(`^${mode.toLocaleUpperCase('en-US')}$`, 'i') }).click()
}

async function goHome(page: Page): Promise<void> {
  await page.getByRole('button', { name: /brrrdle Command Center/i }).click()
  await expect(page.locator('#dashboard-home-title')).toBeVisible()
}

async function expectSubmittedWord(page: Page, gridLabel: RegExp, word: string, rowNumber: number): Promise<void> {
  const grid = page.getByRole('grid', { name: gridLabel }).first()
  await expect(grid).toBeVisible()
  for (const [index, letter] of [...word.toLocaleUpperCase('en-US')].entries()) {
    await expect(grid.getByLabel(new RegExp(`^Row ${rowNumber}, tile ${index + 1}, ${letter}$`, 'i'))).toBeVisible()
  }
}

async function expectTerminalState(page: Page, statusText: RegExp, gridLabel: RegExp, finalAnswer: string, rowNumber: number): Promise<void> {
  await expect(page.getByText(statusText).first()).toBeVisible({ timeout: 20_000 })
  await expectSubmittedWord(page, gridLabel, finalAnswer, rowNumber)
}

async function expectCompletionSurvivesReentry(
  page: Page,
  options: {
    readonly gameId: string
    readonly slotKey: SoloSlotKey
    readonly statusText: RegExp
    readonly gridLabel: RegExp
    readonly finalAnswer: string
    readonly finalAnswerRow: number
    readonly reenter: () => Promise<void>
  },
): Promise<void> {
  const completedProgress = await waitForCompletedGame(page, options.gameId, options.slotKey)
  expect(completedProgress.history.filter((entry) => entry.gameId === options.gameId)).toHaveLength(1)
  expect(completedProgress.resumeSlots?.[options.slotKey]).toBeUndefined()

  await goHome(page)
  await page.goBack()
  await expectTerminalState(page, options.statusText, options.gridLabel, options.finalAnswer, options.finalAnswerRow)
  await expect(readGuestProgress(page)).resolves.toEqual(completedProgress)

  await goHome(page)
  await options.reenter()
  await expectTerminalState(page, options.statusText, options.gridLabel, options.finalAnswer, options.finalAnswerRow)
  await expect(readGuestProgress(page)).resolves.toEqual(completedProgress)
}

async function solveGoChain(page: Page, regionName: RegExp, answers: readonly string[]): Promise<void> {
  for (const [index, answer] of answers.entries()) {
    await submitSoloGuessWithKeyboard(page, regionName, answer)
    if (index < answers.length - 1) {
      await expect(page.getByText(new RegExp(`Puzzle ${index + 2} of ${answers.length}`, 'i')).first()).toBeVisible({ timeout: 20_000 })
    }
  }
}

test.describe('Solo completion re-entry @solo @practice @daily', () => {
  test('keeps completed Practice OG visible across route re-entry and browser Back without duplicate rewards', async ({ page }) => {
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')
    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'og')

    const answer = createPracticeOgSetup(5, 0).answer
    await submitSoloGuessWithKeyboard(page, /Practice og puzzle/i, answer)
    await expectTerminalState(page, /^Solved\. Daily completion is preserved on refresh\.$/i, /^Guess grid$/i, answer, 1)

    await expectCompletionSurvivesReentry(page, {
      finalAnswer: answer,
      finalAnswerRow: 1,
      gameId: `og:practice:5:0:${answer}`,
      gridLabel: /^Guess grid$/i,
      reenter: async () => {
        await navigateToSoloPractice(page)
        await chooseSoloPracticeMode(page, 'og')
      },
      slotKey: 'practice-og',
      statusText: /^Solved\. Daily completion is preserved on refresh\.$/i,
    })
    await expectNoConsoleFailures(consoleFailures)
  })

  test('keeps completed Practice GO visible across route re-entry and browser Back without duplicate rewards', async ({ page }) => {
    const consoleFailures = installConsoleGuards(page)
    await page.goto('/')
    await navigateToSoloPractice(page)
    await chooseSoloPracticeMode(page, 'go')

    const answers = createPracticeGoSetup(5, 0).puzzles.map((puzzle) => puzzle.answer)
    await solveGoChain(page, /Practice go chain/i, answers)
    await expectTerminalState(page, /^Solved all 5 go puzzles\. Daily completion is preserved on refresh\.$/i, /^Go guess grid$/i, answers[answers.length - 1], answers.length)

    await expectCompletionSurvivesReentry(page, {
      finalAnswer: answers[answers.length - 1],
      finalAnswerRow: answers.length,
      gameId: `go:practice:5:${answers.join('-')}`,
      gridLabel: /^Go guess grid$/i,
      reenter: async () => {
        await navigateToSoloPractice(page)
        await chooseSoloPracticeMode(page, 'go')
      },
      slotKey: 'practice-go',
      statusText: /^Solved all 5 go puzzles\. Daily completion is preserved on refresh\.$/i,
    })
    await expectNoConsoleFailures(consoleFailures)
  })

  test('keeps completed Daily OG visible across route re-entry and browser Back without duplicate rewards', async ({ browser }) => {
    const context = await browser.newContext()
    await installFixedBrowserTime(context, FIXED_DAILY_ISO)
    const page = await context.newPage()
    const consoleFailures = installConsoleGuards(page)
    try {
      await page.goto('/')
      await navigateToSoloDaily(page, 'og')

      const answer = createDailyOgSetup(dateKeyToLocalDate(FIXED_DAILY_DATE_KEY)).answer
      await submitSoloGuessWithKeyboard(page, /Daily og puzzle/i, answer)
      await expectTerminalState(page, /^Solved\. Daily completion is preserved on refresh\.$/i, /^Guess grid$/i, answer, 1)

      await expectCompletionSurvivesReentry(page, {
        finalAnswer: answer,
        finalAnswerRow: 1,
        gameId: `og:daily:${FIXED_DAILY_DATE_KEY}`,
        gridLabel: /^Guess grid$/i,
        reenter: () => navigateToSoloDaily(page, 'og'),
        slotKey: 'daily-og',
        statusText: /^Solved\. Daily completion is preserved on refresh\.$/i,
      })
      await expectNoConsoleFailures(consoleFailures)
    } finally {
      await context.close()
    }
  })

  test('keeps completed Daily GO visible across route re-entry and browser Back without duplicate rewards', async ({ browser }) => {
    const context = await browser.newContext()
    await installFixedBrowserTime(context, FIXED_DAILY_ISO)
    const page = await context.newPage()
    const consoleFailures = installConsoleGuards(page)
    try {
      await page.goto('/')
      await navigateToSoloDaily(page, 'go')

      const answers = createDailyGoSetup(dateKeyToLocalDate(FIXED_DAILY_DATE_KEY)).puzzles.map((puzzle) => puzzle.answer)
      await solveGoChain(page, /Daily go chain/i, answers)
      await expectTerminalState(page, /^Solved all 5 go puzzles\. Daily completion is preserved on refresh\.$/i, /^Go guess grid$/i, answers[answers.length - 1], answers.length)

      await expectCompletionSurvivesReentry(page, {
        finalAnswer: answers[answers.length - 1],
        finalAnswerRow: answers.length,
        gameId: `go:daily:${FIXED_DAILY_DATE_KEY}`,
        gridLabel: /^Go guess grid$/i,
        reenter: () => navigateToSoloDaily(page, 'go'),
        slotKey: 'daily-go',
        statusText: /^Solved all 5 go puzzles\. Daily completion is preserved on refresh\.$/i,
      })
      await expectNoConsoleFailures(consoleFailures)
    } finally {
      await context.close()
    }
  })
})

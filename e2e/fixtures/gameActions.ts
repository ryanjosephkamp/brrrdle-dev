import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export async function navigateToSoloPractice(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Solo$/i }).click()
  await expect(page.locator('#solo-workspace-title')).toBeVisible()
  await page.getByRole('tab', { name: /^Practice Solo$/i }).click()
  await expect(page.getByRole('group', { name: /^Practice Solo mode$/i })).toBeVisible()
}

export async function chooseSoloPracticeMode(page: Page, mode: 'go' | 'og'): Promise<void> {
  const modeGroup = page.getByRole('group', { name: /^Practice Solo mode$/i })
  await modeGroup.getByRole('button', { name: new RegExp(`^${mode.toLocaleUpperCase('en-US')}$`, 'i') }).click()
}

export async function navigateToPracticeMultiplayer(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Multiplayer$/i }).click()
  await expect(page.locator('#multiplayer-workspace-title')).toBeVisible()
  await page.getByRole('tab', { name: /^Practice Multiplayer$/i }).click()
  await expect(page.getByRole('heading', { level: 3, name: /^Practice Multiplayer$/i })).toBeVisible()
}

export async function navigateToCalendar(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Calendar$/i }).click()
  await expect(page.getByRole('heading', { level: 1, name: /^Calendar$/i })).toBeVisible()
}

export async function chooseMultiplayerMode(page: Page, mode: 'go' | 'og', scope: 'daily' | 'practice' = 'practice'): Promise<void> {
  const panel = page.getByTestId(`multiplayer-panel-${scope}`)
  await expect(panel).toBeVisible()
  const modeSelect = panel.locator('select').first()
  await expect(modeSelect).toBeVisible()
  await modeSelect.selectOption(mode)
  await expect(modeSelect).toHaveValue(mode)
}

export async function setPracticeMultiplayerTimeLimit(page: Page, valueMs: string): Promise<void> {
  const panel = page.getByTestId('multiplayer-panel-practice')
  await expect(panel).toBeVisible()
  const timeLimitSelect = panel.locator('select').nth(2)
  await expect(timeLimitSelect).toBeVisible()
  await timeLimitSelect.selectOption(valueMs)
  await expect(timeLimitSelect).toHaveValue(valueMs)
}

export async function openMultiplayerMatch(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Open multiplayer match$/i }).click()
  await expect(page.getByTestId('multiplayer-status-message')).toContainText(/Multiplayer match opened|Ranked multiplayer match opened|Custom multiplayer lobby/i)
}

type MultiplayerRenderedStatus = 'cancelled' | 'expired' | 'lost' | 'playing' | 'waiting' | 'won'

interface SelectMultiplayerGameOptions {
  readonly reloadOnStaleStatus?: boolean
  readonly status?: MultiplayerRenderedStatus | RegExp
  readonly timeoutMs?: number
}

interface JoinWaitingMultiplayerGameOptions {
  readonly via?: 'lobby' | 'selected'
}

async function expectSelectedMultiplayerGame(page: Page, gameId: string, options: SelectMultiplayerGameOptions = {}): Promise<void> {
  const timeout = options.timeoutMs ?? 30_000
  const selectedGame = page.getByTestId('multiplayer-selected-game')
  await expect(selectedGame).toHaveAttribute('data-game-id', gameId, { timeout })
  if (options.status) {
    await expect(selectedGame).toHaveAttribute('data-status', options.status, { timeout })
  }
}

export async function selectMultiplayerGame(page: Page, gameId: string, options: SelectMultiplayerGameOptions = {}): Promise<void> {
  const selectedGame = page.getByTestId('multiplayer-selected-game')
  if (await selectedGame.getAttribute('data-game-id', { timeout: 1_000 }).catch(() => null) === gameId) {
    try {
      await expectSelectedMultiplayerGame(page, gameId, options)
    } catch (error) {
      if (!options.status || !options.reloadOnStaleStatus) {
        throw error
      }
      await page.reload({ waitUntil: 'domcontentloaded' })
      await expectSelectedMultiplayerGame(page, gameId, options)
    }
    return
  }
  const panelTab = page.getByTestId(`multiplayer-game-tab-${gameId}`)
  try {
    await panelTab.click({ timeout: 5_000 })
  } catch {
    const lobbyTab = page.getByRole('tab', { name: /^Lobby$/i })
    await lobbyTab.click()
    const lobbyAction = page.getByTestId(`multiplayer-lobby-action-${gameId}`)
    try {
      await lobbyAction.click({ timeout: 10_000 })
    } catch {
      await page.getByRole('tab', { name: /^Active Games$/i }).click()
      await page.getByTestId(`multiplayer-active-resume-${gameId}`).click({ timeout: 10_000 })
    }
  }
  await expectSelectedMultiplayerGame(page, gameId, options)
}

export async function joinMultiplayerMatch(page: Page): Promise<void> {
  const joinButton = page.getByRole('button', { name: /^Join multiplayer match$/i }).first()
  if (await joinButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
    await joinButton.click()
  }
  await expect(page.getByText(/Joined multiplayer match|Waiting for the next player|Your turn|Rival joined/i)).toBeVisible()
}

export async function joinWaitingMultiplayerGame(page: Page, gameId: string, options: JoinWaitingMultiplayerGameOptions = {}): Promise<void> {
  if (options.via === 'selected') {
    const joinButton = page.getByRole('button', { name: /^Join multiplayer match$/i }).first()
    await expect(joinButton).toBeVisible({ timeout: 20_000 })
    await joinButton.click({ timeout: 20_000 })
    try {
      await expectSelectedMultiplayerGame(page, gameId, { status: 'playing' })
    } catch {
      await page.reload({ waitUntil: 'domcontentloaded' })
      await expectSelectedMultiplayerGame(page, gameId, { status: 'playing' })
    }
    return
  }

  const lobbyTab = page.getByRole('tab', { name: /^Lobby$/i })
  await expect(lobbyTab).toBeVisible({ timeout: 20_000 })
  await lobbyTab.click()
  const lobbyAction = page.getByTestId(`multiplayer-lobby-action-${gameId}`)
  try {
    await expect(lobbyAction).toBeVisible({ timeout: 30_000 })
  } catch {
    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(lobbyTab).toBeVisible({ timeout: 20_000 })
    await lobbyTab.click()
    await expect(lobbyAction).toBeVisible({ timeout: 30_000 })
  }
  await lobbyAction.click({ timeout: 20_000 })
  await expect(page.getByText(/Joined multiplayer match|Waiting for the next player|Your turn|Rival joined/i)).toBeVisible()
  await expectSelectedMultiplayerGame(page, gameId, { status: 'playing' })
}

export async function submitGuessWithKeyboard(page: Page, guess: string): Promise<void> {
  const game = page.getByTestId('multiplayer-selected-game')
  for (const letter of guess.toLocaleUpperCase('en-US')) {
    await game.getByRole('button', { name: new RegExp(`^Enter ${letter}$`, 'i') }).click()
  }
  await game.getByRole('button', { name: /^Submit guess$/i }).click()
}

export async function submitSoloGuessWithKeyboard(page: Page, regionName: RegExp, guess: string): Promise<void> {
  const game = page.getByRole('region', { name: regionName })
  for (const letter of guess.toLocaleUpperCase('en-US')) {
    await game.getByRole('button', { name: new RegExp(`^Enter ${letter}$`, 'i') }).click()
  }
  await game.getByRole('button', { name: /^Submit guess$/i }).click()
}

export async function waitForTurn(page: Page): Promise<void> {
  await expect(page.getByText(/^Your turn$/i)).toBeVisible({ timeout: 20_000 })
}

export async function launchDailyMultiplayer(page: Page): Promise<void> {
  await navigateToCalendar(page)
  await page.getByRole('button', { name: /^Daily Multiplayer$/i }).click()
  await expect(page.getByRole('heading', { name: /^Daily Multiplayer$/i })).toBeVisible()
}

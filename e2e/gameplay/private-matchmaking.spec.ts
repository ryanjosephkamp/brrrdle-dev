import { expect, test, type Page } from '@playwright/test'
import { expectNoConsoleFailures } from '../fixtures/assertions'
import { getValidWrongGuess, projectionFromRow } from '../fixtures/answers'
import { navigateToPracticeMultiplayer, selectMultiplayerGame, submitGuessWithKeyboard, waitForTurn } from '../fixtures/gameActions'
import { fetchPublicProfileIdForUser, upsertPublicProfileForUser, waitForMultiplayerRowForUsers } from '../fixtures/supabaseAdmin'
import { createTwoClientSession } from '../fixtures/twoClientGame'

const NAVIGATION_STORAGE_KEY = 'brrrdle:navigation:v2'
const BROWSER_NAVIGATION_HISTORY_KEY = '__brrrdleNavigation'

async function openPublicProfile(page: Page, publicProfileId: string): Promise<void> {
  await page.evaluate(({ historyKey, key, profileId }) => {
    const navigation = {
      activeRouteId: 'public-profile',
      historyFilters: {
        mode: 'all',
        player: 'all',
        scope: 'all',
      },
      legacyPracticeMode: 'og',
      multiplayerSubtab: 'overview',
      selectedPublicProfileId: profileId,
      soloSubtab: 'overview',
    }
    window.localStorage.setItem(key, JSON.stringify(navigation))
    window.history.replaceState({
      [historyKey]: {
        version: 1,
        viewState: {
          navigation,
        },
      },
    }, '', window.location.href)
    window.location.assign('/')
  }, {
    historyKey: BROWSER_NAVIGATION_HISTORY_KEY,
    key: NAVIGATION_STORAGE_KEY,
    profileId: publicProfileId,
  })
  await page.waitForLoadState('domcontentloaded')
  await expect(page.getByRole('heading', { name: /^Player profile$/i })).toBeVisible({ timeout: 30_000 })
}

test.describe('Private matchmaking @multiplayer', () => {
  test('creates, accepts, and persists the requester first turn in a private Practice match', async ({ browser }) => {
    const session = await createTwoClientSession(browser)

    try {
      await Promise.all([
        upsertPublicProfileForUser(session.host.user, 'cyan'),
        upsertPublicProfileForUser(session.rival.user, 'rose'),
      ])
      const rivalPublicProfileId = await fetchPublicProfileIdForUser(session.rival.user)

      await openPublicProfile(session.host.page, rivalPublicProfileId)
      await expect(session.host.page.getByText(session.rival.user.displayName)).toBeVisible({ timeout: 30_000 })
      await expect(session.host.page.getByText(/Send an authenticated, unranked 5-letter OG Practice request/i)).toBeVisible()
      await session.host.page.getByRole('button', { name: /^Request Practice match$/i }).click()
      await expect(session.host.page.getByText(/Private Practice match request sent/i)).toBeVisible({ timeout: 30_000 })

      await navigateToPracticeMultiplayer(session.rival.page)
      const rivalRequests = session.rival.page.getByTestId('private-match-requests')
      await expect(rivalRequests).toContainText(`${session.host.user.displayName} requested a private match.`, { timeout: 30_000 })
      await expect(rivalRequests).toContainText(/OG, 5 letters, Hard Mode off, no clock/i)
      await rivalRequests.getByRole('button', { name: /^Accept private match$/i }).click()

      const createdRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      await expect(rivalRequests.getByRole('status')).toContainText(/Private match created|Opening existing private match/i, { timeout: 30_000 })
      await expect(session.rival.page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-game-id', createdRow.id, { timeout: 30_000 })
      await expect(session.rival.page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-status', 'playing')

      await navigateToPracticeMultiplayer(session.host.page)
      const hostRequests = session.host.page.getByTestId('private-match-requests')
      await expect(hostRequests).toContainText('0 active', { timeout: 30_000 })
      await expect(hostRequests).toContainText(/No active private match requests\./i)
      await expect(session.host.page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-game-id', createdRow.id, { timeout: 30_000 })
      await expect(session.host.page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-status', 'playing')
      await expect(session.host.page.getByTestId('multiplayer-selected-game')).toContainText(/Rival joined|Your turn/i, { timeout: 30_000 })

      await expect(session.host.page.locator('body')).not.toContainText(rivalPublicProfileId)
      await expect(session.rival.page.locator('body')).not.toContainText('playerUserIds')
      await expect(session.host.page.getByRole('tab', { name: /^Daily Multiplayer$/i })).toBeVisible()

      const createdGame = projectionFromRow(createdRow)
      const firstGuess = getValidWrongGuess(createdGame)

      await selectMultiplayerGame(session.host.page, createdRow.id, { reloadOnStaleStatus: true, status: 'playing' })
      await waitForTurn(session.host.page)
      await submitGuessWithKeyboard(session.host.page, firstGuess)

      await expect.poll(async () => {
        const row = await waitForMultiplayerRowForUsers({
          mode: 'og',
          scope: 'practice',
          status: 'playing',
          timeoutMs: 2_000,
          userIds: [session.host.user.id, session.rival.user.id],
        })
        return projectionFromRow(row).moves.length
      }, { timeout: 30_000 }).toBe(1)

      await selectMultiplayerGame(session.rival.page, createdRow.id, { reloadOnStaleStatus: true, status: 'playing' })
      await expect(session.rival.page.getByTestId('multiplayer-selected-game')).toContainText(new RegExp(firstGuess, 'i'), { timeout: 30_000 })
      await session.host.page.reload({ waitUntil: 'domcontentloaded' })
      await selectMultiplayerGame(session.host.page, createdRow.id, { reloadOnStaleStatus: true, status: 'playing' })
      await expect(session.host.page.getByTestId('multiplayer-selected-game')).toContainText(new RegExp(firstGuess, 'i'), { timeout: 30_000 })

      await session.rival.page.getByRole('button', { name: /^Forfeit$/i }).click()
      const forfeitedRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'lost',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const forfeitedGame = projectionFromRow(forfeitedRow)
      expect(forfeitedGame.forfeitedPlayerId).toBe('player-two')
      expect(forfeitedGame.winnerId).toBe('player-one')
      await session.rival.page.reload({ waitUntil: 'domcontentloaded' })
      await selectMultiplayerGame(session.rival.page, createdRow.id, { reloadOnStaleStatus: true, status: 'lost' })
      await expect(session.rival.page.getByText(/You forfeited this multiplayer match\./i)).toBeVisible({ timeout: 30_000 })

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })
})

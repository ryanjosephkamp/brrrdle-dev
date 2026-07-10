import { expect, test, type Page } from '@playwright/test'
import { expectNoConsoleFailures } from '../fixtures/assertions'
import { getCurrentAnswer, projectionFromRow } from '../fixtures/answers'
import {
  cancelRankedPracticeQueue,
  enterRankedPracticeQueue,
  navigateToLeaderboard,
  navigateToPracticeMultiplayer,
  openPublicProfileRoute,
  selectMultiplayerGame,
  submitGuessWithKeyboard,
  waitForTurn,
} from '../fixtures/gameActions'
import {
  fetchMultiplayerRowsForUsers,
  fetchPublicProfileIdForUser,
  fetchPublicRankedLeaderboardRowsForUser,
  fetchRankedQueueRowsForUsers,
  upsertPublicProfileForUser,
  waitForMultiplayerRowForExactUsers,
  waitForRankedQueueRowsForUsers,
} from '../fixtures/supabaseAdmin'
import { createThreeClientSession } from '../fixtures/threeClientGame'
import { createTwoClientSession } from '../fixtures/twoClientGame'

async function expectSelectedGame(page: Page, gameId: string): Promise<void> {
  await expect(page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-game-id', gameId, { timeout: 30_000 })
  await expect(page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-status', 'playing', { timeout: 30_000 })
}

async function expectPrivateRequestCount(page: Page, count: number): Promise<void> {
  const panel = page.getByTestId('private-match-requests')
  await expect(panel).toContainText(`${count} active`, { timeout: 30_000 })
  if (count === 0) {
    await expect(panel).toContainText(/No active private match requests\./i)
  }
}

async function sendPrivatePracticeRequest(page: Page, targetPublicProfileId: string): Promise<void> {
  await openPublicProfileRoute(page, targetPublicProfileId)
  await page.getByRole('button', { name: /^Request Practice match$/i }).click()
  await expect(page.getByText(/Private Practice request pending/i)).toBeVisible({ timeout: 30_000 })
}

test.describe('Multiplayer reliability characterization @multiplayer', () => {
  test('keeps cancelled ranked queue rows out of later three-client matching', async ({ browser }) => {
    const session = await createThreeClientSession(browser)

    try {
      await Promise.all([
        upsertPublicProfileForUser(session.host.user, 'cyan'),
        upsertPublicProfileForUser(session.rival.user, 'rose'),
        upsertPublicProfileForUser(session.third.user, 'violet'),
      ])

      await enterRankedPracticeQueue(session.host.page)
      await waitForRankedQueueRowsForUsers({
        status: 'queued',
        userIds: [session.host.user.id],
      })

      await cancelRankedPracticeQueue(session.host.page)
      await waitForRankedQueueRowsForUsers({
        status: 'cancelled',
        userIds: [session.host.user.id],
      })

      await enterRankedPracticeQueue(session.rival.page)
      await waitForRankedQueueRowsForUsers({
        status: 'queued',
        userIds: [session.rival.user.id],
      })
      await enterRankedPracticeQueue(session.third.page, { expectQueuedStatus: false })

      const matchedRow = await waitForMultiplayerRowForExactUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        timeoutMs: 30_000,
        userIds: [session.rival.user.id, session.third.user.id],
      })
      await expectSelectedGame(session.rival.page, matchedRow.id)
      await expectSelectedGame(session.third.page, matchedRow.id)

      const hostRows = await fetchMultiplayerRowsForUsers([session.host.user.id])
      expect(hostRows.some((row) => (
        row.status === 'playing'
        && (row.player_one_user_id === session.rival.user.id
          || row.player_two_user_id === session.rival.user.id
          || row.player_one_user_id === session.third.user.id
          || row.player_two_user_id === session.third.user.id)
      ))).toBe(false)

      const hostQueueRows = await fetchRankedQueueRowsForUsers([session.host.user.id])
      expect(hostQueueRows.some((row) => row.status === 'matched')).toBe(false)

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
      await expectNoConsoleFailures(session.third.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })

  test('re-enters ranked Practice queue from the current request after cancellation', async ({ browser }) => {
    const session = await createTwoClientSession(browser)

    try {
      await Promise.all([
        upsertPublicProfileForUser(session.host.user, 'cyan'),
        upsertPublicProfileForUser(session.rival.user, 'rose'),
      ])

      await enterRankedPracticeQueue(session.host.page)
      await waitForRankedQueueRowsForUsers({
        status: 'queued',
        userIds: [session.host.user.id],
      })

      await cancelRankedPracticeQueue(session.host.page)
      await waitForRankedQueueRowsForUsers({
        status: 'cancelled',
        userIds: [session.host.user.id],
      })
      await expect(session.host.page.getByRole('button', { name: /^Enter ranked queue$/i })).toBeEnabled({ timeout: 30_000 })
      await expect(session.host.page.getByRole('button', { name: /^Already queued$/i })).toHaveCount(0)

      await enterRankedPracticeQueue(session.host.page)
      await waitForRankedQueueRowsForUsers({
        status: 'queued',
        userIds: [session.host.user.id],
      })
      await enterRankedPracticeQueue(session.rival.page, { expectQueuedStatus: false })

      const matchedRow = await waitForMultiplayerRowForExactUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        timeoutMs: 30_000,
        userIds: [session.host.user.id, session.rival.user.id],
      })
      await expectSelectedGame(session.host.page, matchedRow.id)
      await expectSelectedGame(session.rival.page, matchedRow.id)

      const hostQueueRows = await fetchRankedQueueRowsForUsers([session.host.user.id])
      const cancelledRows = hostQueueRows.filter((row) => row.status === 'cancelled')
      const matchedRows = hostQueueRows.filter((row) => row.status === 'matched')
      expect(cancelledRows).toHaveLength(1)
      expect(matchedRows).toHaveLength(1)
      expect(matchedRows[0]?.id).not.toBe(cancelledRows[0]?.id)

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })

  test('refreshes public ranked leaderboard after a trusted ranked Practice settlement', async ({ browser }) => {
    const session = await createTwoClientSession(browser)

    try {
      await Promise.all([
        upsertPublicProfileForUser(session.host.user, 'cyan'),
        upsertPublicProfileForUser(session.rival.user, 'rose'),
      ])

      await enterRankedPracticeQueue(session.host.page)
      await waitForRankedQueueRowsForUsers({
        status: 'queued',
        userIds: [session.host.user.id],
      })
      await enterRankedPracticeQueue(session.rival.page, { expectQueuedStatus: false })

      const playingRow = await waitForMultiplayerRowForExactUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        timeoutMs: 30_000,
        userIds: [session.host.user.id, session.rival.user.id],
      })
      await expectSelectedGame(session.host.page, playingRow.id)
      await expectSelectedGame(session.rival.page, playingRow.id)

      const game = projectionFromRow(playingRow)
      await selectMultiplayerGame(session.host.page, playingRow.id, { reloadOnStaleStatus: true, status: 'playing' })
      await waitForTurn(session.host.page)
      await submitGuessWithKeyboard(session.host.page, getCurrentAnswer(game))
      await navigateToLeaderboard(session.host.page)

      const settledRow = await waitForMultiplayerRowForExactUsers({
        mode: 'og',
        scope: 'practice',
        status: 'won',
        timeoutMs: 60_000,
        userIds: [session.host.user.id, session.rival.user.id],
      })
      expect(settledRow.id).toBe(playingRow.id)
      await expect(session.host.page.getByRole('button', {
        name: `Open public profile for ${session.host.user.displayName}`,
      })).toBeVisible({ timeout: 60_000 })

      const leaderboardRows = await fetchPublicRankedLeaderboardRowsForUser(session.host.user, {
        bucket: 'multiplayer:og',
        limit: 50,
      })
      expect(leaderboardRows.some((row) => row.display_name === session.host.user.displayName)).toBe(true)
      for (const row of leaderboardRows) {
        expect(Object.keys(row)).not.toEqual(expect.arrayContaining([
          'answer',
          'auth_user_id',
          'email',
          'player_sessions',
          'queue_id',
          'rating_transaction_id',
          'serialized_session',
          'user_id',
        ]))
      }
      expect(JSON.stringify(leaderboardRows)).not.toContain(session.host.user.email)
      expect(JSON.stringify(leaderboardRows)).not.toContain(session.rival.user.email)
      expect(JSON.stringify(leaderboardRows)).not.toContain('playerUserIds')

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })

  test('refreshes mobile Practice request cancel and decline lifecycle lists on route re-entry', async ({ browser }) => {
    const session = await createTwoClientSession(browser)

    try {
      await Promise.all([
        session.host.page.setViewportSize({ width: 390, height: 844 }),
        session.rival.page.setViewportSize({ width: 390, height: 844 }),
      ])
      await Promise.all([
        upsertPublicProfileForUser(session.host.user, 'cyan'),
        upsertPublicProfileForUser(session.rival.user, 'rose'),
      ])
      const rivalPublicProfileId = await fetchPublicProfileIdForUser(session.rival.user)

      await sendPrivatePracticeRequest(session.host.page, rivalPublicProfileId)
      await navigateToPracticeMultiplayer(session.host.page)
      await navigateToPracticeMultiplayer(session.rival.page)
      await expectPrivateRequestCount(session.host.page, 1)
      await expectPrivateRequestCount(session.rival.page, 1)
      await expect(session.rival.page.getByTestId('private-match-requests')).toContainText(`${session.host.user.displayName} requested a private match.`, { timeout: 30_000 })

      await navigateToLeaderboard(session.rival.page)
      await session.host.page.getByTestId('private-match-requests').getByRole('button', { name: /^Cancel request$/i }).click()
      await expect(session.host.page.getByTestId('private-match-requests').getByRole('status')).toContainText(/Private match request cancelled\./i, { timeout: 30_000 })
      await expectPrivateRequestCount(session.host.page, 0)
      await navigateToPracticeMultiplayer(session.rival.page)
      await expectPrivateRequestCount(session.rival.page, 0)

      await navigateToLeaderboard(session.rival.page)
      await sendPrivatePracticeRequest(session.host.page, rivalPublicProfileId)
      await navigateToPracticeMultiplayer(session.host.page)
      await navigateToPracticeMultiplayer(session.rival.page)
      await expectPrivateRequestCount(session.host.page, 1)
      await expectPrivateRequestCount(session.rival.page, 1)

      await navigateToLeaderboard(session.host.page)
      await session.rival.page.getByTestId('private-match-requests').getByRole('button', { name: /^Decline$/i }).click()
      await expect(session.rival.page.getByTestId('private-match-requests').getByRole('status')).toContainText(/Private match request declined\./i, { timeout: 30_000 })
      await expectPrivateRequestCount(session.rival.page, 0)
      await navigateToPracticeMultiplayer(session.host.page)
      await expectPrivateRequestCount(session.host.page, 0)

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })

  test('probes private request acceptance routing and public ranked leaderboard access without exposing raw identifiers', async ({ browser }) => {
    const session = await createTwoClientSession(browser)

    try {
      await Promise.all([
        upsertPublicProfileForUser(session.host.user, 'cyan'),
        upsertPublicProfileForUser(session.rival.user, 'rose'),
      ])
      const rivalPublicProfileId = await fetchPublicProfileIdForUser(session.rival.user)

      await sendPrivatePracticeRequest(session.host.page, rivalPublicProfileId)
      await navigateToPracticeMultiplayer(session.rival.page)
      const rivalRequests = session.rival.page.getByTestId('private-match-requests')
      await expect(rivalRequests).toContainText(`${session.host.user.displayName} requested a private match.`, { timeout: 30_000 })
      await rivalRequests.getByRole('button', { name: /^Accept private match$/i }).click()

      const createdRow = await waitForMultiplayerRowForExactUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      await expectSelectedGame(session.rival.page, createdRow.id)

      await navigateToPracticeMultiplayer(session.host.page)
      await expectPrivateRequestCount(session.host.page, 0)
      await expectSelectedGame(session.host.page, createdRow.id)

      const leaderboardRows = await fetchPublicRankedLeaderboardRowsForUser(session.host.user, {
        bucket: 'multiplayer:og',
        limit: 10,
      })
      for (const row of leaderboardRows) {
        expect(Object.keys(row)).not.toEqual(expect.arrayContaining([
          'answer',
          'auth_user_id',
          'email',
          'player_sessions',
          'queue_id',
          'rating_transaction_id',
          'serialized_session',
          'user_id',
        ]))
      }
      expect(JSON.stringify(leaderboardRows)).not.toContain(session.host.user.email)
      expect(JSON.stringify(leaderboardRows)).not.toContain(session.rival.user.email)
      expect(JSON.stringify(leaderboardRows)).not.toContain('playerUserIds')

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })
})

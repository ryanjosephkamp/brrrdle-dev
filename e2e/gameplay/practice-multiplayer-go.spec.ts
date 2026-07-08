import { expect, test } from '@playwright/test'
import { expectKeyboardState, expectNoConsoleFailures } from '../fixtures/assertions'
import { getCurrentAnswer, projectionFromRow } from '../fixtures/answers'
import { chooseMultiplayerMode, navigateToPracticeMultiplayer, openMultiplayerMatch, joinWaitingMultiplayerGame, selectMultiplayerGame, submitGuessWithKeyboard, waitForTurn } from '../fixtures/gameActions'
import { waitForMultiplayerRowByIdForUsers, waitForMultiplayerRowForUsers } from '../fixtures/supabaseAdmin'
import { createTwoClientSession } from '../fixtures/twoClientGame'

test.describe('Practice Multiplayer GO @practice @multiplayer', () => {
  test('keeps clients synchronized across a solved GO transition with prior rows and keyboard evidence', async ({ browser }) => {
    const session = await createTwoClientSession(browser)
    try {
      await navigateToPracticeMultiplayer(session.host.page)
      await chooseMultiplayerMode(session.host.page, 'go')
      await openMultiplayerMatch(session.host.page)
      const waitingRow = await waitForMultiplayerRowForUsers({
        mode: 'go',
        scope: 'practice',
        status: 'waiting',
        userIds: [session.host.user.id],
      })
      await session.host.page.waitForTimeout(1500)
      const stableWaitingRow = await waitForMultiplayerRowByIdForUsers({
        id: waitingRow.id,
        mode: 'go',
        scope: 'practice',
        status: 'waiting',
        userIds: [session.host.user.id],
      })
      expect(stableWaitingRow.id).toBe(waitingRow.id)

      await navigateToPracticeMultiplayer(session.rival.page)
      await chooseMultiplayerMode(session.rival.page, 'go')
      await joinWaitingMultiplayerGame(session.rival.page, waitingRow.id)

      const playingRow = await waitForMultiplayerRowForUsers({
        mode: 'go',
        scope: 'practice',
        status: 'playing',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const game = projectionFromRow(playingRow)
      const firstAnswer = getCurrentAnswer(game)

      await selectMultiplayerGame(session.host.page, playingRow.id, { reloadOnStaleStatus: true, status: 'playing' })
      await waitForTurn(session.host.page)
      await submitGuessWithKeyboard(session.host.page, firstAnswer)

      const visibleAnswer = firstAnswer.toLocaleUpperCase('en-US')
      await expect(session.host.page.getByText(visibleAnswer, { exact: true }).first()).toBeVisible({ timeout: 20_000 })
      await expect(session.rival.page.getByText(visibleAnswer, { exact: true }).first()).toBeVisible({ timeout: 20_000 })
      await expect(session.host.page.getByText(/Puzzle 2 of 5/i).first()).toBeVisible({ timeout: 20_000 })
      await expect(session.rival.page.getByText(/Puzzle 2 of 5/i).first()).toBeVisible({ timeout: 20_000 })
      await expectKeyboardState(session.rival.page, firstAnswer[0], 'correct')

      await session.rival.page.reload()
      await selectMultiplayerGame(session.rival.page, playingRow.id, { reloadOnStaleStatus: true, status: 'playing' })
      await expect(session.rival.page.getByText(/Puzzle 2 of 5/i).first()).toBeVisible({ timeout: 20_000 })
      await expect(session.rival.page.getByText(visibleAnswer, { exact: true }).first()).toBeVisible()

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })
})

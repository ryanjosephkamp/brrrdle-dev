import type { Browser, BrowserContext, Page } from '@playwright/test'
import { cleanupE2eRun, type CleanupSummary } from './cleanup'
import { expectNoConsoleFailures, installConsoleGuards } from './assertions'
import { createE2eUser, createRunId, signInThroughUi, type E2eUser } from './testUsers'

interface ThreeClientActor {
  readonly consoleFailures: readonly string[]
  readonly context: BrowserContext
  readonly page: Page
  readonly user: E2eUser
}

export interface ThreeClientSession {
  readonly cleanup: () => Promise<CleanupSummary>
  readonly host: ThreeClientActor
  readonly rival: ThreeClientActor
  readonly third: ThreeClientActor
  readonly runId: string
}

const EMPTY_CLEANUP_SUMMARY: CleanupSummary = {
  multiplayerRowsDeleted: 0,
  privateMatchRequestsDeleted: 0,
  rankedQueueRowsDeleted: 0,
  rankedRatingRowsDeleted: 0,
  usersDeleted: 0,
}

async function createActor(browser: Browser, label: string, runId: string): Promise<ThreeClientActor> {
  const user = await createE2eUser(label, runId)
  const context = await browser.newContext()
  const page = await context.newPage()
  const consoleFailures = installConsoleGuards(page)
  await signInThroughUi(page, user)
  return {
    consoleFailures,
    context,
    page,
    user,
  }
}

export async function createThreeClientSession(browser: Browser): Promise<ThreeClientSession> {
  const runId = createRunId()
  const host = await createActor(browser, 'host', runId)
  const rival = await createActor(browser, 'rival', runId)
  const third = await createActor(browser, 'third', runId)

  let cleaned = false
  async function cleanup(): Promise<CleanupSummary> {
    if (cleaned) {
      return EMPTY_CLEANUP_SUMMARY
    }
    cleaned = true
    await Promise.allSettled([
      expectNoConsoleFailures(host.consoleFailures),
      expectNoConsoleFailures(rival.consoleFailures),
      expectNoConsoleFailures(third.consoleFailures),
    ])
    await Promise.allSettled([
      host.context.close(),
      rival.context.close(),
      third.context.close(),
    ])
    return cleanupE2eRun([host.user, rival.user, third.user])
  }

  return {
    cleanup,
    host,
    rival,
    runId,
    third,
  }
}

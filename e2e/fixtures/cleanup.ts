import { deleteE2eUser, type E2eUser } from './testUsers'
import {
  deleteOrphanedQueuedRankedQueueRows,
  deleteMultiplayerRowsForUsers,
  deletePrivateMatchRequestsForUsers,
  deleteRankedQueueRowsForUsers,
  deleteRankedRatingRowsForUsers,
  fetchStaleE2eUsers,
} from './supabaseAdmin'

export interface CleanupSummary {
  readonly multiplayerRowsDeleted: number
  readonly privateMatchRequestsDeleted: number
  readonly rankedQueueRowsDeleted: number
  readonly rankedRatingRowsDeleted: number
  readonly usersDeleted: number
}

export interface StaleCleanupSummary extends CleanupSummary {
  readonly orphanedRankedQueueRowsDeleted: number
}

const STALE_E2E_USER_AGE_MS = 5 * 60 * 1000

let staleCleanupPromise: Promise<StaleCleanupSummary> | undefined

export async function cleanupE2eRun(users: readonly E2eUser[]): Promise<CleanupSummary> {
  const userIds = users.map((user) => user.id)
  const privateMatchRequestsDeleted = await deletePrivateMatchRequestsForUsers(userIds)
  const rankedQueueRowsDeleted = await deleteRankedQueueRowsForUsers(userIds)
  const rankedRatingRowsDeleted = await deleteRankedRatingRowsForUsers(userIds)
  const multiplayerRowsDeleted = await deleteMultiplayerRowsForUsers(userIds)
  let usersDeleted = 0
  for (const user of users) {
    await deleteE2eUser(user)
    usersDeleted += 1
  }
  return {
    multiplayerRowsDeleted,
    privateMatchRequestsDeleted,
    rankedQueueRowsDeleted,
    rankedRatingRowsDeleted,
    usersDeleted,
  }
}

export async function cleanupStaleE2eArtifactsOnce(): Promise<StaleCleanupSummary> {
  staleCleanupPromise ??= cleanupStaleE2eArtifacts()
  return staleCleanupPromise
}

async function cleanupStaleE2eArtifacts(): Promise<StaleCleanupSummary> {
  const staleUsers = await fetchStaleE2eUsers({ olderThanMs: STALE_E2E_USER_AGE_MS })
  const cleanupSummary = await cleanupE2eRun(staleUsers)
  const orphanedRankedQueueRowsDeleted = await deleteOrphanedQueuedRankedQueueRows()

  return {
    ...cleanupSummary,
    orphanedRankedQueueRowsDeleted,
  }
}

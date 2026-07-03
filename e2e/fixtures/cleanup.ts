import { deleteE2eUser, type E2eUser } from './testUsers'
import {
  deleteMultiplayerRowsForUsers,
  deletePrivateMatchRequestsForUsers,
  deleteRankedQueueRowsForUsers,
  deleteRankedRatingRowsForUsers,
} from './supabaseAdmin'

export interface CleanupSummary {
  readonly multiplayerRowsDeleted: number
  readonly privateMatchRequestsDeleted: number
  readonly rankedQueueRowsDeleted: number
  readonly rankedRatingRowsDeleted: number
  readonly usersDeleted: number
}

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

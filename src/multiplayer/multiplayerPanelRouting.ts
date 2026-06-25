import type { MultiplayerProfileSummary } from './dailyMultiplayer'
import {
  getViewerMultiplayerPlayerId,
  type MultiplayerGame,
  type MultiplayerPlayerId,
} from './multiplayer'

type RankedQueueAutoRefreshStatus = 'cancelled' | 'error' | 'idle' | 'matched' | 'queued'

export function shouldAutoRefreshRankedQueue({
  hasRankedQueueActions,
  readOnly,
  requestId,
  status,
}: {
  readonly hasRankedQueueActions: boolean
  readonly readOnly: boolean
  readonly requestId?: string
  readonly status: RankedQueueAutoRefreshStatus
}): boolean {
  return status === 'queued' && Boolean(requestId) && hasRankedQueueActions && !readOnly
}

export function getCreatorJoinedGameAutoRouteId({
  currentGames,
  previousGames,
  selectedGame,
  viewerUserId,
}: {
  readonly currentGames: readonly MultiplayerGame[]
  readonly previousGames: readonly MultiplayerGame[]
  readonly selectedGame: MultiplayerGame | undefined
  readonly viewerUserId: string | undefined
}): string | undefined {
  if (!viewerUserId) {
    return undefined
  }
  const previousById = new Map(previousGames.map((game) => [game.id, game]))
  const newlyJoinedCreatorGames = currentGames
    .filter((game) => {
      if (
        game.status !== 'playing'
        || game.playerUserIds?.['player-one'] !== viewerUserId
        || !game.playerUserIds?.['player-two']
      ) {
        return false
      }
      const previous = previousById.get(game.id)
      return Boolean(
        previous
          && previous.status === 'waiting'
          && !previous.playerUserIds?.['player-two'],
      )
    })
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))

  const candidate = newlyJoinedCreatorGames[0]
  if (!candidate) {
    return undefined
  }
  const selectedIsDifferentActiveGame = Boolean(
    selectedGame
      && selectedGame.id !== candidate.id
      && selectedGame.status === 'playing'
      && getViewerMultiplayerPlayerId(selectedGame, viewerUserId),
  )
  return selectedIsDifferentActiveGame ? undefined : candidate.id
}

export function mergeFinalizedRankedGameIntoLocalState(
  currentGames: readonly MultiplayerGame[],
  finalizedGame: MultiplayerGame,
): readonly MultiplayerGame[] {
  const existing = currentGames.find((game) => game.id === finalizedGame.id)
  const nextGame = existing ?? finalizedGame
  return [
    nextGame,
    ...currentGames.filter((game) => game.id !== finalizedGame.id),
  ]
}

export function getMultiplayerPlayerDisplayLabel(
  game: MultiplayerGame,
  playerId: MultiplayerPlayerId,
  viewerPlayerId: MultiplayerPlayerId | undefined,
  profiles: Partial<Record<MultiplayerPlayerId, MultiplayerProfileSummary>> | undefined = game.playerProfiles,
  fallback = 'Rival',
): string {
  if (playerId === viewerPlayerId) {
    return 'You'
  }
  const profileLabel = profiles?.[playerId]?.label ?? profiles?.[playerId]?.displayName
  if (profileLabel?.trim()) {
    return profileLabel
  }
  const storedLabel = game.players.find((player) => player.id === playerId)?.label
  const normalizedStoredLabel = storedLabel?.trim()
  if (normalizedStoredLabel && !['you', 'rival'].includes(normalizedStoredLabel.toLocaleLowerCase('en-US'))) {
    return normalizedStoredLabel
  }
  return fallback
}

import type { GameMode, PlayScope } from '../game/types'
import {
  canViewerCancelMultiplayerGame,
  canViewerJoinMultiplayerGame,
  getActiveMultiplayerGames,
  getViewerMultiplayerPlayerId,
  hasDailyMultiplayerParticipation,
  normalizeMultiplayerState,
  type MultiplayerGame,
  type MultiplayerGameStatus,
  type MultiplayerState,
} from './multiplayer'
import { normalizeCompetitiveMultiplayerState, type MultiplayerCompetitiveState } from './competitiveMultiplayer'
import type { MultiplayerMatchPerformance, MultiplayerPlayerPerformance } from './scoring'

export interface MultiplayerActiveGameViewModel {
  readonly id: string
  readonly mode: GameMode
  readonly modeLabel: string
  readonly scope: PlayScope
  readonly scopeLabel: string
  readonly title: string
  readonly status: MultiplayerGameStatus
  readonly statusLabel: string
  readonly detailLabel: string
  readonly turnLabel: string
  readonly opponentLabel: string
  readonly ruleLabel: string
  readonly updatedAt: string
  readonly actionLabel: string
  readonly isViewerParticipant: boolean
  readonly canResume: boolean
}

export interface MultiplayerLobbyRowViewModel {
  readonly id: string
  readonly mode: GameMode
  readonly modeLabel: string
  readonly scope: PlayScope
  readonly scopeLabel: string
  readonly title: string
  readonly hostLabel: string
  readonly detailLabel: string
  readonly statusLabel: string
  readonly actionLabel: string
  readonly updatedAt: string
  readonly canJoin: boolean
  readonly canCancel: boolean
  readonly claimBlocked: boolean
  readonly hardModeLabel?: string
  readonly timeLimitLabel: string
}

export interface MultiplayerRecentResultViewModel {
  readonly id: string
  readonly mode: GameMode
  readonly modeLabel: string
  readonly scope: PlayScope
  readonly scopeLabel: string
  readonly title: string
  readonly completedAt: string
  readonly summaryLabel: string
  readonly outcomeLabel: string
  readonly detailLabel: string
}

export interface MultiplayerLiveGameViewModel {
  readonly id: string
  readonly mode: GameMode
  readonly modeLabel: string
  readonly scope: PlayScope
  readonly scopeLabel: string
  readonly title: string
  readonly detailLabel: string
  readonly turnLabel: string
  readonly opponentLabel: string
  readonly ruleLabel: string
  readonly updatedAt: string
  readonly actionLabel: string
}

export function getMultiplayerModeLabel(mode: GameMode): string {
  return mode.toUpperCase()
}

export function getMultiplayerScopeLabel(scope: PlayScope): string {
  return scope === 'daily' ? 'Daily Multiplayer' : 'Practice Multiplayer'
}

function getGameTitle(game: Pick<MultiplayerGame, 'dailyDateKey' | 'mode' | 'scope' | 'wordLength'>): string {
  return `${getMultiplayerScopeLabel(game.scope)} ${getMultiplayerModeLabel(game.mode)}${game.scope === 'daily' && game.dailyDateKey ? ` · ${game.dailyDateKey}` : ''}`
}

function getStatusLabel(status: MultiplayerGameStatus): string {
  switch (status) {
    case 'waiting':
      return 'Waiting'
    case 'playing':
      return 'In progress'
    case 'won':
      return 'Won'
    case 'lost':
      return 'Lost'
    case 'expired':
      return 'Expired'
    case 'cancelled':
      return 'Cancelled'
  }
}

function getTimeLimitLabel(game: Pick<MultiplayerGame, 'scope' | 'timeLimitMs'>): string {
  if (game.scope === 'daily') {
    return 'No clock'
  }
  if (!game.timeLimitMs) {
    return 'No time limit'
  }
  const minutes = game.timeLimitMs / 60_000
  if (minutes < 1) {
    return `${Math.round(game.timeLimitMs / 1000)} seconds per side`
  }
  if (minutes >= 60 && minutes % 60 === 0) {
    const hours = minutes / 60
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} per side`
  }
  return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} per side`
}

function getGameRuleLabel(game: MultiplayerGame): string {
  if (game.scope === 'daily') {
    return `UTC daily · ${game.wordLength} letters · no clock`
  }

  return [
    `${game.wordLength} letters`,
    getTimeLimitLabel(game),
    game.hardMode ? 'Hard Mode' : undefined,
  ].filter(Boolean).join(' · ')
}

function getOpponentLabel(game: MultiplayerGame, viewerUserId: string | undefined): string {
  const viewerPlayerId = getViewerMultiplayerPlayerId(game, viewerUserId)
  if (!viewerPlayerId) {
    return game.status === 'waiting' ? 'Open lobby' : 'Participant match'
  }
  const opponentId = viewerPlayerId === 'player-one' ? 'player-two' : 'player-one'
  return game.playerUserIds?.[opponentId]
    ? game.players.find((player) => player.id === opponentId)?.label ?? 'Rival'
    : 'Waiting for rival'
}

function getTurnLabel(game: MultiplayerGame, viewerUserId: string | undefined): string {
  if (game.status === 'waiting') {
    return 'Waiting for rival'
  }
  if (game.status !== 'playing') {
    return getStatusLabel(game.status)
  }
  const viewerPlayerId = getViewerMultiplayerPlayerId(game, viewerUserId)
  if (!viewerPlayerId) {
    return `${game.players.find((player) => player.id === game.currentTurn)?.label ?? game.currentTurn}'s turn`
  }
  return game.currentTurn === viewerPlayerId ? 'Your turn' : 'Rival turn'
}

function getActiveDetailLabel(game: MultiplayerGame, viewerUserId: string | undefined): string {
  const moves = `${game.moves.length} ${game.moves.length === 1 ? 'turn' : 'turns'} submitted`
  return `${getTurnLabel(game, viewerUserId)} · ${moves}`
}

function toActiveGameViewModel(game: MultiplayerGame, viewerUserId: string | undefined): MultiplayerActiveGameViewModel {
  const viewerPlayerId = getViewerMultiplayerPlayerId(game, viewerUserId)
  const isViewerParticipant = Boolean(viewerPlayerId)
  return {
    actionLabel: isViewerParticipant || !viewerUserId ? 'Resume' : 'Open',
    canResume: isViewerParticipant || !viewerUserId,
    detailLabel: getActiveDetailLabel(game, viewerUserId),
    id: game.id,
    isViewerParticipant,
    mode: game.mode,
    modeLabel: getMultiplayerModeLabel(game.mode),
    opponentLabel: getOpponentLabel(game, viewerUserId),
    ruleLabel: getGameRuleLabel(game),
    scope: game.scope,
    scopeLabel: getMultiplayerScopeLabel(game.scope),
    status: game.status,
    statusLabel: getStatusLabel(game.status),
    title: getGameTitle(game),
    turnLabel: getTurnLabel(game, viewerUserId),
    updatedAt: game.updatedAt,
  }
}

export function selectActiveMultiplayerGameRows(
  state: MultiplayerState | undefined,
  viewerUserId?: string,
): readonly MultiplayerActiveGameViewModel[] {
  return [...getActiveMultiplayerGames(normalizeMultiplayerState(state), viewerUserId)]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map((game) => toActiveGameViewModel(game, viewerUserId))
}

function toLiveGameViewModel(game: MultiplayerGame, viewerUserId: string): MultiplayerLiveGameViewModel {
  const active = toActiveGameViewModel(game, viewerUserId)
  return {
    actionLabel: 'Resume live game',
    detailLabel: active.detailLabel,
    id: active.id,
    mode: active.mode,
    modeLabel: active.modeLabel,
    opponentLabel: active.opponentLabel,
    ruleLabel: active.ruleLabel,
    scope: active.scope,
    scopeLabel: active.scopeLabel,
    title: active.title,
    turnLabel: active.turnLabel,
    updatedAt: active.updatedAt,
  }
}

export function selectLiveMultiplayerRows(
  state: MultiplayerState | undefined,
  viewerUserId?: string,
): readonly MultiplayerLiveGameViewModel[] {
  if (!viewerUserId) {
    return []
  }

  return normalizeMultiplayerState(state).games
    .filter((game) => game.status === 'playing')
    .filter((game) => Boolean(getViewerMultiplayerPlayerId(game, viewerUserId)))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map((game) => toLiveGameViewModel(game, viewerUserId))
}

export function selectRestrictedLiveMultiplayerCount(
  state: MultiplayerState | undefined,
  viewerUserId?: string,
): number {
  if (!viewerUserId) {
    return 0
  }

  return normalizeMultiplayerState(state).games
    .filter((game) => game.status === 'playing')
    .filter((game) => !getViewerMultiplayerPlayerId(game, viewerUserId))
    .length
}

function getLobbyActionLabel(input: {
  readonly canCancel: boolean
  readonly canJoin: boolean
  readonly claimBlocked: boolean
  readonly viewerUserId?: string
}): string {
  if (input.claimBlocked) {
    return 'Daily already claimed'
  }
  if (input.canJoin) {
    return 'Open to join'
  }
  if (input.canCancel) {
    return 'Manage lobby'
  }
  if (!input.viewerUserId) {
    return 'Sign in to join'
  }
  return 'Waiting'
}

function toLobbyRowViewModel(
  game: MultiplayerGame,
  state: MultiplayerState,
  viewerUserId: string | undefined,
): MultiplayerLobbyRowViewModel {
  const canCancel = canViewerCancelMultiplayerGame(game, viewerUserId)
  const viewerPlayerId = getViewerMultiplayerPlayerId(game, viewerUserId)
  const claimBlocked = !viewerPlayerId && game.scope === 'daily' && hasDailyMultiplayerParticipation(state, game.dailyDateKey, game.mode, viewerUserId)
  const canJoin = canViewerJoinMultiplayerGame(game, viewerUserId) && !claimBlocked

  return {
    actionLabel: getLobbyActionLabel({ canCancel, canJoin, claimBlocked, viewerUserId }),
    canCancel,
    canJoin,
    claimBlocked,
    detailLabel: getGameRuleLabel(game),
    hardModeLabel: game.scope === 'practice' ? (game.hardMode ? 'Hard Mode on' : 'Hard Mode off') : undefined,
    hostLabel: game.players.find((player) => player.id === 'player-one')?.label ?? 'Host',
    id: game.id,
    mode: game.mode,
    modeLabel: getMultiplayerModeLabel(game.mode),
    scope: game.scope,
    scopeLabel: getMultiplayerScopeLabel(game.scope),
    statusLabel: getStatusLabel(game.status),
    timeLimitLabel: getTimeLimitLabel(game),
    title: getGameTitle(game),
    updatedAt: game.updatedAt,
  }
}

export function selectMultiplayerLobbyRows(
  state: MultiplayerState | undefined,
  input: {
    readonly dailyDateKey?: string
    readonly viewerUserId?: string
  } = {},
): readonly MultiplayerLobbyRowViewModel[] {
  const normalized = normalizeMultiplayerState(state)
  return normalized.games
    .filter((game) => game.status === 'waiting')
    .filter((game) => game.scope === 'practice' || !input.dailyDateKey || game.dailyDateKey === input.dailyDateKey)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map((game) => toLobbyRowViewModel(game, normalized, input.viewerUserId))
}

function getViewerOutcomeLabel(result: MultiplayerMatchPerformance, viewerUserId: string | undefined): string {
  if (!viewerUserId) {
    return result.status === 'expired' ? 'Expired' : result.summary
  }
  const viewer = result.players.find((player) => player.userId === viewerUserId)
  if (!viewer) {
    return result.status === 'expired' ? 'Expired' : 'Completed'
  }
  if (viewer.outcome === 'win') {
    return 'Won'
  }
  if (viewer.outcome === 'loss') {
    return 'Lost'
  }
  return 'Draw'
}

function getResultDetailLabel(result: MultiplayerMatchPerformance, viewerUserId: string | undefined): string {
  const viewer: MultiplayerPlayerPerformance | undefined = viewerUserId
    ? result.players.find((player) => player.userId === viewerUserId)
    : undefined
  return viewer?.summary ?? `${result.players.length} players · ${result.ranked ? 'Ranked' : 'Unranked'}`
}

function toRecentResultViewModel(
  result: MultiplayerMatchPerformance,
  viewerUserId: string | undefined,
): MultiplayerRecentResultViewModel {
  const scopeLabel = getMultiplayerScopeLabel(result.scope)
  const modeLabel = getMultiplayerModeLabel(result.mode)
  const outcomeLabel = getViewerOutcomeLabel(result, viewerUserId)
  return {
    completedAt: result.endedAt ?? '',
    detailLabel: getResultDetailLabel(result, viewerUserId),
    id: result.sourceMatchId,
    mode: result.mode,
    modeLabel,
    outcomeLabel,
    scope: result.scope,
    scopeLabel,
    summaryLabel: result.summary,
    title: `${scopeLabel} ${modeLabel} · ${outcomeLabel}`,
  }
}

export function selectRecentMultiplayerResults(
  competitiveState: MultiplayerCompetitiveState | undefined,
  viewerUserId?: string,
  limit = 5,
): readonly MultiplayerRecentResultViewModel[] {
  return [...normalizeCompetitiveMultiplayerState(competitiveState).results]
    .sort((left, right) => (right.endedAt ?? '').localeCompare(left.endedAt ?? ''))
    .slice(0, Math.max(0, limit))
    .map((result) => toRecentResultViewModel(result, viewerUserId))
}

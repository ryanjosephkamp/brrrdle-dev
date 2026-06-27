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
import type {
  AuthenticatedLiveSpectatorGame,
  AuthenticatedLiveSpectatorMove,
  AuthenticatedLiveSpectatorPlayer,
} from './multiplayerRepository'
import { getMultiplayerPlayerDisplayLabel } from './multiplayerPanelRouting'
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
  readonly canResume: boolean
  readonly canSpectate: boolean
  readonly id: string
  readonly mode: GameMode
  readonly modeLabel: string
  readonly scope: PlayScope
  readonly scopeLabel: string
  readonly title: string
  readonly detailLabel: string
  readonly turnLabel: string
  readonly opponentLabel: string
  readonly rankingLabel: 'Ranked' | 'Unranked'
  readonly ruleLabel: string
  readonly updatedAt: string
  readonly actionLabel: string
  readonly spectatorDetails?: MultiplayerLiveSpectatorDetailsViewModel
  readonly viewerRole: 'participant' | 'spectator'
}

export interface MultiplayerLiveSpectatorMoveViewModel {
  readonly createdAt?: string
  readonly guess: string
  readonly playerLabel: string
  readonly puzzleLabel: string
  readonly tiles: AuthenticatedLiveSpectatorMove['tiles']
}

export interface MultiplayerLiveSpectatorDetailsViewModel {
  readonly capabilityLabel: string
  readonly moves: readonly MultiplayerLiveSpectatorMoveViewModel[]
  readonly outcomeLabel?: string
  readonly players: readonly AuthenticatedLiveSpectatorPlayer[]
  readonly progressLabel: string
  readonly terminal: boolean
  readonly terminalHoldUntil?: string
  readonly terminalLabel?: string
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

function getTimeLimitLabel(game: { readonly scope: PlayScope; readonly timeLimitMs?: number | null }): string {
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

function getGameRuleLabel(game: {
  readonly hardMode?: boolean
  readonly scope: PlayScope
  readonly timeLimitMs?: number | null
  readonly wordLength: number
}): string {
  if (game.scope === 'daily') {
    return `UTC daily · ${game.wordLength} letters · no clock`
  }

  return [
    `${game.wordLength} letters`,
    getTimeLimitLabel(game),
    game.hardMode ? 'Hard Mode' : undefined,
  ].filter(Boolean).join(' · ')
}

function getRankingLabel(game: { readonly ranked?: boolean }): 'Ranked' | 'Unranked' {
  return game.ranked === true ? 'Ranked' : 'Unranked'
}

function getOpponentLabel(game: MultiplayerGame, viewerUserId: string | undefined): string {
  const viewerPlayerId = getViewerMultiplayerPlayerId(game, viewerUserId)
  if (!viewerPlayerId) {
    return game.status === 'waiting' ? 'Open lobby' : 'Participant match'
  }
  const opponentId = viewerPlayerId === 'player-one' ? 'player-two' : 'player-one'
  return game.playerUserIds?.[opponentId]
    ? getMultiplayerPlayerDisplayLabel(game, opponentId, viewerPlayerId)
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
    canResume: true,
    canSpectate: false,
    detailLabel: active.detailLabel,
    id: active.id,
    mode: active.mode,
    modeLabel: active.modeLabel,
    opponentLabel: active.opponentLabel,
    rankingLabel: getRankingLabel(game),
    ruleLabel: active.ruleLabel,
    scope: active.scope,
    scopeLabel: active.scopeLabel,
    title: active.title,
    turnLabel: active.turnLabel,
    updatedAt: active.updatedAt,
    viewerRole: 'participant',
  }
}

function getSpectatorTurnLabel(row: AuthenticatedLiveSpectatorGame): string {
  if (row.status !== 'playing') {
    return row.outcome.label
  }
  const activePlayer = row.players.find((player) => player.seat === row.currentTurnSeat)
  return activePlayer ? `${getSpectatorPlayerDisplayLabel(activePlayer)}'s turn` : 'Turn in progress'
}

function getSpectatorOpponentLabel(row: AuthenticatedLiveSpectatorGame): string {
  return row.players.map(getSpectatorPlayerDisplayLabel).join(' vs ')
}

function getSpectatorPlayerDisplayLabel(player: AuthenticatedLiveSpectatorPlayer): string {
  const profileName = player.profile?.displayName?.trim()
  if (profileName) {
    return profileName
  }
  const storedLabel = player.label.trim()
  if (storedLabel && storedLabel.toLocaleLowerCase('en-US') !== 'you') {
    return storedLabel
  }
  return player.seat === 'player-one' ? 'Player one' : 'Player two'
}

function getSpectatorProgressLabel(row: AuthenticatedLiveSpectatorGame): string {
  const moveLabel = `${row.progress.moveCount} ${row.progress.moveCount === 1 ? 'turn' : 'turns'} submitted`
  const puzzleLabel = row.mode === 'go' ? ` · puzzle ${row.progress.currentPuzzleIndex + 1} of ${row.goPuzzleCount ?? 5}` : ''
  const progressLabel = `${moveLabel}${puzzleLabel}`
  return row.status === 'playing' ? progressLabel : `Final · ${progressLabel}`
}

function getSpectatorTerminalLabel(row: AuthenticatedLiveSpectatorGame): string | undefined {
  if (row.status === 'playing') {
    return undefined
  }
  return `${row.outcome.label}. Final board visible briefly.`
}

function toSpectatorMoveViewModel(
  move: AuthenticatedLiveSpectatorMove,
  players: readonly AuthenticatedLiveSpectatorPlayer[],
): MultiplayerLiveSpectatorMoveViewModel {
  const player = players.find((entry) => entry.seat === move.seat)
  return {
    createdAt: move.createdAt,
    guess: move.guess,
    playerLabel: player ? getSpectatorPlayerDisplayLabel(player) : move.seat === 'player-one' ? 'Player one' : 'Player two',
    puzzleLabel: `Puzzle ${move.puzzleIndex + 1}`,
    tiles: move.tiles,
  }
}

function toSpectatorLiveGameViewModel(row: AuthenticatedLiveSpectatorGame): MultiplayerLiveGameViewModel {
  const terminalLabel = getSpectatorTerminalLabel(row)
  const progressLabel = getSpectatorProgressLabel(row)
  const detailLabel = terminalLabel ? `Read-only · ${row.outcome.label} · ${progressLabel}` : `Read-only · ${progressLabel}`
  return {
    actionLabel: 'Spectate live game',
    canResume: false,
    canSpectate: true,
    detailLabel,
    id: row.id,
    mode: row.mode,
    modeLabel: getMultiplayerModeLabel(row.mode),
    opponentLabel: getSpectatorOpponentLabel(row),
    rankingLabel: getRankingLabel(row),
    ruleLabel: getGameRuleLabel(row),
    scope: row.scope,
    scopeLabel: getMultiplayerScopeLabel(row.scope),
    spectatorDetails: {
      capabilityLabel: 'Read-only spectator view. Guessing, joining, forfeiting, cancelling, timers, ratings, and claims are unavailable.',
      moves: row.moves.map((move) => toSpectatorMoveViewModel(move, row.players)),
      outcomeLabel: row.outcome.label,
      players: row.players,
      progressLabel,
      terminal: row.status !== 'playing',
      terminalHoldUntil: row.terminalHoldUntil,
      terminalLabel,
    },
    title: getGameTitle(row),
    turnLabel: getSpectatorTurnLabel(row),
    updatedAt: row.terminalAt ?? row.updatedAt,
    viewerRole: 'spectator',
  }
}

export function selectLiveMultiplayerRows(
  state: MultiplayerState | undefined,
  viewerUserId?: string,
  spectatorRows: readonly AuthenticatedLiveSpectatorGame[] = [],
): readonly MultiplayerLiveGameViewModel[] {
  if (!viewerUserId) {
    return []
  }

  const participantRows = normalizeMultiplayerState(state).games
    .filter((game) => game.status === 'playing')
    .filter((game) => Boolean(getViewerMultiplayerPlayerId(game, viewerUserId)))
    .map((game) => toLiveGameViewModel(game, viewerUserId))
  const participantIds = new Set(participantRows.map((row) => row.id))
  const readOnlySpectatorRows = spectatorRows
    .filter((row) => !participantIds.has(row.id))
    .map(toSpectatorLiveGameViewModel)

  return [...participantRows, ...readOnlySpectatorRows]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

export function selectRestrictedLiveMultiplayerCount(
  state: MultiplayerState | undefined,
  viewerUserId?: string,
  spectatorRows: readonly AuthenticatedLiveSpectatorGame[] = [],
): number {
  if (!viewerUserId) {
    return 0
  }

  const visibleSpectatorIds = new Set(spectatorRows.map((row) => row.id))
  return normalizeMultiplayerState(state).games
    .filter((game) => game.status === 'playing')
    .filter((game) => !getViewerMultiplayerPlayerId(game, viewerUserId))
    .filter((game) => !visibleSpectatorIds.has(game.id))
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
    return 'Join'
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

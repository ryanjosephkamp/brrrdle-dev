import { useEffect, type ReactNode } from 'react'
import type { MultiplayerWorkspaceAttentionMap } from '../app/attentionViewModels'
import type { MultiplayerSubtabId } from '../app/navigationState'
import { Button, Panel, SubtabBar, type SubtabOption } from '../ui'
import type { MultiplayerState } from './multiplayer'
import type { MultiplayerCompetitiveState } from './competitiveMultiplayer'
import type { AuthenticatedLiveSpectatorGame } from './multiplayerRepository'
import { MultiplayerActiveGames } from './MultiplayerActiveGames'
import { MultiplayerLobby } from './MultiplayerLobby'
import { MultiplayerLive, MultiplayerLiveSpectatorDetails } from './MultiplayerLive'
import {
  selectActiveMultiplayerGameRows,
  selectLiveMultiplayerRows,
  selectMultiplayerLobbyRows,
  selectRecentMultiplayerResults,
  selectRestrictedLiveMultiplayerCount,
  type MultiplayerRecentResultViewModel,
} from './multiplayerViewModels'

const MULTIPLAYER_SUBTABS = [
  { id: 'overview', label: 'Overview', description: 'Multiplayer workspace overview.' },
  { id: 'daily', label: 'Daily Multiplayer', description: 'Daily multiplayer entry.' },
  { id: 'practice', label: 'Practice Multiplayer', description: 'Practice multiplayer entry.' },
  { id: 'active', label: 'Active Games', description: 'Active multiplayer games.' },
  { id: 'lobby', label: 'Lobby', description: 'Joinable multiplayer lobbies.' },
  { id: 'live', label: 'Live', description: 'Participant resume and authenticated read-only Live v1.' },
] as const satisfies readonly SubtabOption<MultiplayerSubtabId>[]

interface MultiplayerWorkspaceProps {
  readonly activeSubtab: MultiplayerSubtabId
  readonly attention?: MultiplayerWorkspaceAttentionMap
  readonly competitiveState?: MultiplayerCompetitiveState
  readonly dailyDateKey: string
  readonly focusedSpectatorGameId?: string
  readonly onOpenHistory: () => void
  readonly onCloseFocusedSpectatorGame?: () => void
  readonly onLiveSurfaceActiveChange?: (active: boolean) => void
  readonly onOpenFocusedSpectatorGame?: (id: string) => void
  readonly onResumeGame: (id: string) => void
  readonly onSelectGame: (id: string) => void
  readonly onSubtabChange: (subtab: MultiplayerSubtabId) => void
  readonly renderDailyPanel: () => ReactNode
  readonly renderPracticePanel: () => ReactNode
  readonly selectedGameId?: string
  readonly state: MultiplayerState | undefined
  readonly liveSpectatorRows?: readonly AuthenticatedLiveSpectatorGame[]
  readonly viewerUserId?: string
}

function formatDateTime(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Unknown time'
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date)
}

function RecentResultsList({
  onOpenHistory,
  recentResults,
}: {
  readonly onOpenHistory: () => void
  readonly recentResults: readonly MultiplayerRecentResultViewModel[]
}) {
  if (recentResults.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-white/15 bg-black/20 p-4 text-sm leading-6 text-slate-400">
        No recent multiplayer results.
      </div>
    )
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[44rem] border-separate border-spacing-y-2 text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.18em] text-slate-400">
          <tr>
            <th className="px-3 py-1">Game</th>
            <th className="px-3 py-1">Outcome</th>
            <th className="px-3 py-1">Summary</th>
            <th className="px-3 py-1">Completed</th>
            <th className="px-3 py-1"><span className="sr-only">Open</span></th>
          </tr>
        </thead>
        <tbody>
          {recentResults.map((result) => (
            <tr className="bg-black/30 text-slate-200" key={result.id}>
              <td className="rounded-l-lg border-y border-l border-white/10 px-3 py-3 font-semibold">{result.scopeLabel} {result.modeLabel}</td>
              <td className="border-y border-white/10 px-3 py-3">{result.outcomeLabel}</td>
              <td className="border-y border-white/10 px-3 py-3">{result.detailLabel}</td>
              <td className="border-y border-white/10 px-3 py-3">{formatDateTime(result.completedAt)}</td>
              <td className="rounded-r-lg border-y border-r border-white/10 px-3 py-3 text-right">
                <Button onClick={onOpenHistory} size="sm" variant="ghost">History</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FocusedSpectatorView({
  game,
  onBack,
}: {
  readonly game?: ReturnType<typeof selectLiveMultiplayerRows>[number]
  readonly onBack?: () => void
}) {
  if (!game || game.viewerRole !== 'spectator' || !game.spectatorDetails) {
    return (
      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Focused spectator view</p>
            <h3 className="mt-2 break-words text-2xl font-bold text-white">Live game no longer visible</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              This authenticated read-only Live view has expired or is no longer eligible for spectator discovery.
            </p>
          </div>
          <Button onClick={onBack} size="sm" variant="secondary">Back to Live list</Button>
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="space-y-5" tone="muted">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Focused spectator view</p>
          <h3 className="break-words text-2xl font-bold text-white">{game.title}</h3>
          <p className="break-words text-sm leading-6 text-slate-300">
            {game.opponentLabel} · {game.turnLabel}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded border border-cyan-200/30 bg-cyan-400/10 px-2 py-1 text-xs font-semibold text-cyan-100">
            Read-only
          </span>
          <Button onClick={onBack} size="sm" variant="secondary">Back to Live list</Button>
        </div>
      </div>

      <dl className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-white/10 bg-black/20 p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Mode</dt>
          <dd className="mt-1 font-semibold text-white">{game.scopeLabel} {game.modeLabel}</dd>
        </div>
        <div className="rounded border border-white/10 bg-black/20 p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Rules</dt>
          <dd className="mt-1 font-semibold text-white">{game.ruleLabel}</dd>
        </div>
        <div className="rounded border border-white/10 bg-black/20 p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Progress</dt>
          <dd className="mt-1 font-semibold text-white">{game.detailLabel}</dd>
        </div>
        <div className="rounded border border-white/10 bg-black/20 p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Updated</dt>
          <dd className="mt-1 font-semibold text-white">{formatDateTime(game.updatedAt)}</dd>
        </div>
      </dl>

      <MultiplayerLiveSpectatorDetails details={game.spectatorDetails} id={`focused-live-spectator-details-${game.id}`} />
    </Panel>
  )
}

function MultiplayerOverview({
  activeGames,
  lobbyRows,
  liveRows,
  onOpenHistory,
  onOpenFocusedSpectatorGame,
  onResumeGame,
  onSelectGame,
  onSubtabChange,
  recentResults,
  restrictedLiveCount,
  selectedGameId,
  viewerUserId,
}: {
  readonly activeGames: ReturnType<typeof selectActiveMultiplayerGameRows>
  readonly lobbyRows: ReturnType<typeof selectMultiplayerLobbyRows>
  readonly liveRows: ReturnType<typeof selectLiveMultiplayerRows>
  readonly onOpenHistory: () => void
  readonly onOpenFocusedSpectatorGame?: (id: string) => void
  readonly onResumeGame: (id: string) => void
  readonly onSelectGame: (id: string) => void
  readonly onSubtabChange: (subtab: MultiplayerSubtabId) => void
  readonly recentResults: readonly MultiplayerRecentResultViewModel[]
  readonly restrictedLiveCount: number
  readonly selectedGameId?: string
  readonly viewerUserId?: string
}) {
  const yourTurnCount = activeGames.filter((game) => game.turnLabel === 'Your turn').length
  const latestLobby = lobbyRows[0]?.updatedAt
  const latestLive = liveRows[0]?.updatedAt

  return (
    <div className="min-w-0 space-y-5">
      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">Active Multiplayer Games</h3>
            <p className="break-words text-sm text-slate-400">
              {activeGames.length} active{yourTurnCount > 0 ? ` · ${yourTurnCount} ${yourTurnCount === 1 ? 'turn' : 'turns'} waiting` : ''}
            </p>
          </div>
          <Button onClick={() => onSubtabChange('active')} size="sm" variant="ghost">View Active</Button>
        </div>
        <MultiplayerActiveGames activeGames={activeGames} limit={4} onResumeGame={onResumeGame} selectedGameId={selectedGameId} />
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">Lobby</h3>
            <p className="break-words text-sm text-slate-400">
              {lobbyRows.length} open{latestLobby ? ` · Freshest ${formatDateTime(latestLobby)}` : ''}
            </p>
          </div>
          <Button onClick={() => onSubtabChange('lobby')} size="sm" variant="ghost">Open Lobby</Button>
        </div>
        <MultiplayerLobby limit={4} onOpenGame={onResumeGame} rows={lobbyRows} />
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">Live v1</h3>
            <p className="break-words text-sm text-slate-400">
              {liveRows.length} visible{restrictedLiveCount > 0 ? ` · ${restrictedLiveCount} restricted` : ''}{latestLive ? ` · Freshest ${formatDateTime(latestLive)}` : ''}
            </p>
          </div>
          <Button onClick={() => onSubtabChange('live')} size="sm" variant="ghost">Open Live</Button>
        </div>
        <MultiplayerLive liveGames={liveRows.slice(0, 4)} onOpenFocusedSpectatorGame={onOpenFocusedSpectatorGame} onResumeGame={onResumeGame} onSelectGame={onSelectGame} restrictedGameCount={restrictedLiveCount} selectedGameId={selectedGameId} viewerUserId={viewerUserId} />
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">Recent Multiplayer Results</h3>
            <p className="text-sm text-slate-400">{recentResults.length} shown</p>
          </div>
          <Button onClick={onOpenHistory} size="sm" variant="ghost">Multiplayer History</Button>
        </div>
        <RecentResultsList onOpenHistory={onOpenHistory} recentResults={recentResults} />
      </Panel>
    </div>
  )
}

export function MultiplayerWorkspace({
  activeSubtab,
  attention,
  competitiveState,
  dailyDateKey,
  focusedSpectatorGameId,
  onCloseFocusedSpectatorGame,
  onLiveSurfaceActiveChange,
  onOpenFocusedSpectatorGame,
  onOpenHistory,
  onResumeGame,
  onSelectGame,
  onSubtabChange,
  renderDailyPanel,
  renderPracticePanel,
  selectedGameId,
  state,
  liveSpectatorRows = [],
  viewerUserId,
}: MultiplayerWorkspaceProps) {
  const activeGames = selectActiveMultiplayerGameRows(state, viewerUserId)
  const lobbyRows = selectMultiplayerLobbyRows(state, { dailyDateKey, viewerUserId })
  const liveRows = selectLiveMultiplayerRows(state, viewerUserId, liveSpectatorRows)
  const restrictedLiveCount = selectRestrictedLiveMultiplayerCount(state, viewerUserId, liveSpectatorRows)
  const recentResults = selectRecentMultiplayerResults(competitiveState, viewerUserId, 5)
  const focusedSpectatorGame = focusedSpectatorGameId
    ? liveRows.find((row) => row.viewerRole === 'spectator' && row.id === focusedSpectatorGameId)
    : undefined
  const liveSurfaceActive = activeSubtab === 'live' || Boolean(focusedSpectatorGameId)
  const subtabs = MULTIPLAYER_SUBTABS.map((subtab) => ({
    ...subtab,
    attention: attention?.[subtab.id],
  }))

  useEffect(() => {
    onLiveSurfaceActiveChange?.(liveSurfaceActive)
    return () => {
      onLiveSurfaceActiveChange?.(false)
    }
  }, [liveSurfaceActive, onLiveSurfaceActiveChange])

  return (
    <section className="min-w-0 space-y-5" aria-labelledby="multiplayer-workspace-title">
      <div className="min-w-0 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Multiplayer</p>
        <h2 id="multiplayer-workspace-title" className="break-words text-3xl font-bold text-white">Multiplayer</h2>
      </div>
      {focusedSpectatorGameId ? (
        <FocusedSpectatorView game={focusedSpectatorGame} onBack={onCloseFocusedSpectatorGame} />
      ) : (
        <SubtabBar activeId={activeSubtab} label="Multiplayer workspace sections" onSelect={onSubtabChange} options={subtabs} />
      )}
      {focusedSpectatorGameId ? null : activeSubtab === 'daily' ? (
        renderDailyPanel()
      ) : activeSubtab === 'practice' ? (
        renderPracticePanel()
      ) : activeSubtab === 'active' ? (
        <Panel className="space-y-4" tone="muted">
          <div>
            <h3 className="text-lg font-bold text-white">Active Multiplayer Games</h3>
            <p className="text-sm text-slate-400">{activeGames.length} active{activeGames.some((game) => game.turnLabel === 'Your turn') ? ' · turn attention' : ''}</p>
          </div>
          <MultiplayerActiveGames activeGames={activeGames} onResumeGame={onResumeGame} selectedGameId={selectedGameId} />
        </Panel>
      ) : activeSubtab === 'lobby' ? (
        <div className="min-w-0 space-y-5">
          <Panel className="space-y-4" tone="muted">
            <div>
              <h3 className="text-lg font-bold text-white">Lobby</h3>
              <p className="text-sm text-slate-400">{lobbyRows.length} open{lobbyRows[0] ? ` · Freshest ${formatDateTime(lobbyRows[0].updatedAt)}` : ''}</p>
            </div>
            <MultiplayerLobby onOpenGame={onResumeGame} rows={lobbyRows} />
          </Panel>
          {renderPracticePanel()}
        </div>
      ) : activeSubtab === 'live' ? (
        <Panel className="space-y-4" tone="muted">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">Live</h3>
            <p className="break-words text-sm text-slate-400">
              Participant resume and authenticated read-only spectator visibility. {liveRows.length} visible{restrictedLiveCount > 0 ? ` · ${restrictedLiveCount} restricted` : ''}{liveRows[0] ? ` · Freshest ${formatDateTime(liveRows[0].updatedAt)}` : ''}
            </p>
          </div>
          <MultiplayerLive liveGames={liveRows} onOpenFocusedSpectatorGame={onOpenFocusedSpectatorGame} onResumeGame={onResumeGame} onSelectGame={onSelectGame} restrictedGameCount={restrictedLiveCount} selectedGameId={selectedGameId} viewerUserId={viewerUserId} />
        </Panel>
      ) : (
        <MultiplayerOverview
          activeGames={activeGames}
          lobbyRows={lobbyRows}
          liveRows={liveRows}
          onOpenHistory={onOpenHistory}
          onOpenFocusedSpectatorGame={onOpenFocusedSpectatorGame}
          onResumeGame={onResumeGame}
          onSelectGame={onSelectGame}
          onSubtabChange={onSubtabChange}
          recentResults={recentResults}
          restrictedLiveCount={restrictedLiveCount}
          selectedGameId={selectedGameId}
          viewerUserId={viewerUserId}
        />
      )}
    </section>
  )
}

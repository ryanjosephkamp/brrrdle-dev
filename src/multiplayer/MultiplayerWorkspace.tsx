import type { ReactNode } from 'react'
import type { MultiplayerSubtabId } from '../app/navigationState'
import { Button, Panel, SubtabBar, type SubtabOption } from '../ui'
import type { MultiplayerState } from './multiplayer'
import type { MultiplayerCompetitiveState } from './competitiveMultiplayer'
import { MultiplayerActiveGames } from './MultiplayerActiveGames'
import { MultiplayerLobby } from './MultiplayerLobby'
import { MultiplayerLive } from './MultiplayerLive'
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
  { id: 'live', label: 'Live', description: 'Participant-safe Live v0.' },
] as const satisfies readonly SubtabOption<MultiplayerSubtabId>[]

interface MultiplayerWorkspaceProps {
  readonly activeSubtab: MultiplayerSubtabId
  readonly competitiveState?: MultiplayerCompetitiveState
  readonly dailyDateKey: string
  readonly onOpenHistory: () => void
  readonly onResumeGame: (id: string) => void
  readonly onSelectGame: (id: string) => void
  readonly onSubtabChange: (subtab: MultiplayerSubtabId) => void
  readonly renderDailyPanel: () => ReactNode
  readonly renderPracticePanel: () => ReactNode
  readonly selectedGameId?: string
  readonly state: MultiplayerState | undefined
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
    <div className="overflow-x-auto">
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

function MultiplayerOverview({
  activeGames,
  lobbyRows,
  onOpenHistory,
  onResumeGame,
  onSelectGame,
  onSubtabChange,
  recentResults,
  selectedGameId,
}: {
  readonly activeGames: ReturnType<typeof selectActiveMultiplayerGameRows>
  readonly lobbyRows: ReturnType<typeof selectMultiplayerLobbyRows>
  readonly onOpenHistory: () => void
  readonly onResumeGame: (id: string) => void
  readonly onSelectGame: (id: string) => void
  readonly onSubtabChange: (subtab: MultiplayerSubtabId) => void
  readonly recentResults: readonly MultiplayerRecentResultViewModel[]
  readonly selectedGameId?: string
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-5">
        <Button onClick={() => onSubtabChange('daily')} variant="primary">Daily Multiplayer</Button>
        <Button onClick={() => onSubtabChange('practice')} variant="secondary">Practice Multiplayer</Button>
        <Button onClick={() => onSubtabChange('lobby')} variant="secondary">Lobby</Button>
        <Button onClick={() => onSubtabChange('active')} variant="secondary">Active Games</Button>
        <Button onClick={() => onSubtabChange('live')} variant="secondary">Live</Button>
      </div>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Active Multiplayer Games</h3>
            <p className="text-sm text-slate-400">{activeGames.length} active</p>
          </div>
          <Button onClick={() => onSubtabChange('active')} size="sm" variant="ghost">View Active</Button>
        </div>
        <MultiplayerActiveGames activeGames={activeGames} limit={4} onResumeGame={onResumeGame} onSelectGame={onSelectGame} selectedGameId={selectedGameId} />
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Lobby</h3>
            <p className="text-sm text-slate-400">{lobbyRows.length} open</p>
          </div>
          <Button onClick={() => onSubtabChange('lobby')} size="sm" variant="ghost">Open Lobby</Button>
        </div>
        <MultiplayerLobby limit={4} onOpenGame={onResumeGame} rows={lobbyRows} />
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
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
  competitiveState,
  dailyDateKey,
  onOpenHistory,
  onResumeGame,
  onSelectGame,
  onSubtabChange,
  renderDailyPanel,
  renderPracticePanel,
  selectedGameId,
  state,
  viewerUserId,
}: MultiplayerWorkspaceProps) {
  const activeGames = selectActiveMultiplayerGameRows(state, viewerUserId)
  const lobbyRows = selectMultiplayerLobbyRows(state, { dailyDateKey, viewerUserId })
  const liveRows = selectLiveMultiplayerRows(state, viewerUserId)
  const restrictedLiveCount = selectRestrictedLiveMultiplayerCount(state, viewerUserId)
  const recentResults = selectRecentMultiplayerResults(competitiveState, viewerUserId, 5)

  return (
    <section className="space-y-5" aria-labelledby="multiplayer-workspace-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Multiplayer</p>
        <h2 id="multiplayer-workspace-title" className="text-3xl font-bold text-white">Multiplayer</h2>
      </div>
      <SubtabBar activeId={activeSubtab} label="Multiplayer workspace sections" onSelect={onSubtabChange} options={MULTIPLAYER_SUBTABS} />
      {activeSubtab === 'daily' ? (
        renderDailyPanel()
      ) : activeSubtab === 'practice' ? (
        renderPracticePanel()
      ) : activeSubtab === 'active' ? (
        <Panel className="space-y-4" tone="muted">
          <div>
            <h3 className="text-lg font-bold text-white">Active Multiplayer Games</h3>
            <p className="text-sm text-slate-400">{activeGames.length} active</p>
          </div>
          <MultiplayerActiveGames activeGames={activeGames} onResumeGame={onResumeGame} onSelectGame={onSelectGame} selectedGameId={selectedGameId} />
        </Panel>
      ) : activeSubtab === 'lobby' ? (
        <div className="space-y-5">
          <Panel className="space-y-4" tone="muted">
            <div>
              <h3 className="text-lg font-bold text-white">Lobby</h3>
              <p className="text-sm text-slate-400">{lobbyRows.length} open</p>
            </div>
            <MultiplayerLobby onOpenGame={onResumeGame} rows={lobbyRows} />
          </Panel>
          {renderPracticePanel()}
        </div>
      ) : activeSubtab === 'live' ? (
        <Panel className="space-y-4" tone="muted">
          <div>
            <h3 className="text-lg font-bold text-white">Live</h3>
            <p className="text-sm text-slate-400">Participant-safe active games only. Spectator expansion remains deferred.</p>
          </div>
          <MultiplayerLive liveGames={liveRows} onResumeGame={onResumeGame} restrictedGameCount={restrictedLiveCount} viewerUserId={viewerUserId} />
        </Panel>
      ) : (
        <MultiplayerOverview
          activeGames={activeGames}
          lobbyRows={lobbyRows}
          onOpenHistory={onOpenHistory}
          onResumeGame={onResumeGame}
          onSelectGame={onSelectGame}
          onSubtabChange={onSubtabChange}
          recentResults={recentResults}
          selectedGameId={selectedGameId}
        />
      )}
    </section>
  )
}

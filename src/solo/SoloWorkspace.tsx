import type { ReactNode } from 'react'
import type { GameHistoryEntry, ResumeSlotCollection } from '../account'
import type { SoloSubtabId } from '../app/navigationState'
import { Button, Panel, SubtabBar, type SubtabOption } from '../ui'
import {
  selectActiveSoloGames,
  selectRecentSoloResults,
  type SoloActiveGameKey,
  type SoloActiveGameViewModel,
  type SoloMode,
  type SoloRecentResultViewModel,
  type SoloScope,
} from './soloViewModels'

const SOLO_SUBTABS = [
  { id: 'overview', label: 'Overview', description: 'Solo workspace overview.' },
  { id: 'daily', label: 'Daily Solo', description: 'Daily solo entry.' },
  { id: 'practice', label: 'Practice Solo', description: 'Practice solo entry.' },
  { id: 'active', label: 'Active Games', description: 'Active solo games.' },
] as const satisfies readonly SubtabOption<SoloSubtabId>[]

interface SoloWorkspaceProps {
  readonly activeSubtab: SoloSubtabId
  readonly dailyMode: SoloMode
  readonly history: readonly GameHistoryEntry[]
  readonly onDailyModeChange: (mode: SoloMode) => void
  readonly onOpenCalendar: () => void
  readonly onOpenHistory: (filters?: { readonly mode?: SoloMode; readonly scope?: SoloScope }) => void
  readonly onPracticeModeChange: (mode: SoloMode) => void
  readonly onResumeGame: (key: SoloActiveGameKey) => void
  readonly onSelectActiveGame: (key: SoloActiveGameKey) => void
  readonly onSubtabChange: (subtab: SoloSubtabId) => void
  readonly practiceMode: SoloMode
  readonly renderDailyGame: (mode: SoloMode) => ReactNode
  readonly renderPracticeGame: (mode: SoloMode) => ReactNode
  readonly resumeSlots: ResumeSlotCollection
  readonly selectedGameKey?: SoloActiveGameKey
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

function ModeSelector({
  activeMode,
  label,
  onSelect,
}: {
  readonly activeMode: SoloMode
  readonly label: string
  readonly onSelect: (mode: SoloMode) => void
}) {
  return (
    <div aria-label={label} className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-slate-950/60 p-2 shadow-inner shadow-white/5" role="group">
      <Button isActive={activeMode === 'og'} onClick={() => onSelect('og')} size="sm" variant="secondary">OG</Button>
      <Button isActive={activeMode === 'go'} onClick={() => onSelect('go')} size="sm" variant="secondary">GO</Button>
    </div>
  )
}

function EmptyState({ children }: { readonly children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-black/20 p-4 text-sm leading-6 text-slate-400">
      {children}
    </div>
  )
}

function ActiveGameCard({
  game,
  onResume,
  onSelect,
  selected,
}: {
  readonly game: SoloActiveGameViewModel
  readonly onResume: (key: SoloActiveGameKey) => void
  readonly onSelect: (key: SoloActiveGameKey) => void
  readonly selected: boolean
}) {
  return (
    <article
      aria-label={game.title}
      className={`rounded-lg border bg-black/30 p-4 shadow-xl shadow-black/20 ${selected ? 'border-[var(--color-ice-300)]/70' : 'border-white/10'}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ice-200)]">{game.scopeLabel}</p>
          <h3 className="mt-1 text-lg font-bold text-white">{game.modeLabel}</h3>
        </div>
        <span className="rounded border border-white/10 px-2 py-1 text-xs font-semibold text-cyan-100">{game.wordLengthLabel}</span>
      </div>
      <dl className="mt-4 space-y-2 text-sm text-slate-300">
        <div>
          <dt className="sr-only">Progress</dt>
          <dd>{game.progressLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Current state</dt>
          <dd>{game.detailLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Updated</dt>
          <dd>Updated {formatDateTime(game.updatedAt)}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => onResume(game.key)} size="sm" variant="primary">{game.actionLabel}</Button>
        <Button aria-pressed={selected} onClick={() => onSelect(game.key)} size="sm" variant="ghost">{selected ? 'Selected' : 'Select'}</Button>
      </div>
    </article>
  )
}

function ActiveGameList({
  activeGames,
  onResumeGame,
  onSelectActiveGame,
  selectedGameKey,
}: {
  readonly activeGames: readonly SoloActiveGameViewModel[]
  readonly onResumeGame: (key: SoloActiveGameKey) => void
  readonly onSelectActiveGame: (key: SoloActiveGameKey) => void
  readonly selectedGameKey?: SoloActiveGameKey
}) {
  if (activeGames.length === 0) {
    return <EmptyState>No active solo games.</EmptyState>
  }

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {activeGames.map((game) => (
        <ActiveGameCard
          game={game}
          key={game.key}
          onResume={onResumeGame}
          onSelect={onSelectActiveGame}
          selected={game.key === selectedGameKey}
        />
      ))}
    </div>
  )
}

function RecentResultsList({
  onOpenHistory,
  recentResults,
}: {
  readonly onOpenHistory: (filters?: { readonly mode?: SoloMode; readonly scope?: SoloScope }) => void
  readonly recentResults: readonly SoloRecentResultViewModel[]
}) {
  if (recentResults.length === 0) {
    return <EmptyState>No recent solo results.</EmptyState>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[42rem] border-separate border-spacing-y-2 text-left text-sm">
        <thead className="text-xs uppercase tracking-[0.18em] text-slate-400">
          <tr>
            <th className="px-3 py-1">Game</th>
            <th className="px-3 py-1">Result</th>
            <th className="px-3 py-1">Word</th>
            <th className="px-3 py-1">Completed</th>
            <th className="px-3 py-1">Rewards</th>
            <th className="px-3 py-1"><span className="sr-only">Open</span></th>
          </tr>
        </thead>
        <tbody>
          {recentResults.map((result) => (
            <tr className="bg-black/30 text-slate-200" key={result.gameId}>
              <td className="rounded-l-lg border-y border-l border-white/10 px-3 py-3 font-semibold">{result.scopeLabel} {result.modeLabel}</td>
              <td className="border-y border-white/10 px-3 py-3">{result.statusLabel} · {result.attemptsLabel}</td>
              <td className="border-y border-white/10 px-3 py-3 font-mono text-cyan-100">{result.wordLabel}</td>
              <td className="border-y border-white/10 px-3 py-3">{formatDateTime(result.completedAt)}</td>
              <td className="border-y border-white/10 px-3 py-3">{result.rewardLabel}</td>
              <td className="rounded-r-lg border-y border-r border-white/10 px-3 py-3 text-right">
                <Button onClick={() => onOpenHistory({ mode: result.mode, scope: result.scope })} size="sm" variant="ghost">History</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SoloOverview({
  activeGames,
  onDailyModeChange,
  onOpenHistory,
  onPracticeModeChange,
  onResumeGame,
  onSelectActiveGame,
  onSubtabChange,
  recentResults,
  selectedGameKey,
}: {
  readonly activeGames: readonly SoloActiveGameViewModel[]
  readonly onDailyModeChange: (mode: SoloMode) => void
  readonly onOpenHistory: (filters?: { readonly mode?: SoloMode; readonly scope?: SoloScope }) => void
  readonly onPracticeModeChange: (mode: SoloMode) => void
  readonly onResumeGame: (key: SoloActiveGameKey) => void
  readonly onSelectActiveGame: (key: SoloActiveGameKey) => void
  readonly onSubtabChange: (subtab: SoloSubtabId) => void
  readonly recentResults: readonly SoloRecentResultViewModel[]
  readonly selectedGameKey?: SoloActiveGameKey
}) {
  const startDaily = (mode: SoloMode) => {
    onDailyModeChange(mode)
    onSubtabChange('daily')
  }
  const startPractice = (mode: SoloMode) => {
    onPracticeModeChange(mode)
    onSubtabChange('practice')
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-4">
        <Button onClick={() => startDaily('og')} variant="primary">Daily OG</Button>
        <Button onClick={() => startDaily('go')} variant="primary">Daily GO</Button>
        <Button onClick={() => startPractice('og')} variant="secondary">Practice OG</Button>
        <Button onClick={() => startPractice('go')} variant="secondary">Practice GO</Button>
      </div>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Active Solo Games</h3>
            <p className="text-sm text-slate-400">{activeGames.length} active</p>
          </div>
          <Button onClick={() => onSubtabChange('active')} size="sm" variant="ghost">View Active</Button>
        </div>
        <ActiveGameList activeGames={activeGames.slice(0, 4)} onResumeGame={onResumeGame} onSelectActiveGame={onSelectActiveGame} selectedGameKey={selectedGameKey} />
      </Panel>

      <Panel className="space-y-4" tone="muted">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Solo Results</h3>
            <p className="text-sm text-slate-400">{recentResults.length} shown</p>
          </div>
          <Button onClick={() => onOpenHistory({})} size="sm" variant="ghost">Solo History</Button>
        </div>
        <RecentResultsList onOpenHistory={onOpenHistory} recentResults={recentResults.slice(0, 5)} />
      </Panel>
    </div>
  )
}

function DailySoloPanel({
  dailyMode,
  onDailyModeChange,
  onOpenCalendar,
  renderDailyGame,
}: {
  readonly dailyMode: SoloMode
  readonly onDailyModeChange: (mode: SoloMode) => void
  readonly onOpenCalendar: () => void
  readonly renderDailyGame: (mode: SoloMode) => ReactNode
}) {
  return (
    <div className="space-y-5">
      <Panel className="flex flex-wrap items-center justify-between gap-3" tone="muted">
        <ModeSelector activeMode={dailyMode} label="Daily Solo mode" onSelect={onDailyModeChange} />
        <Button onClick={onOpenCalendar} variant="ghost">Calendar</Button>
      </Panel>
      {renderDailyGame(dailyMode)}
    </div>
  )
}

function PracticeSoloPanel({
  onPracticeModeChange,
  practiceMode,
  renderPracticeGame,
}: {
  readonly onPracticeModeChange: (mode: SoloMode) => void
  readonly practiceMode: SoloMode
  readonly renderPracticeGame: (mode: SoloMode) => ReactNode
}) {
  return (
    <div className="space-y-5">
      <Panel className="flex flex-wrap items-center justify-between gap-3" tone="muted">
        <ModeSelector activeMode={practiceMode} label="Practice Solo mode" onSelect={onPracticeModeChange} />
      </Panel>
      {renderPracticeGame(practiceMode)}
    </div>
  )
}

export function SoloWorkspace({
  activeSubtab,
  dailyMode,
  history,
  onDailyModeChange,
  onOpenCalendar,
  onOpenHistory,
  onPracticeModeChange,
  onResumeGame,
  onSelectActiveGame,
  onSubtabChange,
  practiceMode,
  renderDailyGame,
  renderPracticeGame,
  resumeSlots,
  selectedGameKey,
}: SoloWorkspaceProps) {
  const activeGames = selectActiveSoloGames(resumeSlots)
  const recentResults = selectRecentSoloResults(history, 5)

  return (
    <section className="space-y-5" aria-labelledby="solo-workspace-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Solo</p>
        <h2 id="solo-workspace-title" className="text-3xl font-bold text-white">Solo</h2>
      </div>
      <SubtabBar activeId={activeSubtab} label="Solo workspace sections" onSelect={onSubtabChange} options={SOLO_SUBTABS} />
      {activeSubtab === 'daily' ? (
        <DailySoloPanel dailyMode={dailyMode} onDailyModeChange={onDailyModeChange} onOpenCalendar={onOpenCalendar} renderDailyGame={renderDailyGame} />
      ) : activeSubtab === 'practice' ? (
        <PracticeSoloPanel onPracticeModeChange={onPracticeModeChange} practiceMode={practiceMode} renderPracticeGame={renderPracticeGame} />
      ) : activeSubtab === 'active' ? (
        <Panel className="space-y-4" tone="muted">
          <div>
            <h3 className="text-lg font-bold text-white">Active Solo Games</h3>
            <p className="text-sm text-slate-400">{activeGames.length} active</p>
          </div>
          <ActiveGameList activeGames={activeGames} onResumeGame={onResumeGame} onSelectActiveGame={onSelectActiveGame} selectedGameKey={selectedGameKey} />
        </Panel>
      ) : (
        <SoloOverview
          activeGames={activeGames}
          onDailyModeChange={onDailyModeChange}
          onOpenHistory={onOpenHistory}
          onPracticeModeChange={onPracticeModeChange}
          onResumeGame={onResumeGame}
          onSelectActiveGame={onSelectActiveGame}
          onSubtabChange={onSubtabChange}
          recentResults={recentResults}
          selectedGameKey={selectedGameKey}
        />
      )}
    </section>
  )
}

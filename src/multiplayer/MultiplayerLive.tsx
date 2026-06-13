import type { ReactNode } from 'react'
import { Button } from '../ui'
import type { MultiplayerLiveGameViewModel } from './multiplayerViewModels'

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

function LiveStateNotice({ children }: { readonly children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-black/20 p-4 text-sm leading-6 text-slate-400">
      {children}
    </div>
  )
}

function MultiplayerLiveCard({
  game,
  onResumeGame,
}: {
  readonly game: MultiplayerLiveGameViewModel
  readonly onResumeGame: (id: string) => void
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-black/30 p-4 shadow-xl shadow-black/20" aria-label={game.title}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ice-200)]">{game.scopeLabel}</p>
          <h3 className="mt-1 text-lg font-bold text-white">{game.modeLabel}</h3>
        </div>
        <span className="rounded border border-emerald-200/30 bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-100">
          Live
        </span>
      </div>
      <dl className="mt-4 space-y-2 text-sm text-slate-300">
        <div>
          <dt className="sr-only">Opponent</dt>
          <dd>{game.opponentLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Turn</dt>
          <dd>{game.turnLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Progress</dt>
          <dd>{game.detailLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Rules</dt>
          <dd>{game.ruleLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Updated</dt>
          <dd>Updated {formatDateTime(game.updatedAt)}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <Button onClick={() => onResumeGame(game.id)} size="sm" variant="primary">{game.actionLabel}</Button>
      </div>
    </article>
  )
}

export function MultiplayerLive({
  liveGames,
  onResumeGame,
  restrictedGameCount,
  viewerUserId,
}: {
  readonly liveGames: readonly MultiplayerLiveGameViewModel[]
  readonly onResumeGame: (id: string) => void
  readonly restrictedGameCount: number
  readonly viewerUserId?: string
}) {
  if (!viewerUserId) {
    return (
      <LiveStateNotice>
        <p className="font-semibold text-white">Sign in to view Live games.</p>
        <p className="mt-1">Live v0 only shows active Multiplayer games that belong to your account.</p>
      </LiveStateNotice>
    )
  }

  if (liveGames.length === 0) {
    return (
      <LiveStateNotice>
        <p className="font-semibold text-white">No live games ready to resume.</p>
        <p className="mt-1">Start or join a Multiplayer game, then return here while it is in progress.</p>
        {restrictedGameCount > 0 ? (
          <p className="mt-2 text-cyan-100">
            {restrictedGameCount} active {restrictedGameCount === 1 ? 'game is' : 'games are'} hidden because Live v0 does not expose nonparticipant spectator access.
          </p>
        ) : null}
      </LiveStateNotice>
    )
  }

  return (
    <div className="space-y-4">
      {restrictedGameCount > 0 ? (
        <div className="rounded-lg border border-cyan-200/20 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-50">
          {restrictedGameCount} active {restrictedGameCount === 1 ? 'game is' : 'games are'} restricted to participants. Public spectator presence remains deferred.
        </div>
      ) : null}
      <div className="grid gap-3 lg:grid-cols-2">
        {liveGames.map((game) => (
          <MultiplayerLiveCard game={game} key={game.id} onResumeGame={onResumeGame} />
        ))}
      </div>
    </div>
  )
}

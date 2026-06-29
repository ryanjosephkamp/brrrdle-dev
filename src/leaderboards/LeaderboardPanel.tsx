import { MultiplayerStatsPanel, type MultiplayerCompetitiveState } from '../multiplayer'
import { PublicRankedLeaderboardPanel, type PublicRankedLeaderboardAuthStatus } from './PublicRankedLeaderboardPanel'
import type { PublicRankedLeaderboardRepository } from './publicRankedLeaderboard'

interface LeaderboardPanelProps {
  readonly authStatus?: PublicRankedLeaderboardAuthStatus
  readonly competitiveMultiplayer?: MultiplayerCompetitiveState
  readonly onOpenEloAbout?: () => void
  readonly publicRankedLeaderboardRepository?: PublicRankedLeaderboardRepository
  readonly viewerUserId?: string
}

export function LeaderboardPanel({
  authStatus = 'unconfigured',
  competitiveMultiplayer,
  onOpenEloAbout,
  publicRankedLeaderboardRepository,
  viewerUserId,
}: LeaderboardPanelProps) {
  return (
    <section className="space-y-6" aria-labelledby="leaderboard-title">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">competitive hub</p>
        <h2 id="leaderboard-title" className="text-3xl font-bold text-white">Leaderboard</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          Public ranked Practice leaderboards and competitive multiplayer ratings live here. Local gameplay history stays in Stats.
        </p>
      </div>

      <PublicRankedLeaderboardPanel
        authStatus={authStatus}
        repository={publicRankedLeaderboardRepository}
      />

      <MultiplayerStatsPanel
        onOpenEloAbout={onOpenEloAbout}
        state={competitiveMultiplayer}
        viewerUserId={viewerUserId}
      />
    </section>
  )
}

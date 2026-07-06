import { useMemo } from 'react'
import type { GuestProgressionState } from '../account/storageSchema'
import { createProgressionHudViewModel } from './progressionHudViewModel'

interface ProgressionHudProps {
  readonly progression: GuestProgressionState
}

export function ProgressionHud({ progression }: ProgressionHudProps) {
  const viewModel = useMemo(() => createProgressionHudViewModel(progression), [progression])

  return (
    <aside className="brrrdle-progression-hud" aria-label="Current progression">
      <dl className="brrrdle-progression-hud-summary">
        <div>
          <dt>Level</dt>
          <dd>{viewModel.level}</dd>
        </div>
        <div>
          <dt>Coins</dt>
          <dd>{viewModel.coinBalance}</dd>
        </div>
        <div>
          <dt>{viewModel.xpLabel}</dt>
          <dd>{viewModel.progressPercent}%</dd>
        </div>
      </dl>
      <div
        aria-label={viewModel.xpAriaLabel}
        aria-valuemax={viewModel.xpForLevel}
        aria-valuemin={0}
        aria-valuenow={viewModel.xpIntoLevel}
        className="brrrdle-progression-hud-meter"
        role="progressbar"
      >
        <span style={{ width: `${viewModel.progressPercent}%` }} />
      </div>
      <p>{viewModel.xpSummary} - {viewModel.xpToNextLevelLabel}</p>
      <span className="sr-only">{viewModel.levelLabel}; {viewModel.coinLabel}</span>
    </aside>
  )
}

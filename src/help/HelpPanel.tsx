import type { AppRouteId } from '../app/routes'
import { Button, Panel } from '../ui'

interface HelpPanelProps {
  readonly onNavigate?: (routeId: AppRouteId) => void
}

const quickLinks = [
  { routeId: 'solo', label: 'Solo', description: 'Daily and Practice games.' },
  { routeId: 'multiplayer', label: 'Multiplayer', description: 'Daily, Practice, ranked queue, private requests, and Live.' },
  { routeId: 'stats', label: 'Stats', description: 'Personal stats plus public site totals.' },
  { routeId: 'leaderboard', label: 'Leaderboard', description: 'Public ranked Practice ratings.' },
  { routeId: 'profile', label: 'Profile', description: 'Private account and opt-in public profile controls.' },
  { routeId: 'settings', label: 'Settings', description: 'Preferences, sound, notifications, sync, and account controls.' },
  { routeId: 'about', label: 'About', description: 'Rules context, public-surface boundaries, and Elo explanation.' },
] as const satisfies readonly { readonly routeId: AppRouteId; readonly label: string; readonly description: string }[]

const tutorialSteps = [
  'Choose Solo for a private game or Multiplayer for shared games.',
  'Pick Daily for the current puzzle or Practice for configurable games.',
  'Use Customize before the first submitted guess when a mode allows word length, difficulty, GO chain length, or Hard Mode changes.',
  'Submit guesses from the board keyboard, then use definitions, stats, history, and leaderboards after results are available.',
  'Use Profile for public visibility choices, Settings for preferences, and Feedback when something looks wrong.',
] as const

export function HelpPanel({ onNavigate }: HelpPanelProps) {
  return (
    <section className="space-y-5" aria-labelledby="help-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Help</p>
        <h2 id="help-title" className="text-3xl font-bold text-white">Help and tutorials</h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          A short, read-only route guide for getting oriented without changing settings, claims, queues, or games.
        </p>
      </div>

      <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Quick route guide</h3>
          <p className="text-slate-400">Open the workspace that matches what you are trying to do.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((link) => (
            <div key={link.routeId} className="flex min-w-0 flex-col gap-3 rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-cyan-100">{link.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{link.description}</p>
              </div>
              {onNavigate ? (
                <Button className="self-start" onClick={() => onNavigate(link.routeId)} size="sm" variant="secondary">
                  Open {link.label}
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">A safe first run</h3>
          <p className="text-slate-400">These steps are guidance only. They do not save settings, claim a Daily game, join a queue, or create a match.</p>
        </div>
        <ol className="list-decimal space-y-2 pl-5">
          {tutorialSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Panel>

      <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Need the rule details?</h3>
          <p>
            The About page keeps the deeper OG/GO, Daily/Practice, multiplayer, public profile, spectator, stats, history, and Elo reference material in one place.
          </p>
        </div>
        {onNavigate ? (
          <Button onClick={() => onNavigate('about')} size="sm" variant="secondary">Open About</Button>
        ) : null}
      </Panel>
    </section>
  )
}

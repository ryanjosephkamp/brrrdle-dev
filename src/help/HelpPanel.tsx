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
] as const satisfies readonly { readonly routeId: AppRouteId; readonly label: string; readonly description: string }[]

const modeTopics = [
  {
    title: 'Solo Daily',
    body: 'Daily games are fixed daily puzzles. Solo Daily uses your local daily reset, and completed games feed your history, definitions, and stats.',
  },
  {
    title: 'Solo Practice',
    body: 'Practice games are replayable and configurable. You can choose word length, difficulty, GO chain length, and Hard Mode before your first submitted guess.',
  },
  {
    title: 'OG and GO',
    body: 'OG is one board. GO is a chain of boards where prior solved rows carry forward as visible context while each board keeps its own answer.',
  },
  {
    title: 'Daily versus Practice',
    body: 'Daily is the shared day puzzle with tighter rules. Practice is the flexible space for custom lengths, difficulty, Hard Mode defaults, unranked multiplayer, and ranked Practice.',
  },
] as const

const multiplayerTopics = [
  {
    title: 'Practice Multiplayer',
    body: 'Practice Multiplayer supports OG and GO, active-game resume, lobbies, private Practice requests, and ranked Practice when signed in.',
  },
  {
    title: 'Daily Multiplayer',
    body: 'Daily Multiplayer is asynchronous, five letters, UTC-day keyed, and separate from Solo Daily. Daily spectator access remains excluded.',
  },
  {
    title: 'Ranked Practice',
    body: 'Ranked Practice uses the trusted queue and trusted settlement only. Elo and ranks are display-only explanations after durable ranked Practice evidence is settled.',
  },
  {
    title: 'Private Practice requests',
    body: 'Private requests target active public profiles, stay unranked Practice only, and route accepted games through participant-owned open or resume flows.',
  },
] as const

const publicTopics = [
  {
    title: 'Leaderboards and profiles',
    body: 'Leaderboards show eligible public ranked Practice rows. Public profile links use only approved public profile fields and fall back safely when profiles are private, hidden, suspended, or missing.',
  },
  {
    title: 'Spectating',
    body: 'Public and guest Live spectator surfaces are read-only. They do not expose Daily games, player private fields, queue internals, scoring authority, or gameplay mutation controls.',
  },
  {
    title: 'Definitions, stats, and history',
    body: 'Definitions appear after games, Stats summarizes your play and aggregate public site totals, and History keeps completed Solo and Multiplayer results browsable.',
  },
  {
    title: 'Settings and feedback',
    body: 'Settings controls preferences, themes, sound, notifications, account access, sync, and local progress. Feedback opens the pre-filled report surface.',
  },
] as const

const tutorialSteps = [
  'Choose Solo for a private game or Multiplayer for shared games.',
  'Pick Daily for the current puzzle or Practice for configurable games.',
  'Use Customize before the first submitted guess when a mode allows word length, difficulty, GO chain length, or Hard Mode changes.',
  'Submit guesses from the board keyboard, then use definitions, stats, history, and leaderboards after results are available.',
  'Use Profile for public visibility choices, Settings for preferences, and Feedback when something looks wrong.',
] as const

function TopicGrid({ topics }: { readonly topics: readonly { readonly title: string; readonly body: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {topics.map((topic) => (
        <article key={topic.title} className="rounded-lg border border-white/10 bg-black/25 p-4">
          <h4 className="text-base font-semibold text-cyan-100">{topic.title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{topic.body}</p>
        </article>
      ))}
    </div>
  )
}

export function HelpPanel({ onNavigate }: HelpPanelProps) {
  return (
    <section className="space-y-5" aria-labelledby="help-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">Help</p>
        <h2 id="help-title" className="text-3xl font-bold text-white">Help and tutorials</h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          A read-only guide to the current brrrdle routes, modes, public surfaces, and multiplayer boundaries.
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
        <h3 className="text-xl font-bold text-white">Modes and rules of thumb</h3>
        <TopicGrid topics={modeTopics} />
      </Panel>

      <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Multiplayer, ranked, and requests</h3>
        <TopicGrid topics={multiplayerTopics} />
      </Panel>

      <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Public surfaces and orientation</h3>
        <TopicGrid topics={publicTopics} />
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
    </section>
  )
}

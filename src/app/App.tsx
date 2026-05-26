import { useMemo, useState } from 'react'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH } from '../game/constants'
import { Layout } from '../ui/Layout'
import { Navigation } from '../ui/Navigation'
import { APP_ROUTES, DEFAULT_ROUTE_ID, getRouteById, getRoutesByGroup, type AppRoute } from './routes'

function ModeCard({ route, onSelect }: { readonly route: AppRoute; readonly onSelect: (route: AppRoute) => void }) {
  return (
    <button
      className="group rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
      onClick={() => onSelect(route)}
      type="button"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">{route.scope ?? 'support'}</span>
      <h2 className="mt-3 text-2xl font-bold text-white">{route.label}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{route.description}</p>
      {route.wordLength ? (
        <p className="mt-4 text-sm font-semibold text-cyan-100">{route.wordLength} letters</p>
      ) : null}
    </button>
  )
}

function RoutePanel({
  route,
  onSelectRoute,
}: {
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRoute['id']) => void
}) {
  if (route.id === 'home') {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {getRoutesByGroup('play')
          .filter((playRoute) => playRoute.id !== 'home')
          .map((playRoute) => (
            <ModeCard key={playRoute.id} onSelect={(selectedRoute) => onSelectRoute(selectedRoute.id)} route={playRoute} />
          ))}
      </div>
    )
  }

  return (
    <section className="space-y-4" aria-labelledby="route-title">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">{route.navigationGroup}</p>
      <h2 id="route-title" className="text-3xl font-bold text-white">{route.label}</h2>
      <p className="max-w-3xl text-base leading-7 text-slate-300">{route.description}</p>
      <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-sm leading-6 text-slate-300">
        <p>
          This route is ready for later gameplay, definitions, persistence, account, and admin phases. No unfinished game behavior is exposed in Phase 3.1.
        </p>
      </div>
    </section>
  )
}

function App() {
  const [activeRouteId, setActiveRouteId] = useState(DEFAULT_ROUTE_ID)
  const activeRoute = getRouteById(activeRouteId)
  const navigationRoutes = useMemo(() => APP_ROUTES, [])

  return (
    <Layout
      description="An accessible, mobile-first shell for daily modes, practice, definitions, settings, stats, and future admin controls."
      eyebrow="brrrdle"
      navigation={<Navigation activeRouteId={activeRoute.id} onNavigate={setActiveRouteId} routes={navigationRoutes} />}
      title="Choose your puzzle path."
    >
      <div className="space-y-6">
        <section className="grid gap-4 rounded-2xl border border-cyan-300/20 bg-cyan-950/20 p-5 text-sm leading-6 text-cyan-50 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-cyan-100">Daily launch length</p>
            <p>{DAILY_WORD_LENGTH} letters for og and go</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-100">Practice range</p>
            <p>{MIN_PRACTICE_WORD_LENGTH}–{MAX_PRACTICE_WORD_LENGTH} letters</p>
          </div>
          <div>
            <p className="font-semibold text-cyan-100">Bundled seed lengths</p>
            <p>{BUNDLED_WORD_LIST_LENGTHS.join(', ')}</p>
          </div>
        </section>

        <RoutePanel onSelectRoute={setActiveRouteId} route={activeRoute} />
      </div>
    </Layout>
  )
}

export default App

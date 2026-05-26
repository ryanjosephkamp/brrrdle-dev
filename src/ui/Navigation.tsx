import type { AppRoute, AppRouteId } from '../app/routes'

interface NavigationProps {
  readonly routes: readonly AppRoute[]
  readonly activeRouteId: AppRouteId
  readonly onNavigate: (routeId: AppRouteId) => void
}

export function Navigation({ routes, activeRouteId, onNavigate }: NavigationProps) {
  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
      {routes.map((route) => {
        const isActive = route.id === activeRouteId
        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${
              isActive
                ? 'border-cyan-200 bg-cyan-200 text-slate-950'
                : 'border-slate-700 bg-slate-950/70 text-slate-200 hover:border-cyan-300 hover:text-white'
            }`}
            key={route.id}
            onClick={() => onNavigate(route.id)}
            type="button"
          >
            {route.shortLabel}
          </button>
        )
      })}
    </nav>
  )
}

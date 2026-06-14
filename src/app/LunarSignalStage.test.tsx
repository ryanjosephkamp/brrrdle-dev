import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DEFAULT_SURFACE_THEME } from '../theme'
import { getRouteById, getPrimaryNavigationRoutes } from './routes'
import { LunarSignalStage } from './LunarSignalStage'

describe('LunarSignalStage', () => {
  it('mounts Home route children instead of leaving Home as a dormant selector only', () => {
    const html = renderToStaticMarkup(
      <LunarSignalStage
        accountControls={<button type="button">Guest</button>}
        activeRoute={getRouteById('home')}
        metrics={[]}
        onNavigate={() => undefined}
        routes={getPrimaryNavigationRoutes(false)}
        statusLines={[]}
        surfaceTheme={DEFAULT_SURFACE_THEME}
      >
        <section aria-label="Home dashboard test content">Dashboard child</section>
      </LunarSignalStage>,
    )

    expect(html).toContain('Dashboard child')
    expect(html).not.toContain('Pick a colored tab below')
  })

  it('renders route attention badges as descriptions without changing route button names', () => {
    const html = renderToStaticMarkup(
      <LunarSignalStage
        accountControls={<button type="button">Guest</button>}
        activeRoute={getRouteById('solo')}
        metrics={[]}
        onNavigate={() => undefined}
        routeAttention={{
          multiplayer: {
            ariaLabel: '2 Multiplayer games need your turn',
            label: '2',
            tone: 'urgent',
          },
        }}
        routes={getPrimaryNavigationRoutes(false)}
        statusLines={[]}
        surfaceTheme={DEFAULT_SURFACE_THEME}
      >
        <section aria-label="Solo content">Solo child</section>
      </LunarSignalStage>,
    )

    expect(html).toContain('aria-label="Multiplayer"')
    expect(html).toContain('2 Multiplayer games need your turn')
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('data-tone="urgent"')
  })
})

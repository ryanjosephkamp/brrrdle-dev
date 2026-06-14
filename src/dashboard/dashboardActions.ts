import type { AppRouteId } from '../app/routes'
import type { HistoryFilters, MultiplayerSubtabId, SoloSubtabId } from '../app/navigationState'
import type { SoloActiveGameKey } from '../solo/soloViewModels'
import type { DashboardActionTarget } from './dashboardViewModels'

export interface DashboardActionHandlers {
  readonly onHistoryFiltersChange: (filters: HistoryFilters) => void
  readonly onMultiplayerSubtabChange: (subtab: MultiplayerSubtabId) => void
  readonly onSelectMultiplayerGame: (id: string) => void
  readonly onSelectRoute: (routeId: AppRouteId) => void
  readonly onSelectSoloGame: (key: SoloActiveGameKey) => void
  readonly onSoloSubtabChange: (subtab: SoloSubtabId) => void
}

export function dispatchDashboardAction(
  target: DashboardActionTarget,
  handlers: DashboardActionHandlers,
): void {
  if (target.routeId === 'solo') {
    handlers.onSelectRoute('solo')
    handlers.onSoloSubtabChange(target.soloSubtab)
    if (target.selectedSoloGameKey) {
      handlers.onSelectSoloGame(target.selectedSoloGameKey)
    }
    return
  }

  if (target.routeId === 'multiplayer') {
    handlers.onSelectRoute('multiplayer')
    handlers.onMultiplayerSubtabChange(target.multiplayerSubtab)
    if (target.selectedMultiplayerGameId) {
      handlers.onSelectMultiplayerGame(target.selectedMultiplayerGameId)
    }
    return
  }

  if (target.routeId === 'history') {
    if (target.historyFilters) {
      handlers.onHistoryFiltersChange(target.historyFilters)
    }
    handlers.onSelectRoute('history')
    return
  }

  handlers.onSelectRoute(target.routeId)
}

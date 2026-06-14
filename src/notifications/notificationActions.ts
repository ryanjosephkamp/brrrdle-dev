import {
  dispatchDashboardAction,
  type DashboardActionHandlers,
} from '../dashboard'
import {
  markNotificationDismissed,
  markNotificationRead,
  type NotificationMetadataState,
} from './notificationStorage'
import type { NotificationItemViewModel } from './notificationViewModels'

export type NotificationMetadataUpdater = (
  updater: (current: NotificationMetadataState) => NotificationMetadataState,
) => void

function getTimestamp(now?: () => string): string {
  return now?.() ?? new Date().toISOString()
}

export function markNotificationItemRead(
  item: NotificationItemViewModel,
  updateMetadata: NotificationMetadataUpdater,
  now?: () => string,
): void {
  updateMetadata((current) =>
    markNotificationRead(current, {
      fingerprint: item.fingerprint,
      id: item.id,
      readAt: getTimestamp(now),
    }),
  )
}

export function dismissNotificationItem(
  item: NotificationItemViewModel,
  updateMetadata: NotificationMetadataUpdater,
  now?: () => string,
): void {
  updateMetadata((current) =>
    markNotificationDismissed(current, {
      dismissedAt: getTimestamp(now),
      fingerprint: item.fingerprint,
      id: item.id,
    }),
  )
}

export function activateNotificationItem(
  item: NotificationItemViewModel,
  options: {
    readonly dashboardHandlers: DashboardActionHandlers
    readonly now?: () => string
    readonly updateMetadata: NotificationMetadataUpdater
  },
): void {
  markNotificationItemRead(item, options.updateMetadata, options.now)
  dispatchDashboardAction(item.actionTarget, options.dashboardHandlers)
}

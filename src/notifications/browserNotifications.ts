export type BrowserNotificationPermissionState = 'default' | 'denied' | 'granted' | 'unsupported'

interface BrowserNotificationConstructorLike {
  readonly permission: NotificationPermission
  requestPermission(): Promise<NotificationPermission>
}

interface BrowserNotificationRuntime {
  readonly Notification?: BrowserNotificationConstructorLike
}

function getDefaultRuntime(): BrowserNotificationRuntime {
  return typeof globalThis === 'undefined' ? {} : globalThis as unknown as BrowserNotificationRuntime
}

function normalizePermission(value: unknown): BrowserNotificationPermissionState {
  return value === 'default' || value === 'denied' || value === 'granted'
    ? value
    : 'unsupported'
}

export function getBrowserNotificationPermissionState(
  runtime: BrowserNotificationRuntime = getDefaultRuntime(),
): BrowserNotificationPermissionState {
  if (!runtime.Notification) {
    return 'unsupported'
  }

  return normalizePermission(runtime.Notification.permission)
}

export function getBrowserNotificationStatusLabel(state: BrowserNotificationPermissionState): string {
  switch (state) {
    case 'default':
      return 'Not requested'
    case 'denied':
      return 'Blocked'
    case 'granted':
      return 'Allowed'
    case 'unsupported':
      return 'Unavailable'
    default:
      return 'Unavailable'
  }
}

export function getBrowserNotificationStatusDescription(state: BrowserNotificationPermissionState): string {
  switch (state) {
    case 'default':
      return 'Use the Settings button below to ask this browser for permission. brrrdle never asks automatically.'
    case 'denied':
      return 'This browser has blocked notification permission. Change the browser site setting to allow it again.'
    case 'granted':
      return 'This browser has granted notification permission. Browser notifications stay optional, local, and foreground-only.'
    case 'unsupported':
      return 'This browser session does not expose the Notification API. In-app notifications still work.'
    default:
      return 'Browser notification status could not be determined.'
  }
}

export async function requestBrowserNotificationPermission(
  runtime: BrowserNotificationRuntime = getDefaultRuntime(),
): Promise<BrowserNotificationPermissionState> {
  if (!runtime.Notification) {
    return 'unsupported'
  }

  try {
    const permission = await runtime.Notification.requestPermission()
    return normalizePermission(permission)
  } catch {
    return getBrowserNotificationPermissionState(runtime)
  }
}

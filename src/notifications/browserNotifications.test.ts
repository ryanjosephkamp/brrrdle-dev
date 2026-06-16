import { describe, expect, it } from 'vitest'
import {
  getBrowserNotificationPermissionState,
  getBrowserNotificationStatusDescription,
  getBrowserNotificationStatusLabel,
  requestBrowserNotificationPermission,
} from './browserNotifications'

describe('browser notification helpers', () => {
  it('reports unsupported when the Notification API is unavailable', () => {
    expect(getBrowserNotificationPermissionState({})).toBe('unsupported')
    expect(getBrowserNotificationStatusLabel('unsupported')).toBe('Unavailable')
    expect(getBrowserNotificationStatusDescription('unsupported')).toContain('does not expose')
  })

  it('normalizes supported permission states for Settings copy', () => {
    expect(getBrowserNotificationPermissionState({ Notification: {
      permission: 'granted',
      requestPermission: async () => 'granted',
    } })).toBe('granted')
    expect(getBrowserNotificationStatusLabel('default')).toBe('Not requested')
    expect(getBrowserNotificationStatusLabel('denied')).toBe('Blocked')
    expect(getBrowserNotificationStatusDescription('default')).toContain('brrrdle never asks automatically')
    expect(getBrowserNotificationStatusDescription('granted')).toContain('foreground-only')
  })

  it('requests permission only through an explicit helper call', async () => {
    let calls = 0
    const runtime = {
      Notification: {
        permission: 'default' as NotificationPermission,
        requestPermission: async () => {
          calls += 1
          return 'granted' as NotificationPermission
        },
      },
    }

    expect(calls).toBe(0)
    await expect(requestBrowserNotificationPermission(runtime)).resolves.toBe('granted')
    expect(calls).toBe(1)
  })

  it('falls back to current permission if the permission request fails', async () => {
    const runtime = {
      Notification: {
        permission: 'denied' as NotificationPermission,
        requestPermission: async () => {
          throw new Error('blocked')
        },
      },
    }

    await expect(requestBrowserNotificationPermission(runtime)).resolves.toBe('denied')
  })
})

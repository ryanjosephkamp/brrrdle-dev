import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createSyncStatus } from './syncStatus'
import { createDefaultGuestProgress } from './storageSchema'
import { Settings } from './Settings'
import type { AuthState } from './auth'

const anonymousAuthState: AuthState = {
  status: 'anonymous',
}

describe('Settings', () => {
  it('renders cloud-synced in-app notification controls without browser permission prompts', () => {
    const html = renderToStaticMarkup(
      <Settings
        authState={anonymousAuthState}
        guestProgress={{
          ...createDefaultGuestProgress(),
          settings: {
            ...createDefaultGuestProgress().settings,
            browserNotificationsEnabled: false,
            inAppNotificationMode: 'important-only',
            inAppNotificationsEnabled: true,
            notificationSoundMode: 'important-only',
          },
        }}
        onResetProgress={() => undefined}
        onUpdateSettings={() => undefined}
        syncStatus={createSyncStatus('idle')}
      />,
    )

    expect(html).toContain('Notifications')
    expect(html).toContain('Show in-app notifications')
    expect(html).toContain('In-app notification level')
    expect(html).toContain('Important only')
    expect(html).toContain('Notification sound mode')
    expect(html).toContain('Master sound is currently off')
    expect(html).toContain('Browser notification controls')
    expect(html).toContain('Ask this browser for permission')
    expect(html).toContain('foreground browser notifications after this browser grants permission')
    expect(html).toContain('no service worker, push delivery, or background cross-device delivery is used')
    expect(html).toContain('Preferences sync with guest/cloud progress')
    expect(html).toContain('Read and dismissed item state stays local to this browser')
    expect(html).not.toContain('service worker script')
  })
})

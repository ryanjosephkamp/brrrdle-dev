import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProfilePanel } from './ProfilePanel'
import type { AuthState } from './auth'

function noop() {}

const authState: AuthState = {
  status: 'authenticated',
  user: {
    id: 'u1',
    email: 'ada@example.com',
    roles: [],
    profile: {
      accentColor: 'ice',
      displayName: 'Ada',
      email: 'ada@example.com',
      gradient: 'from-cyan-500 to-sky-700',
      initials: 'A',
      label: 'Ada',
    },
  },
}

describe('ProfilePanel', () => {
  it('renders nothing when closed', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen={false} onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toBe('')
  })

  it('renders the form fields, email, and Save/Cancel/Sign out controls', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toContain('Your profile')
    expect(html).toContain('Display name')
    expect(html).toContain('Accent color')
    expect(html).toContain('ada@example.com')
    expect(html).toContain('Save')
    expect(html).toContain('Cancel')
    expect(html).toContain('Sign out')
  })

  it('renders the no-storage hint when the Supabase client is missing', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toContain('Image upload is unavailable')
    expect(html).not.toContain('type="file"')
  })

  it('renders an accent radio group with allow-listed swatches', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toMatch(/role="radio"/)
    expect(html).toContain('aria-label="Accent color"')
    expect(html).toContain('ice')
    expect(html).toContain('aurora')
  })

  it('uses the selected private accent for the initials avatar preview', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel
        authState={{
          ...authState,
          user: {
            ...authState.user!,
            profile: {
              ...authState.user!.profile!,
              accentColor: 'rose',
              gradient: 'from-emerald-500 to-teal-700',
            },
          },
        }}
        isOpen
        onClose={noop}
        onSave={noop}
        onSignOut={noop}
      />,
    )

    expect(html).toContain('from-rose-300 to-pink-700')
    expect(html).not.toContain('from-emerald-500 to-teal-700')
  })

  it('renders public profile controls only when the public save seam is supplied', () => {
    const hiddenHtml = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(hiddenHtml).not.toContain('Public profile')

    const html = renderToStaticMarkup(
      <ProfilePanel
        authState={authState}
        isOpen
        onClose={noop}
        onSave={noop}
        onSavePublicProfile={noop}
        onSignOut={noop}
        publicProfile={{
          accentColor: 'cyan',
          bio: 'Word-game enjoyer',
          createdAt: '2026-06-21T00:00:00.000Z',
          displayName: 'Public Ada',
          flairKey: 'none',
          moderationStatus: 'active',
          publicProfileId: '123e4567-e89b-42d3-a456-426614174000',
          updatedAt: '2026-06-21T00:01:00.000Z',
          visibility: 'public',
        }}
      />,
    )
    expect(html).toContain('Public profile')
    expect(html).toContain('Public display name')
    expect(html).toContain('Bio')
    expect(html).toContain('Public Ada')
    expect(html).toContain('from-sky-400 to-cyan-700')
    expect(html).toContain('123e4567-e89b-42d3-a456-426614174000')
    expect(html).toContain('Save public profile')
  })
})

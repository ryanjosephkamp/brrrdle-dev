import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { PublicProfileCard, PublicProfilePage } from './PublicProfilePage'
import type { PublicPlayerProfile } from './publicProfile'

const PROFILE: PublicPlayerProfile = {
  accentColor: 'aurora',
  avatarUrl: 'https://example.invalid/public/avatar.png',
  bio: 'Ranked word nerd.',
  createdAt: '2026-06-21T00:00:00.000Z',
  displayName: 'Public Ada',
  flairKey: 'none',
  publicProfileId: '123e4567-e89b-42d3-a456-426614174000',
  updatedAt: '2026-06-21T00:01:00.000Z',
}

describe('PublicProfileCard', () => {
  it('renders public-safe profile fields without exposing opaque or private identifiers', () => {
    const html = renderToStaticMarkup(<PublicProfileCard profile={PROFILE} status="ready" />)

    expect(html).toContain('Player profile')
    expect(html).toContain('Public Ada')
    expect(html).toContain('Ranked word nerd.')
    expect(html).toContain('Active public profile')
    expect(html).toContain('Updated Jun')
    expect(html).not.toContain(PROFILE.publicProfileId)
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('email')
    expect(html).not.toContain('rating_transaction_id')
    expect(html).not.toContain('queue_id')
    expect(html).not.toContain('serialized_session')
  })

  it('shows authenticated private Practice request controls without exposing profile ids', () => {
    const html = renderToStaticMarkup(
      <PublicProfileCard
        authStatus="authenticated"
        onRequestPrivateMatch={() => undefined}
        privateMatchMessage="Private Practice match request sent."
        privateMatchRequestsAvailable
        profile={PROFILE}
        status="ready"
      />,
    )

    expect(html).toContain('Private Practice match')
    expect(html).toContain('Request Practice match')
    expect(html).toContain('Private Practice match request sent.')
    expect(html).not.toContain(PROFILE.publicProfileId)
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('playerUserIds')
  })

  it('keeps private Practice requests signed-in only', () => {
    const html = renderToStaticMarkup(
      <PublicProfileCard authStatus="anonymous" profile={PROFILE} status="ready" />,
    )

    expect(html).toContain('Sign in to send private Practice match requests.')
    expect(html).not.toContain('Request Practice match')
  })

  it('uses a single unavailable fallback for hidden, private, suspended, missing, or invalid profiles', () => {
    const html = renderToStaticMarkup(<PublicProfileCard status="unavailable" />)

    expect(html).toContain('This public profile is unavailable')
    expect(html).toContain('private, hidden, suspended, missing')
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('email')
  })
})

describe('PublicProfilePage', () => {
  it('renders an unavailable state for malformed profile route ids without calling a repository', () => {
    const html = renderToStaticMarkup(
      <PublicProfilePage
        publicProfileId="raw-auth-id"
        repository={{
          loadPublicProfile: async () => PROFILE,
        }}
      />,
    )

    expect(html).toContain('This public profile is unavailable')
    expect(html).not.toContain('Public Ada')
  })
})

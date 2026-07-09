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
    expect(html).toContain('Public ranked Practice metadata')
    expect(html).toContain('Sign in to view public ranked Practice metadata')
    expect(html).toContain('Updated Jun')
    expect(html).not.toContain(PROFILE.publicProfileId)
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('email')
    expect(html).not.toContain('rating_transaction_id')
    expect(html).not.toContain('queue_id')
    expect(html).not.toContain('serialized_session')
  })

  it('renders safe public ranked Practice metadata without exposing leaderboard internals', () => {
    const html = renderToStaticMarkup(
      <PublicProfileCard
        authStatus="authenticated"
        profile={PROFILE}
        ratingMetadata={[{
          bucketLabel: 'OG ranked Practice',
          gamesLabel: '12 rated',
          latestMovementLabel: '+18 from last settlement',
          peakLabel: 'Peak 1290',
          provisionalLabel: 'Established',
          rankBandLabel: 'Silver',
          rankLabel: '#4',
          ratingLabel: '1260',
          recordLabel: '8-3-1',
          updatedLabel: '9 Jul, 12:05 UTC',
        }]}
        ratingMetadataStatus="ready"
        status="ready"
      />,
    )

    expect(html).toContain('Public ranked Practice metadata')
    expect(html).toContain('OG ranked Practice')
    expect(html).toContain('#4 · Silver band')
    expect(html).toContain('1260')
    expect(html).toContain('8-3-1')
    expect(html).toContain('+18 from last settlement')
    expect(html).toContain('Peak 1290')
    expect(html).toContain('Leaderboard freshness')
    expect(html).not.toContain(PROFILE.publicProfileId)
    expect(html).not.toContain('publicProfileId')
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('email')
    expect(html).not.toContain('match_id')
    expect(html).not.toContain('queue_id')
    expect(html).not.toContain('rating_transaction_id')
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
    expect(html).toContain('Private Practice mode')
    expect(html).toContain('Private Practice word length')
    expect(html).toContain('Private Practice time control')
    expect(html).toContain('Private Practice Hard Mode')
    expect(html).toContain('Current request: OG, 5 letters, Hard Mode off, no clock')
    expect(html).toContain('Request Practice match')
    expect(html).toContain('Private Practice match request sent.')
    expect(html).not.toContain(PROFILE.publicProfileId)
    expect(html).not.toContain('user_id')
    expect(html).not.toContain('playerUserIds')
  })

  it('summarizes selected private Practice GO settings without exposing profile ids', () => {
    const html = renderToStaticMarkup(
      <PublicProfileCard
        authStatus="authenticated"
        onRequestPrivateMatch={() => undefined}
        privateMatchRequestsAvailable
        privatePracticeSettings={{
          goPuzzleCount: 5,
          hardMode: true,
          mode: 'go',
          timeLimitMs: 300_000,
          wordLength: 7,
        }}
        profile={PROFILE}
        status="ready"
      />,
    )

    expect(html).toContain('Current request: GO, 7 letters, 5 puzzles, Hard Mode on, 5:00 per side')
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

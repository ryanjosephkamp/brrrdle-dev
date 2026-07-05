import { describe, expect, it } from 'vitest'
import type { OwnerPublicProfile } from './publicProfile'
import {
  getPrivateMatchRequestErrorMessage,
  isOwnerPublicProfileEligibleForPrivateMatch,
  PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE,
} from './publicProfilePrivateMatch'

const ACTIVE_OWNER_PROFILE: OwnerPublicProfile = {
  accentColor: 'aurora',
  createdAt: '2026-07-04T00:00:00.000Z',
  displayName: 'Public Player',
  flairKey: 'none',
  moderationStatus: 'active',
  publicProfileId: '11111111-1111-4111-8111-111111111111',
  updatedAt: '2026-07-04T00:01:00.000Z',
  visibility: 'public',
}

describe('private Practice public-profile eligibility', () => {
  it('allows active public profiles without requiring ranked rating metadata', () => {
    expect(isOwnerPublicProfileEligibleForPrivateMatch(ACTIVE_OWNER_PROFILE)).toBe(true)
  })

  it('denies missing, private, hidden, suspended, or unnamed requester profiles', () => {
    expect(isOwnerPublicProfileEligibleForPrivateMatch(undefined)).toBe(false)
    expect(isOwnerPublicProfileEligibleForPrivateMatch({ ...ACTIVE_OWNER_PROFILE, visibility: 'private' })).toBe(false)
    expect(isOwnerPublicProfileEligibleForPrivateMatch({ ...ACTIVE_OWNER_PROFILE, moderationStatus: 'hidden' })).toBe(false)
    expect(isOwnerPublicProfileEligibleForPrivateMatch({ ...ACTIVE_OWNER_PROFILE, moderationStatus: 'suspended' })).toBe(false)
    expect(isOwnerPublicProfileEligibleForPrivateMatch({ ...ACTIVE_OWNER_PROFILE, displayName: undefined })).toBe(false)
  })

  it('normalizes requester profile RPC failures away from ranked Elo confusion', () => {
    expect(getPrivateMatchRequestErrorMessage(new Error('Unable to create private match request: Requester must have an active public profile.'))).toBe(PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE)
    expect(PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE).toContain('Ranked Elo is not required')
  })
})

import type { OwnerPublicProfile } from './publicProfile'

export const PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE = 'Private Practice requests require your account to have an active public profile with a display name. Ranked Elo is not required.'

export function isOwnerPublicProfileEligibleForPrivateMatch(profile: OwnerPublicProfile | undefined): boolean {
  return Boolean(
    profile
    && profile.visibility === 'public'
    && profile.moderationStatus === 'active'
    && profile.displayName,
  )
}

export function getPrivateMatchRequestErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message.trim() : ''
  if (/requester must have an active public profile/iu.test(message)) {
    return PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE
  }
  return message || 'Unable to send private match request right now.'
}

import { describe, expect, it } from 'vitest'
import type { PublicRankedLeaderboardRow } from './publicRankedLeaderboard'
import {
  createPublicRankedLeaderboardViewRows,
  formatPublicRankedLeaderboardBucket,
  formatPublicRankedLeaderboardDelta,
} from './publicRankedLeaderboardViewModels'

const ROW: PublicRankedLeaderboardRow = {
  accentColor: 'cyan',
  avatarUrl: 'https://example.invalid/avatar.png',
  bucket: 'multiplayer:og',
  displayName: 'Ada',
  draws: 1,
  flairKey: 'none',
  gamesPlayed: 12,
  latestRatingDelta: 18,
  latestRatingMovementAt: '2026-06-23T01:00:00.000Z',
  leaderboardKey: 'ranked-practice-v1',
  leaderboardUpdatedAt: '2026-06-23T01:05:00.000Z',
  losses: 3,
  peakRating: 1290,
  profileUpdatedAt: '2026-06-23T00:55:00.000Z',
  provisional: false,
  publicProfileId: '123e4567-e89b-42d3-a456-426614174000',
  rank: 1,
  rating: 1260,
  wins: 8,
}

describe('public ranked leaderboard view models', () => {
  it('formats approved buckets and rating deltas for display', () => {
    expect(formatPublicRankedLeaderboardBucket(null)).toBe('All ranked Practice buckets')
    expect(formatPublicRankedLeaderboardBucket('multiplayer:og')).toBe('OG ranked Practice')
    expect(formatPublicRankedLeaderboardBucket('multiplayer:go')).toBe('GO ranked Practice')
    expect(formatPublicRankedLeaderboardDelta(18)).toBe('+18')
    expect(formatPublicRankedLeaderboardDelta(0)).toBe('0')
    expect(formatPublicRankedLeaderboardDelta(-12)).toBe('-12')
  })

  it('creates public-safe row labels without private leaderboard fields', () => {
    const rows = createPublicRankedLeaderboardViewRows([ROW])
    const json = JSON.stringify(rows)

    expect(rows[0]).toMatchObject({
      bucketLabel: 'OG ranked Practice',
      gamesLabel: '12 rated',
      latestMovementLabel: '+18 from last settlement',
      peakLabel: 'Peak 1290',
      provisionalLabel: 'Established',
      rankLabel: '#1',
      ratingLabel: '1260',
      recordLabel: '8-3-1',
    })
    expect(json).not.toContain('user_id')
    expect(json).not.toContain('email')
    expect(json).not.toContain('rating_transaction_id')
    expect(json).not.toContain('match_id')
    expect(json).not.toContain('queue_id')
  })

  it('shows provisional rows without implying a private transaction exists', () => {
    const rows = createPublicRankedLeaderboardViewRows([{
      ...ROW,
      avatarUrl: undefined,
      gamesPlayed: 2,
      latestRatingDelta: 0,
      latestRatingMovementAt: undefined,
      peakRating: 1205,
      provisional: true,
      rank: 9,
      rating: 1205,
      wins: 1,
      losses: 1,
      draws: 0,
    }])

    expect(rows[0]).toMatchObject({
      latestMovementLabel: 'No settled movement yet',
      peakLabel: 'Peak 1205',
      provisionalLabel: 'Provisional',
      rankLabel: '#9',
      ratingLabel: '1205',
      recordLabel: '1-1-0',
    })
  })

  it('does not add comma separators to rating values or rating-tied ranks', () => {
    const rows = createPublicRankedLeaderboardViewRows([{
      ...ROW,
      peakRating: 1602,
      rank: 1201,
      rating: 1599,
    }])

    expect(rows[0]).toMatchObject({
      peakLabel: 'Peak 1602',
      rankLabel: '#1201',
      ratingLabel: '1599',
    })
    expect(rows[0]?.peakLabel).not.toContain(',')
    expect(rows[0]?.rankLabel).not.toContain(',')
    expect(rows[0]?.ratingLabel).not.toContain(',')
  })
})

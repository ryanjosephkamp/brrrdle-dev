import type { ProfileAccentColor } from '../account/profile'
import type {
  PublicRankedLeaderboardBucket,
  PublicRankedLeaderboardRow,
} from './publicRankedLeaderboard'

export interface PublicRankedLeaderboardBucketOption {
  readonly bucket: PublicRankedLeaderboardBucket | null
  readonly description: string
  readonly label: string
}

export interface PublicRankedLeaderboardViewRow {
  readonly accentColor: ProfileAccentColor
  readonly avatarUrl?: string
  readonly bucket: PublicRankedLeaderboardBucket
  readonly bucketLabel: string
  readonly displayName: string
  readonly gamesLabel: string
  readonly latestMovementLabel: string
  readonly peakLabel: string
  readonly provisionalLabel: string
  readonly publicProfileId: string
  readonly rank: number
  readonly rankLabel: string
  readonly rating: number
  readonly ratingLabel: string
  readonly recordLabel: string
  readonly updatedLabel: string
}

const PUBLIC_RANKED_LEADERBOARD_BUCKET_LABELS: Record<PublicRankedLeaderboardBucket, string> = {
  'multiplayer:go': 'GO ranked Practice',
  'multiplayer:og': 'OG ranked Practice',
}

export const PUBLIC_RANKED_LEADERBOARD_BUCKET_OPTIONS: readonly PublicRankedLeaderboardBucketOption[] = [
  {
    bucket: null,
    description: 'Show all ranked Practice buckets.',
    label: 'All buckets',
  },
  {
    bucket: 'multiplayer:og',
    description: 'Show OG ranked Practice rows only.',
    label: 'OG',
  },
  {
    bucket: 'multiplayer:go',
    description: 'Show GO ranked Practice rows only.',
    label: 'GO',
  },
]

export const PUBLIC_RANKED_LEADERBOARD_LIMIT_OPTIONS = [25, 50, 100] as const

function formatCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatRatingNumber(value: number): string {
  return `${Math.round(value)}`
}

export function formatPublicRankedLeaderboardBucket(bucket: PublicRankedLeaderboardBucket | null): string {
  return bucket ? PUBLIC_RANKED_LEADERBOARD_BUCKET_LABELS[bucket] : 'All ranked Practice buckets'
}

export function formatPublicRankedLeaderboardDelta(delta: number): string {
  return delta > 0 ? `+${delta}` : `${delta}`
}

export function formatPublicRankedLeaderboardDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date)
}

export function createPublicRankedLeaderboardViewRows(
  rows: readonly PublicRankedLeaderboardRow[],
): readonly PublicRankedLeaderboardViewRow[] {
  return rows.map((row) => ({
    accentColor: row.accentColor,
    avatarUrl: row.avatarUrl,
    bucket: row.bucket,
    bucketLabel: formatPublicRankedLeaderboardBucket(row.bucket),
    displayName: row.displayName,
    gamesLabel: `${formatCount(row.gamesPlayed)} rated`,
    latestMovementLabel: row.latestRatingMovementAt
      ? `${formatPublicRankedLeaderboardDelta(row.latestRatingDelta)} from last settlement`
      : 'No settled movement yet',
    peakLabel: `Peak ${formatRatingNumber(row.peakRating)}`,
    provisionalLabel: row.provisional ? 'Provisional' : 'Established',
    publicProfileId: row.publicProfileId,
    rank: row.rank,
    rankLabel: `#${formatRatingNumber(row.rank)}`,
    rating: row.rating,
    ratingLabel: formatRatingNumber(row.rating),
    recordLabel: `${formatCount(row.wins)}-${formatCount(row.losses)}-${formatCount(row.draws)}`,
    updatedLabel: formatPublicRankedLeaderboardDate(row.leaderboardUpdatedAt),
  }))
}

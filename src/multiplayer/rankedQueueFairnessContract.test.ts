import { describe, expect, it } from 'vitest'
import FAIRNESS_MIGRATION_SQL from '../../supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql?raw'

describe('ranked queue fairness migration contract', () => {
  it('preserves the browser-facing claim RPC signature and response shape', () => {
    expect(FAIRNESS_MIGRATION_SQL).toContain('create or replace function public.claim_ranked_async_matchmaking_pair')
    expect(FAIRNESS_MIGRATION_SQL).toContain('p_request_id text')
    expect(FAIRNESS_MIGRATION_SQL).toContain('p_matched_game_id text default null')
    expect(FAIRNESS_MIGRATION_SQL).toContain('returns table (')
    expect(FAIRNESS_MIGRATION_SQL).toContain('request_id text')
    expect(FAIRNESS_MIGRATION_SQL).toContain('opponent_request_id text')
    expect(FAIRNESS_MIGRATION_SQL).toContain('matched_game_id text')
    expect(FAIRNESS_MIGRATION_SQL).toContain('request_status text')
  })

  it('keeps same-settings compatibility filters before preferring non-recent opponents', () => {
    const compatibilityIndex = FAIRNESS_MIGRATION_SQL.indexOf('candidate.hard_mode = v_request.hard_mode')
    const orderIndex = FAIRNESS_MIGRATION_SQL.indexOf('order by')
    const recentOpponentPenaltyIndex = FAIRNESS_MIGRATION_SQL.indexOf('public.phase43_is_recent_ranked_practice_opponent', orderIndex)
    const ratingDistanceIndex = FAIRNESS_MIGRATION_SQL.indexOf('abs(candidate.rating_snapshot - v_request.rating_snapshot)', orderIndex)
    const queueAgeIndex = FAIRNESS_MIGRATION_SQL.indexOf('candidate.queued_at', orderIndex)

    expect(FAIRNESS_MIGRATION_SQL).toContain('candidate.mode = v_request.mode')
    expect(FAIRNESS_MIGRATION_SQL).toContain('candidate.rating_bucket = v_request.rating_bucket')
    expect(FAIRNESS_MIGRATION_SQL).toContain('candidate.word_length = v_request.word_length')
    expect(FAIRNESS_MIGRATION_SQL).toContain('candidate.time_limit_ms is not distinct from v_request.time_limit_ms')
    expect(compatibilityIndex).toBeGreaterThan(0)
    expect(compatibilityIndex).toBeLessThan(orderIndex)
    expect(recentOpponentPenaltyIndex).toBeGreaterThan(orderIndex)
    expect(recentOpponentPenaltyIndex).toBeLessThan(ratingDistanceIndex)
    expect(ratingDistanceIndex).toBeLessThan(queueAgeIndex)
  })

  it('keeps the recent-opponent helper internal and projection-derived', () => {
    expect(FAIRNESS_MIGRATION_SQL).toContain("game_row.projection ->> 'hardMode'")
    expect(FAIRNESS_MIGRATION_SQL).toContain("game_row.projection ->> 'timeLimitMs'")
    expect(FAIRNESS_MIGRATION_SQL).not.toContain('async_multiplayer_games.hard_mode')
    expect(FAIRNESS_MIGRATION_SQL).toContain('revoke all on function public.phase43_is_recent_ranked_practice_opponent')
    expect(FAIRNESS_MIGRATION_SQL).not.toContain('grant execute on function public.phase43_is_recent_ranked_practice_opponent')
  })
})

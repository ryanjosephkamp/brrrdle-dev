import { describe, expect, it } from 'vitest'
import { DAILY_WORD_LENGTH } from '../game/constants.js'
import { getDailyAnswerIndex, getDailyDateKey, getDailyOgPuzzle, selectDailyAnswer } from './daily.js'

describe('daily puzzle selection', () => {
  it('uses stable UTC date keys', () => {
    expect(getDailyDateKey(new Date('2026-05-26T23:59:59.000Z'))).toBe('2026-05-26')
  })

  it('selects deterministic answer indexes for a date key', () => {
    expect(getDailyAnswerIndex('2026-05-26', 3)).toBe(getDailyAnswerIndex('2026-05-26', 3))
    expect(getDailyAnswerIndex('2026-05-26', 3)).toBeGreaterThanOrEqual(0)
    expect(getDailyAnswerIndex('2026-05-26', 3)).toBeLessThan(3)
  })

  it('always creates daily og puzzles at the launch daily length', () => {
    const puzzle = getDailyOgPuzzle(new Date('2026-05-26T00:00:00.000Z'))

    expect(puzzle.length).toBe(DAILY_WORD_LENGTH)
    expect(puzzle.answer).toHaveLength(DAILY_WORD_LENGTH)
  })

  it('selects from provided answers deterministically', () => {
    const answers = [{ word: 'crane' }, { word: 'slate' }, { word: 'brisk' }]

    expect(selectDailyAnswer(answers, new Date('2026-05-26T00:00:00.000Z'))).toMatchObject({
      answer: 'slate',
      dateKey: '2026-05-26',
      index: 1,
      length: 5,
    })
  })
})

import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DEFAULT_DIFFICULTY_TIER } from '../../data'
import {
  createGoSession,
  createOgSession,
  createPracticeGoSetup,
  createPracticeOgSetup,
  enterGoLetter,
  enterLetter,
  serializeGoSession,
  serializeOgSession,
  submitGoGuess,
  submitGuess,
  type SerializedGoSession,
  type SerializedOgSession,
} from '../../game'
import { GoGame } from './GoGame'
import { OgGame } from './OgGame'

function spendNothing() {
  return false
}

function findWrongGuess(validGuesses: ReadonlySet<string>, answer: string): string {
  const guess = Array.from(validGuesses).find((candidate) => candidate.length === answer.length && candidate !== answer)
  if (!guess) {
    throw new Error(`No wrong ${answer.length}-letter guess is available for the test fixture.`)
  }
  return guess
}

function submitOgWord(session: ReturnType<typeof createOgSession>, word: string) {
  return submitGuess([...word].reduce((currentSession, letter) => enterLetter(currentSession, letter), session))
}

function submitGoWord(session: ReturnType<typeof createGoSession>, word: string) {
  return submitGoGuess([...word].reduce((currentSession, letter) => enterGoLetter(currentSession, letter), session))
}

function createStartedPracticeOgSession(): SerializedOgSession {
  const setup = createPracticeOgSetup(5, 0, DEFAULT_DIFFICULTY_TIER)
  const session = submitOgWord(createOgSession(setup), findWrongGuess(setup.validGuesses, setup.answer))
  expect(session.status).toBe('playing')
  return serializeOgSession(session)
}

function createStartedPracticeGoSession(): SerializedGoSession {
  const setup = createPracticeGoSetup(5, 0, DEFAULT_DIFFICULTY_TIER, 5)
  const activeAnswer = setup.puzzles[0]?.answer ?? ''
  const session = submitGoWord(createGoSession(setup), findWrongGuess(setup.validGuesses, activeAnswer))
  expect(session.status).toBe('playing')
  return serializeGoSession(session)
}

describe('Practice Solo account boundaries', () => {
  it('restores Practice OG from the active owner scoped resume slot', () => {
    const html = renderToStaticMarkup(
      <OgGame
        coins={0}
        initialResume={{
          difficulty: DEFAULT_DIFFICULTY_TIER,
          mode: 'og',
          scope: 'practice',
          serializedSession: createStartedPracticeOgSession(),
          updatedAt: '2026-07-05T12:00:00.000Z',
          wordLength: 5,
        }}
        keyboardDisabled
        onSpendCoins={spendNothing}
        progressOwnerKey="account:one"
        scope="practice"
      />,
    )

    expect(html).toContain('5 attempts remaining.')
  })

  it('starts Practice OG fresh when the active owner has no scoped resume slot', () => {
    const html = renderToStaticMarkup(
      <OgGame coins={0} keyboardDisabled onSpendCoins={spendNothing} progressOwnerKey="account:one" scope="practice" />,
    )

    expect(html).toContain('6 attempts remaining.')
    expect(html).not.toContain('5 attempts remaining.')
  })

  it('restores Practice GO from the active owner scoped resume slot', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        initialResume={{
          difficulty: DEFAULT_DIFFICULTY_TIER,
          goPuzzleCount: 5,
          mode: 'go',
          scope: 'practice',
          serializedSession: createStartedPracticeGoSession(),
          updatedAt: '2026-07-05T12:00:00.000Z',
          wordLength: 5,
        }}
        keyboardDisabled
        onSpendCoins={spendNothing}
        progressOwnerKey="account:one"
        scope="practice"
      />,
    )

    expect(html).toContain('5 attempts remaining.')
  })

  it('starts Practice GO fresh when the active owner has no scoped resume slot', () => {
    const html = renderToStaticMarkup(
      <GoGame coins={0} keyboardDisabled onSpendCoins={spendNothing} progressOwnerKey="account:one" scope="practice" />,
    )

    expect(html).toContain('6 attempts remaining.')
    expect(html).not.toContain('5 attempts remaining.')
  })
})

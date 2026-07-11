import { describe, expect, it } from 'vitest'
import {
  applyEconomyCommand,
  createEconomySnapshot,
  createInitialConsumableEffects,
  revealNextPracticeLetter,
  removePracticeIncorrectLetters,
} from './economy'

describe('Phase 57 economy', () => {
  it('purchases one inventory item once for an idempotent operation id', () => {
    const initial = createEconomySnapshot({ coins: 50 })
    const first = applyEconomyCommand(initial, {
      operationId: 'purchase:one',
      type: 'purchase',
      consumable: 'revealOneLetter',
    })
    expect(first).toMatchObject({ ok: true, snapshot: { coins: 25, consumables: { revealOneLetter: 1 } } })

    const retry = first.ok ? applyEconomyCommand(first.snapshot, {
      operationId: 'purchase:one',
      type: 'purchase',
      consumable: 'revealOneLetter',
    }) : first
    expect(retry).toEqual(first)
  })

  it('rejects insufficient coins and inventory without changing state', () => {
    const initial = createEconomySnapshot({ coins: 24 })
    expect(applyEconomyCommand(initial, {
      operationId: 'purchase:short',
      type: 'purchase',
      consumable: 'revealOneLetter',
    })).toEqual({ ok: false, reason: 'insufficient-coins', snapshot: initial })
    expect(applyEconomyCommand(initial, {
      operationId: 'consume:empty',
      type: 'consume',
      consumable: 'removeIncorrectLetters',
      scope: 'practice',
    })).toEqual({ ok: false, reason: 'insufficient-inventory', snapshot: initial })
  })

  it('rejects consumable use outside Solo Practice', () => {
    const initial = createEconomySnapshot({ coins: 0, consumables: { revealOneLetter: 1 } })
    expect(applyEconomyCommand(initial, {
      operationId: 'consume:daily',
      type: 'consume',
      consumable: 'revealOneLetter',
      scope: 'daily',
    })).toEqual({ ok: false, reason: 'practice-only', snapshot: initial })
  })

  it('reveals the lowest unrevealed position and removes only answer-absent letters', () => {
    const initial = createInitialConsumableEffects()
    const revealed = revealNextPracticeLetter('crane', initial)
    expect(revealed).toMatchObject({ ok: true, hint: { index: 0, letter: 'c' } })
    const second = revealed.ok ? revealNextPracticeLetter('crane', revealed.effects) : revealed
    expect(second).toMatchObject({ ok: true, hint: { index: 1, letter: 'r' } })

    const removed = removePracticeIncorrectLetters('ace', initial, 'abcde')
    expect(removed).toMatchObject({ ok: true, effects: { removedLetters: ['b', 'd'] } })
    expect(removed.ok && removePracticeIncorrectLetters('ace', removed.effects, 'abcde')).toMatchObject({
      ok: false,
      reason: 'already-applied',
    })
  })
})

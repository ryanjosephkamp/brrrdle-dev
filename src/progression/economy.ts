import type { PlayScope } from '../game/types'
import { CONSUMABLE_COSTS, removeIncorrectLetters, revealOneLetter, type ConsumableEffects, type ConsumableType } from './consumables'

export interface EconomySnapshot {
  readonly appliedOperationIds: readonly string[]
  readonly coins: number
  readonly consumables: Readonly<Record<ConsumableType, number>>
  readonly revision: number
}

export type { ConsumableEffects } from './consumables'

export type EconomyCommand =
  | { readonly operationId: string; readonly type: 'award'; readonly amount: number }
  | { readonly operationId: string; readonly type: 'spend'; readonly amount: number }
  | { readonly operationId: string; readonly type: 'purchase'; readonly consumable: ConsumableType }
  | { readonly operationId: string; readonly type: 'consume'; readonly consumable: ConsumableType; readonly scope: PlayScope }

export type EconomyCommandFailureReason = 'insufficient-coins' | 'insufficient-inventory' | 'invalid-command' | 'practice-only'
export type EconomyCommandResult =
  | { readonly ok: true; readonly snapshot: EconomySnapshot }
  | { readonly ok: false; readonly reason: EconomyCommandFailureReason; readonly snapshot: EconomySnapshot }

function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.trunc(value)) : 0
}

export function createEconomySnapshot(input: {
  readonly appliedOperationIds?: readonly string[]
  readonly coins?: number
  readonly consumables?: Partial<Record<ConsumableType, number>>
  readonly revision?: number
} = {}): EconomySnapshot {
  return {
    appliedOperationIds: Array.from(new Set((input.appliedOperationIds ?? []).filter((id) => typeof id === 'string' && id.length > 0))).slice(-500),
    coins: count(input.coins),
    consumables: {
      removeIncorrectLetters: count(input.consumables?.removeIncorrectLetters),
      revealOneLetter: count(input.consumables?.revealOneLetter),
    },
    revision: count(input.revision),
  }
}

export function applyEconomyCommand(snapshot: EconomySnapshot, command: EconomyCommand): EconomyCommandResult {
  if (!command.operationId.trim()) return { ok: false, reason: 'invalid-command', snapshot }
  if (snapshot.appliedOperationIds.includes(command.operationId)) return { ok: true, snapshot }

  let coins = snapshot.coins
  const consumables = { ...snapshot.consumables }
  if (command.type === 'award') {
    if (!Number.isInteger(command.amount) || command.amount <= 0) return { ok: false, reason: 'invalid-command', snapshot }
    coins += command.amount
  } else if (command.type === 'spend') {
    if (!Number.isInteger(command.amount) || command.amount <= 0) return { ok: false, reason: 'invalid-command', snapshot }
    if (coins < command.amount) return { ok: false, reason: 'insufficient-coins', snapshot }
    coins -= command.amount
  } else if (command.type === 'purchase') {
    const cost = CONSUMABLE_COSTS[command.consumable]
    if (coins < cost) return { ok: false, reason: 'insufficient-coins', snapshot }
    coins -= cost
    consumables[command.consumable] += 1
  } else {
    if (command.scope !== 'practice') return { ok: false, reason: 'practice-only', snapshot }
    if (consumables[command.consumable] <= 0) return { ok: false, reason: 'insufficient-inventory', snapshot }
    consumables[command.consumable] -= 1
  }

  return {
    ok: true,
    snapshot: createEconomySnapshot({
      appliedOperationIds: [...snapshot.appliedOperationIds, command.operationId],
      coins,
      consumables,
      revision: snapshot.revision + 1,
    }),
  }
}

export function createInitialConsumableEffects(value?: Partial<ConsumableEffects>): ConsumableEffects {
  const revealedHints = (value?.revealedHints ?? [])
    .filter((hint) => Number.isInteger(hint.index) && hint.index >= 0 && /^[a-z]$/i.test(hint.letter))
    .map((hint) => ({ index: hint.index, letter: hint.letter.toLocaleLowerCase('en-US') }))
    .filter((hint, index, hints) => hints.findIndex((candidate) => candidate.index === hint.index) === index)
    .sort((left, right) => left.index - right.index)
  const removedLetters = Array.from(new Set((value?.removedLetters ?? [])
    .filter((letter) => /^[a-z]$/i.test(letter))
    .map((letter) => letter.toLocaleLowerCase('en-US')))).sort()
  return { removedLetters, revealedHints }
}

export function revealNextPracticeLetter(answer: string, effects: ConsumableEffects):
  | { readonly ok: true; readonly effects: ConsumableEffects; readonly hint: { readonly index: number; readonly letter: string } }
  | { readonly ok: false; readonly effects: ConsumableEffects; readonly reason: 'fully-revealed' } {
  const hint = revealOneLetter(answer, effects.revealedHints.map((entry) => entry.index))
  if (!hint.ok) return { ok: false, effects, reason: hint.reason }
  const next = createInitialConsumableEffects({ ...effects, revealedHints: [...effects.revealedHints, { index: hint.index, letter: hint.letter }] })
  return { ok: true, effects: next, hint: { index: hint.index, letter: hint.letter } }
}

export function removePracticeIncorrectLetters(answer: string, effects: ConsumableEffects, candidates?: string):
  | { readonly ok: true; readonly effects: ConsumableEffects }
  | { readonly ok: false; readonly effects: ConsumableEffects; readonly reason: 'already-applied' } {
  if (effects.removedLetters.length > 0) return { ok: false, effects, reason: 'already-applied' }
  return { ok: true, effects: createInitialConsumableEffects({ ...effects, removedLetters: removeIncorrectLetters(answer, candidates) }) }
}

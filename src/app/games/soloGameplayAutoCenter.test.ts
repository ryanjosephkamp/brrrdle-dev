import { describe, expect, it } from 'vitest'
import { shouldAutoCenterSoloKeyboard } from './soloGameplayAutoCenter'

describe('solo gameplay keyboard auto-centering', () => {
  it('does not fire on the initial render or unchanged submitted-guess counts', () => {
    expect(shouldAutoCenterSoloKeyboard(undefined, 0)).toBe(false)
    expect(shouldAutoCenterSoloKeyboard(undefined, 2)).toBe(false)
    expect(shouldAutoCenterSoloKeyboard(1, 1)).toBe(false)
  })

  it('fires only after a valid submitted guess increases the count', () => {
    expect(shouldAutoCenterSoloKeyboard(0, 1)).toBe(true)
    expect(shouldAutoCenterSoloKeyboard(1, 2)).toBe(true)
    expect(shouldAutoCenterSoloKeyboard(2, 1)).toBe(false)
  })
})

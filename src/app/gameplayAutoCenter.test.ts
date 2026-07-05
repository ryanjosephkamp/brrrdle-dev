import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  GAMEPLAY_AUTOCENTER_TARGETS,
  getGameplayAutoCenterBlock,
  getGameplayAutoCenterSelector,
  scheduleGameplayAutoCenter,
} from './gameplayAutoCenter'

afterEach(() => {
  vi.unstubAllGlobals()
})

function installAutoCenterGlobals(options: {
  readonly activeElement?: unknown
  readonly element?: unknown
  readonly mobile?: boolean
  readonly reducedMotion?: boolean
}) {
  const callbacks: Array<() => void> = []
  const body = {}
  const documentElement = {}
  const querySelector = vi.fn(() => options.element ?? null)
  const documentRef = {
    activeElement: options.activeElement,
    body,
    documentElement,
    querySelector,
  }
  const windowRef = {
    matchMedia: vi.fn((query: string) => ({
      matches: query.includes('prefers-reduced-motion')
        ? Boolean(options.reducedMotion)
        : query.includes('max-width')
          ? Boolean(options.mobile)
          : false,
    })),
    setTimeout: vi.fn((callback: () => void) => {
      callbacks.push(callback)
      return 1
    }),
  }

  vi.stubGlobal('document', documentRef)
  vi.stubGlobal('window', windowRef)

  return { body, callbacks, documentElement, querySelector, windowRef }
}

describe('scheduleGameplayAutoCenter', () => {
  it('is a safe no-op without browser globals', () => {
    vi.stubGlobal('document', undefined)
    vi.stubGlobal('window', undefined)

    expect(scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.solo)).toBe(false)
  })

  it('schedules a centered smooth scroll and safe focus for a rendered gameplay target', () => {
    const element = {
      focus: vi.fn(),
      scrollIntoView: vi.fn(),
    }
    const { callbacks, querySelector, windowRef } = installAutoCenterGlobals({ element })

    expect(scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.multiplayer)).toBe(true)
    expect(windowRef.setTimeout).toHaveBeenCalledTimes(1)
    expect(querySelector).not.toHaveBeenCalled()

    callbacks[0]?.()

    expect(querySelector).toHaveBeenCalledWith(getGameplayAutoCenterSelector(GAMEPLAY_AUTOCENTER_TARGETS.multiplayer))
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      block: 'center',
      behavior: 'smooth',
    })
    expect(element.focus).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('exposes a dedicated solo keyboard target for post-guess viewport comfort', () => {
    expect(getGameplayAutoCenterSelector(GAMEPLAY_AUTOCENTER_TARGETS.soloKeyboard)).toBe('[data-gameplay-autocenter-target="solo-keyboard"]')
  })

  it('aligns the solo keyboard to the viewport end on mobile', () => {
    const windowRef = {
      matchMedia: vi.fn((query: string) => ({ matches: query.includes('max-width') })),
    } as unknown as Window

    expect(getGameplayAutoCenterBlock(GAMEPLAY_AUTOCENTER_TARGETS.soloKeyboard, windowRef)).toBe('end')
    expect(getGameplayAutoCenterBlock(GAMEPLAY_AUTOCENTER_TARGETS.solo, windowRef)).toBe('center')
  })

  it('keeps the solo keyboard centered on larger screens', () => {
    const windowRef = {
      matchMedia: vi.fn(() => ({ matches: false })),
    } as unknown as Window

    expect(getGameplayAutoCenterBlock(GAMEPLAY_AUTOCENTER_TARGETS.soloKeyboard, windowRef)).toBe('center')
  })

  it('uses auto scrolling when reduced motion is preferred', () => {
    const element = {
      focus: vi.fn(),
      scrollIntoView: vi.fn(),
    }
    const { callbacks } = installAutoCenterGlobals({ element, reducedMotion: true })

    scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.solo)
    callbacks[0]?.()

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      block: 'center',
      behavior: 'auto',
    })
  })

  it('uses end alignment for scheduled mobile solo keyboard scrolling', () => {
    const element = {
      focus: vi.fn(),
      scrollIntoView: vi.fn(),
    }
    const { callbacks } = installAutoCenterGlobals({ element, mobile: true })

    scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.soloKeyboard)
    callbacks[0]?.()

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      block: 'end',
      behavior: 'smooth',
    })
  })

  it('does not steal focus from an active input-like element', () => {
    const activeElement = { tagName: 'INPUT' }
    const element = {
      focus: vi.fn(),
      scrollIntoView: vi.fn(),
    }
    const { callbacks } = installAutoCenterGlobals({ activeElement, element })

    scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.solo)
    callbacks[0]?.()

    expect(element.scrollIntoView).toHaveBeenCalled()
    expect(element.focus).not.toHaveBeenCalled()
  })

  it('ignores stale routes where no gameplay anchor exists', () => {
    const { callbacks, querySelector } = installAutoCenterGlobals({})

    expect(scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.multiplayer)).toBe(true)
    callbacks[0]?.()

    expect(querySelector).toHaveBeenCalledWith(getGameplayAutoCenterSelector(GAMEPLAY_AUTOCENTER_TARGETS.multiplayer))
  })
})

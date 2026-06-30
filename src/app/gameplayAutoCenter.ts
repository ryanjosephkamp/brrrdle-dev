export const GAMEPLAY_AUTOCENTER_TARGET_ATTRIBUTE = 'data-gameplay-autocenter-target'

export const GAMEPLAY_AUTOCENTER_TARGETS = {
  multiplayer: 'multiplayer',
  solo: 'solo',
} as const

export type GameplayAutoCenterTarget =
  (typeof GAMEPLAY_AUTOCENTER_TARGETS)[keyof typeof GAMEPLAY_AUTOCENTER_TARGETS]

export function getGameplayAutoCenterSelector(target: GameplayAutoCenterTarget): string {
  return `[${GAMEPLAY_AUTOCENTER_TARGET_ATTRIBUTE}="${target}"]`
}

function canFocusAutoCenterTarget(documentRef: Document): boolean {
  const activeElement = documentRef.activeElement
  return !activeElement || activeElement === documentRef.body || activeElement === documentRef.documentElement
}

function getScrollBehavior(windowRef: Window): ScrollBehavior {
  return windowRef.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function scheduleGameplayAutoCenter(target: GameplayAutoCenterTarget): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  const windowRef = window
  const documentRef = document
  windowRef.setTimeout(() => {
    const element = documentRef.querySelector<HTMLElement>(getGameplayAutoCenterSelector(target))
    if (!element) {
      return
    }

    element.scrollIntoView({
      block: 'center',
      behavior: getScrollBehavior(windowRef),
    })

    if (canFocusAutoCenterTarget(documentRef)) {
      element.focus({ preventScroll: true })
    }
  }, 0)

  return true
}

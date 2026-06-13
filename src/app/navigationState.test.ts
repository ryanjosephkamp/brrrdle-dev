import { describe, expect, it } from 'vitest'
import {
  DEFAULT_NAVIGATION_STATE,
  LEGACY_NAVIGATION_STORAGE_KEY,
  NAVIGATION_STORAGE_KEY,
  loadNavigationState,
  saveNavigationState,
} from './navigationState'

function createStorage(initial: Record<string, string> = {}) {
  const records = new Map(Object.entries(initial))

  return {
    getItem: (key: string) => records.get(key) ?? null,
    setItem: (key: string, value: string) => {
      records.set(key, value)
    },
  }
}

describe('navigationState', () => {
  it('returns defaults without browser storage', () => {
    expect(loadNavigationState(undefined)).toEqual(DEFAULT_NAVIGATION_STATE)
  })

  it('loads and saves validated v2 route and subtab state', () => {
    const storage = createStorage()

    saveNavigationState({
      activeRouteId: 'solo',
      historyFilters: { mode: 'go', player: 'solo', scope: 'daily' },
      legacyPracticeMode: 'go',
      multiplayerSubtab: 'lobby',
      selectedMultiplayerGameId: 'game-123',
      selectedSoloGameKey: 'practice-go',
      soloSubtab: 'daily',
    }, storage)

    expect(loadNavigationState(storage)).toEqual({
      activeRouteId: 'solo',
      historyFilters: { mode: 'go', player: 'solo', scope: 'daily' },
      legacyPracticeMode: 'go',
      multiplayerSubtab: 'lobby',
      selectedMultiplayerGameId: 'game-123',
      selectedSoloGameKey: 'practice-go',
      soloSubtab: 'daily',
    })
  })

  it('falls back safely when v2 navigation state is corrupt or obsolete', () => {
    const storage = createStorage({
      [NAVIGATION_STORAGE_KEY]: JSON.stringify({
        activeRouteId: 'obsolete-route',
        historyFilters: { mode: 'invalid', player: 'invalid', scope: 'invalid' },
        legacyPracticeMode: 'invalid',
        multiplayerSubtab: 'invalid',
        selectedMultiplayerGameId: '',
        selectedSoloGameKey: '',
        soloSubtab: 'invalid',
      }),
    })

    expect(loadNavigationState(storage)).toEqual(DEFAULT_NAVIGATION_STATE)
  })

  it('maps legacy v1 Practice navigation to the Solo Practice compatibility target', () => {
    const storage = createStorage({
      [LEGACY_NAVIGATION_STORAGE_KEY]: JSON.stringify({
        activeRouteId: 'practice',
        practiceMode: 'go',
      }),
    })

    expect(loadNavigationState(storage)).toEqual({
      ...DEFAULT_NAVIGATION_STATE,
      activeRouteId: 'solo',
      legacyPracticeMode: 'go',
      soloSubtab: 'practice',
    })
  })

  it('maps v2 Practice compatibility navigation to the Solo Practice subtab', () => {
    const storage = createStorage({
      [NAVIGATION_STORAGE_KEY]: JSON.stringify({
        activeRouteId: 'practice',
        legacyPracticeMode: 'og',
        soloSubtab: 'overview',
      }),
    })

    expect(loadNavigationState(storage)).toMatchObject({
      activeRouteId: 'solo',
      legacyPracticeMode: 'og',
      soloSubtab: 'practice',
    })
  })

  it('normalizes legacy hidden daily route ids to the Calendar route', () => {
    const storage = createStorage({
      [LEGACY_NAVIGATION_STORAGE_KEY]: JSON.stringify({
        activeRouteId: 'go-daily',
        practiceMode: 'og',
      }),
    })

    expect(loadNavigationState(storage)).toMatchObject({
      activeRouteId: 'calendar',
      legacyPracticeMode: 'og',
    })
  })

  it('prefers valid v2 state over legacy v1 state', () => {
    const storage = createStorage({
      [LEGACY_NAVIGATION_STORAGE_KEY]: JSON.stringify({
        activeRouteId: 'practice',
        practiceMode: 'go',
      }),
      [NAVIGATION_STORAGE_KEY]: JSON.stringify({
        activeRouteId: 'multiplayer',
        legacyPracticeMode: 'og',
        multiplayerSubtab: 'live',
        soloSubtab: 'overview',
      }),
    })

    expect(loadNavigationState(storage)).toMatchObject({
      activeRouteId: 'multiplayer',
      legacyPracticeMode: 'og',
      multiplayerSubtab: 'live',
      soloSubtab: 'overview',
    })
  })
})

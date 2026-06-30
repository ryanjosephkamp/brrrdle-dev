import { DEFAULT_ROUTE_ID, getRouteCompatibilityTarget, isAppRouteId, type AppRouteId } from './routes'

export type LegacyPracticeMode = 'og' | 'go'

export type SoloSubtabId = 'overview' | 'daily' | 'practice' | 'active'

export type MultiplayerSubtabId = 'overview' | 'daily' | 'practice' | 'active' | 'lobby' | 'live'

export type HistoryPlayerFilter = 'all' | 'solo' | 'multiplayer'

export type HistoryPlayScopeFilter = 'all' | 'daily' | 'practice'

export type HistoryModeFilter = 'all' | 'og' | 'go'

export interface HistoryFilters {
  readonly player: HistoryPlayerFilter
  readonly scope: HistoryPlayScopeFilter
  readonly mode: HistoryModeFilter
}

export interface NavigationState {
  readonly activeRouteId: AppRouteId
  readonly legacyPracticeMode: LegacyPracticeMode
  readonly soloSubtab: SoloSubtabId
  readonly multiplayerSubtab: MultiplayerSubtabId
  readonly selectedSoloGameKey?: string
  readonly selectedMultiplayerGameId?: string
  readonly historyFilters: HistoryFilters
}

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>

export const NAVIGATION_STORAGE_KEY = 'brrrdle:navigation:v2'
export const LEGACY_NAVIGATION_STORAGE_KEY = 'brrrdle:navigation:v1'

export const DEFAULT_HISTORY_FILTERS: HistoryFilters = {
  mode: 'all',
  player: 'all',
  scope: 'all',
}

export const DEFAULT_NAVIGATION_STATE: NavigationState = {
  activeRouteId: DEFAULT_ROUTE_ID,
  historyFilters: DEFAULT_HISTORY_FILTERS,
  legacyPracticeMode: 'og',
  multiplayerSubtab: 'overview',
  soloSubtab: 'overview',
}

function getDefaultStorage(): StorageLike | undefined {
  return typeof window === 'undefined' ? undefined : window.localStorage
}

function readRecord(storage: StorageLike, key: string): Record<string, unknown> | null {
  const raw = storage.getItem(key)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : null
  } catch {
    return null
  }
}

function isLegacyPracticeMode(value: unknown): value is LegacyPracticeMode {
  return value === 'og' || value === 'go'
}

function isSoloSubtabId(value: unknown): value is SoloSubtabId {
  return value === 'overview' || value === 'daily' || value === 'practice' || value === 'active'
}

function isMultiplayerSubtabId(value: unknown): value is MultiplayerSubtabId {
  return value === 'overview' || value === 'daily' || value === 'practice' || value === 'active' || value === 'lobby' || value === 'live'
}

function isHistoryPlayerFilter(value: unknown): value is HistoryPlayerFilter {
  return value === 'all' || value === 'solo' || value === 'multiplayer'
}

function isHistoryPlayScopeFilter(value: unknown): value is HistoryPlayScopeFilter {
  return value === 'all' || value === 'daily' || value === 'practice'
}

function isHistoryModeFilter(value: unknown): value is HistoryModeFilter {
  return value === 'all' || value === 'og' || value === 'go'
}

function normalizeOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined
}

function normalizeHistoryFilters(value: unknown): HistoryFilters {
  const record = (typeof value === 'object' && value !== null ? value : {}) as Record<string, unknown>

  return {
    mode: isHistoryModeFilter(record.mode) ? record.mode : DEFAULT_HISTORY_FILTERS.mode,
    player: isHistoryPlayerFilter(record.player) ? record.player : DEFAULT_HISTORY_FILTERS.player,
    scope: isHistoryPlayScopeFilter(record.scope) ? record.scope : DEFAULT_HISTORY_FILTERS.scope,
  }
}

export function normalizeNavigationState(value: unknown): NavigationState {
  const record = (typeof value === 'object' && value !== null ? value : {}) as Record<string, unknown>
  const legacyPracticeMode = isLegacyPracticeMode(record.legacyPracticeMode)
    ? record.legacyPracticeMode
    : isLegacyPracticeMode(record.practiceMode)
      ? record.practiceMode
      : DEFAULT_NAVIGATION_STATE.legacyPracticeMode
  const rawActiveRouteId = isAppRouteId(record.activeRouteId)
    ? record.activeRouteId
    : DEFAULT_NAVIGATION_STATE.activeRouteId
  const activeRouteId = getRouteCompatibilityTarget(rawActiveRouteId)
  const routeWasPracticeCompatibility = rawActiveRouteId === 'practice'

  return {
    activeRouteId,
    historyFilters: normalizeHistoryFilters(record.historyFilters),
    legacyPracticeMode,
    multiplayerSubtab: isMultiplayerSubtabId(record.multiplayerSubtab) ? record.multiplayerSubtab : DEFAULT_NAVIGATION_STATE.multiplayerSubtab,
    selectedMultiplayerGameId: normalizeOptionalString(record.selectedMultiplayerGameId),
    selectedSoloGameKey: normalizeOptionalString(record.selectedSoloGameKey),
    soloSubtab: routeWasPracticeCompatibility
      ? 'practice'
      : isSoloSubtabId(record.soloSubtab)
        ? record.soloSubtab
        : DEFAULT_NAVIGATION_STATE.soloSubtab,
  }
}

export function loadNavigationState(storage: StorageLike | undefined = getDefaultStorage()): NavigationState {
  if (!storage) {
    return DEFAULT_NAVIGATION_STATE
  }

  const v2Record = readRecord(storage, NAVIGATION_STORAGE_KEY)
  if (v2Record) {
    return normalizeNavigationState(v2Record)
  }

  const legacyRecord = readRecord(storage, LEGACY_NAVIGATION_STORAGE_KEY)
  if (legacyRecord) {
    return normalizeNavigationState(legacyRecord)
  }

  return DEFAULT_NAVIGATION_STATE
}

export function saveNavigationState(patch: Partial<NavigationState>, storage: StorageLike | undefined = getDefaultStorage()): void {
  if (!storage) {
    return
  }

  try {
    const current = loadNavigationState(storage)
    const next = normalizeNavigationState({ ...current, ...patch })
    storage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Browser storage is best-effort only; navigation still works without it.
  }
}

import { isLoadWordListFailure, loadBundledWordList } from '../data/loadWordList.js'
import { BUNDLED_WORD_LIST_LENGTHS } from '../data/wordLists.js'

export type WordEntryType = 'answer' | 'valid-guess'

export interface WordExplorerEntry {
  readonly word: string
  readonly types: ReadonlySet<WordEntryType>
}

export const WORD_EXPLORER_LENGTHS: readonly number[] = BUNDLED_WORD_LIST_LENGTHS
export const DEFAULT_WORD_EXPLORER_LENGTH = 5

/**
 * Build the combined, deduplicated union of `answers` + `validGuesses`
 * for a given practice length, tagged with one or both type markers.
 */
export function loadWordExplorerEntries(length: number): readonly WordExplorerEntry[] {
  const result = loadBundledWordList('practice', length)
  if (isLoadWordListFailure(result)) {
    return []
  }

  const byWord = new Map<string, Set<WordEntryType>>()
  for (const answer of result.wordList.answers) {
    const key = answer.word
    const existing = byWord.get(key) ?? new Set<WordEntryType>()
    existing.add('answer')
    byWord.set(key, existing)
  }

  for (const guess of result.wordList.validGuesses) {
    const existing = byWord.get(guess) ?? new Set<WordEntryType>()
    existing.add('valid-guess')
    byWord.set(guess, existing)
  }

  return [...byWord.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([word, types]) => ({ word, types }))
}

export interface WordExplorerFilter {
  readonly searchTerm: string
  readonly showAnswers: boolean
  readonly showValidGuesses: boolean
}

export type SortField = 'word' | 'type'
export type SortDirection = 'asc' | 'desc'

export interface WordExplorerSort {
  readonly field: SortField
  readonly direction: SortDirection
}

function matchesTypeFilter(entry: WordExplorerEntry, filter: WordExplorerFilter): boolean {
  if (filter.showAnswers && entry.types.has('answer')) {
    return true
  }
  if (filter.showValidGuesses && entry.types.has('valid-guess')) {
    return true
  }
  return false
}

function matchesSearchTerm(entry: WordExplorerEntry, searchTerm: string): boolean {
  const normalized = searchTerm.trim().toLocaleLowerCase('en-US')
  if (normalized.length === 0) {
    return true
  }
  return entry.word.toLocaleLowerCase('en-US').includes(normalized)
}

export function typeBadgeLabel(types: ReadonlySet<WordEntryType>): string {
  const labels: string[] = []
  if (types.has('answer')) {
    labels.push('Answer')
  }
  if (types.has('valid-guess')) {
    labels.push('Valid Guess')
  }
  return labels.join(' & ')
}

function compareEntries(a: WordExplorerEntry, b: WordExplorerEntry, sort: WordExplorerSort): number {
  if (sort.field === 'word') {
    const ordering = a.word < b.word ? -1 : a.word > b.word ? 1 : 0
    return sort.direction === 'asc' ? ordering : -ordering
  }

  const labelA = typeBadgeLabel(a.types)
  const labelB = typeBadgeLabel(b.types)
  const ordering = labelA < labelB ? -1 : labelA > labelB ? 1 : 0
  if (ordering !== 0) {
    return sort.direction === 'asc' ? ordering : -ordering
  }

  // Stable secondary sort by word so the order is deterministic.
  return a.word < b.word ? -1 : a.word > b.word ? 1 : 0
}

export function filterAndSortEntries(
  entries: readonly WordExplorerEntry[],
  filter: WordExplorerFilter,
  sort: WordExplorerSort,
): readonly WordExplorerEntry[] {
  const filtered = entries.filter((entry) => matchesTypeFilter(entry, filter) && matchesSearchTerm(entry, filter.searchTerm))
  return [...filtered].sort((a, b) => compareEntries(a, b, sort))
}

export function emptyStateMessage(searchTerm: string, length: number): string {
  return `"${searchTerm}" is not in the current ${length}-letter word list.`
}

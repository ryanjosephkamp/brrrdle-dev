import type { RemoteWordListMetadata, WordListMetadata } from './types'
import { BUNDLED_WORD_LISTS } from './wordLists'
import { validateWordListFile } from './wordListSchema'

export const BUNDLED_DATA_VERSION = 'seed-2026-05-25'

export const BUNDLED_METADATA = Object.values(BUNDLED_WORD_LISTS).flatMap((wordList) => {
  const validation = validateWordListFile(wordList)
  return validation.ok ? [validation.value.metadata] : []
}) satisfies readonly WordListMetadata[]

export const BUNDLED_REMOTE_METADATA: RemoteWordListMetadata = {
  version: BUNDLED_DATA_VERSION,
  generatedAt: '2026-05-25T00:00:00Z',
  lengths: BUNDLED_METADATA.map((metadata) => metadata.length),
}

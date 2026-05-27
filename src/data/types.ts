import type { GameMode, PlayScope } from '../game/types.js'

export interface WordDefinitionEntry {
  readonly partOfSpeech?: string
  readonly definition: string
  readonly source?: string
}

export interface WordEntry {
  readonly word: string
  readonly definitions?: readonly WordDefinitionEntry[]
}

export interface WordListMetadata {
  readonly length: number
  readonly source: string
  readonly version: string
  readonly generatedAt: string
}

export interface WordListFile {
  readonly metadata: WordListMetadata
  readonly answers: readonly WordEntry[]
  readonly validGuesses: readonly string[]
}

export interface NormalizedWordList {
  readonly metadata: WordListMetadata
  readonly answers: readonly WordEntry[]
  readonly validGuesses: ReadonlySet<string>
  readonly definitionsByWord: ReadonlyMap<string, readonly WordDefinitionEntry[]>
}

export interface WordListRequest {
  readonly mode: GameMode
  readonly scope: PlayScope
  readonly length: number
}

export interface RemoteWordListMetadata {
  readonly version: string
  readonly generatedAt: string
  readonly lengths: readonly number[]
}

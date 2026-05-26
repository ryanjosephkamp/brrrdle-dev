import { DAILY_WORD_LENGTH } from '../game/constants'
import type { GameMode, PlayScope } from '../game/types'
import type { LoadWordListFailure } from './loadWordList'
import { loadBundledWordList } from './loadWordList'
import type { NormalizedWordList, WordDefinitionEntry, WordEntry } from './types'

export interface WordRepositorySuccess {
  readonly ok: true
  readonly wordList: NormalizedWordList
  readonly answers: readonly WordEntry[]
  readonly validGuesses: ReadonlySet<string>
}

export type WordRepositoryResult = WordRepositorySuccess | LoadWordListFailure

export interface WordRepositoryRequest {
  readonly mode: GameMode
  readonly scope: PlayScope
  readonly length: number
}

export function getRequestedWordLength(scope: PlayScope, length: number): number {
  return scope === 'daily' ? DAILY_WORD_LENGTH : length
}

export function getWordRepository(request: WordRepositoryRequest): WordRepositoryResult {
  const wordList = loadBundledWordList(request.scope, getRequestedWordLength(request.scope, request.length))
  if (!wordList.ok) {
    return wordList
  }

  return {
    ok: true,
    wordList: wordList.wordList,
    answers: wordList.wordList.answers,
    validGuesses: wordList.wordList.validGuesses,
  }
}

export function getAnswerCandidates(request: WordRepositoryRequest): readonly WordEntry[] {
  const repository = getWordRepository(request)
  return repository.ok ? repository.answers : []
}

export function getValidGuesses(request: WordRepositoryRequest): ReadonlySet<string> {
  const repository = getWordRepository(request)
  return repository.ok ? repository.validGuesses : new Set()
}

export function getDefinitionsForWord(
  request: WordRepositoryRequest,
  word: string,
): readonly WordDefinitionEntry[] {
  const repository = getWordRepository(request)
  if (!repository.ok) {
    return []
  }

  return repository.wordList.definitionsByWord.get(word.trim().toLocaleLowerCase('en-US')) ?? []
}

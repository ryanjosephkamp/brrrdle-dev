import wordsLength2 from './bundled/words_length_2.json'
import wordsLength5 from './bundled/words_length_5.json'
import wordsLength35 from './bundled/words_length_35.json'

export const BUNDLED_WORD_LISTS = {
  2: wordsLength2,
  5: wordsLength5,
  35: wordsLength35,
} as const satisfies Readonly<Record<number, unknown>>

export const BUNDLED_WORD_LIST_LENGTHS = Object.keys(BUNDLED_WORD_LISTS).map(Number).sort((a, b) => a - b)

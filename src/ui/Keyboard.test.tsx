import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Keyboard } from './Keyboard'

describe('Keyboard', () => {
  it('exposes semantic letter states independently of presentation classes', () => {
    const html = renderToStaticMarkup(
      <Keyboard
        letterStates={{ a: 'absent', b: 'present', c: 'correct' }}
        onInput={() => undefined}
      />,
    )

    expect(html).toMatch(/aria-label="Enter A"[^>]*data-state="absent"/u)
    expect(html).toMatch(/aria-label="Enter B"[^>]*data-state="present"/u)
    expect(html).toMatch(/aria-label="Enter C"[^>]*data-state="correct"/u)
    expect(html).toMatch(/aria-label="Enter D"[^>]*data-state="unknown"/u)
  })
})

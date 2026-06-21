import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { AboutBrrrdlePanel, RANKED_ELO_ABOUT_SECTION_ID } from './App'

describe('AboutBrrrdlePanel', () => {
  it('contains the expanded ranked Elo explanation in a stable About anchor', () => {
    const html = renderToStaticMarkup(<AboutBrrrdlePanel />)

    expect(html).toContain(`id="${RANKED_ELO_ABOUT_SECTION_ID}"`)
    expect(html).toContain('How Elo is calculated')
    expect(html).toContain('Ranked Practice v1 is signed-in, untimed Practice only')
    expect(html).toContain('Every bucket starts at 1200')
    expect(html).toContain('K is the rating-movement multiplier')
    expect(html).toContain('first 10 ranked Practice games')
    expect(html).toContain('provisional and use K=40')
    expect(html).toContain('established games use K=24')
    expect(html).toContain('standard 400-point Elo curve')
    expect(html).toContain('Wins count as 1, draws count as 0.5, and losses count as 0')
    expect(html).toContain('Match points decide the match result first')
    expect(html).toContain('trusted settlement confirms durable ranked Practice evidence')
  })
})

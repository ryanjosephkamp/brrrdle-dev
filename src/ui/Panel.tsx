import type { HTMLAttributes, ReactNode } from 'react'
import { classNames } from './classNames'

type PanelTone = 'default' | 'accent' | 'muted' | 'danger'

interface PanelProps extends HTMLAttributes<HTMLElement> {
  readonly as?: 'article' | 'div' | 'header' | 'main' | 'section'
  readonly children: ReactNode
  readonly tone?: PanelTone
}

const toneClasses: Record<PanelTone, string> = {
  default: 'border-white/10 bg-slate-950/75 shadow-slate-950/40',
  accent: 'border-[var(--color-ice-300)]/40 bg-cyan-950/20 shadow-cyan-950/30',
  muted: 'border-slate-700/70 bg-slate-950/75 shadow-slate-950/30',
  danger: 'border-rose-300/30 bg-rose-950/20 shadow-rose-950/20',
}

export function Panel({ as: Component = 'section', children, className, tone = 'default', ...props }: PanelProps) {
  return (
    <Component className={classNames('min-w-0 rounded-lg border p-5 shadow-2xl backdrop-blur-xl sm:p-6', toneClasses[tone], className)} {...props}>
      {children}
    </Component>
  )
}

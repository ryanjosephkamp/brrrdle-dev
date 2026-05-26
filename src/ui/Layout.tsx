import type { ReactNode } from 'react'

interface LayoutProps {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly navigation: ReactNode
  readonly children: ReactNode
}

export function Layout({ eyebrow, title, description, navigation, children }: LayoutProps) {
  return (
    <div className="min-h-svh bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-3xl border border-cyan-300/20 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/40 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">{eyebrow}</p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
              <p className="text-base leading-7 text-slate-300">{description}</p>
            </div>
            {navigation}
          </div>
        </header>

        <main className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/40 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

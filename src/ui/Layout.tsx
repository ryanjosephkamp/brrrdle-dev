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
    <div className="brrrdle-command-shell min-h-svh min-h-dvh px-[max(1rem,env(safe-area-inset-left))] py-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-slate-100 sm:px-5 lg:px-8">
      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col gap-4">
        <header className="brrrdle-top-command rounded-lg border border-[var(--color-ice-300)]/25 bg-slate-950/75 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-5">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-[var(--color-ice-300)]/40 bg-[linear-gradient(135deg,rgb(8_47_73/0.95),rgb(15_23_42/0.8))] shadow-[0_0_40px_rgb(103_232_249/0.18)]">
                <span className="absolute inset-2 rounded-md border border-white/10" aria-hidden="true" />
                <span className="text-2xl font-black text-[var(--color-ice-100)]" aria-hidden="true">br</span>
              </div>
              <div className="min-w-0 space-y-2">
                <p className="text-xs font-semibold uppercase text-[var(--color-ice-200)]">{eyebrow}</p>
                <h1 className="text-balance text-4xl font-black text-white sm:text-5xl">{title}</h1>
                <p className="max-w-4xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
              </div>
            </div>
            {navigation}
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

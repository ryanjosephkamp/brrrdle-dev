import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AccountBadge, AuthModal, ProfilePanel, classifyAuthError, createBrrrdleSupabaseClient, createResumeSlot, createSyncStatus, describeResumeSlot, getCurrentAuthState, isCaptureInProgress, loadGuestProgress, normalizeResumeSlot, recordCompletedGame, sendPasswordResetEmail, resetGuestProgress, saveGuestProgress, sendMagicLink, Settings, signInWithPassword, signOut, signUpWithPassword, subscribeToAuthChanges, updateProfile, type AuthState, type CompletedGameInput, type ProfileAccentColor, type ResumeCapture, type ResumeSlot } from '../account'
import { BUNDLED_WORD_LIST_LENGTHS, type DifficultyTier } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH, type GoPuzzleCount } from '../game/constants'
import { Button, Layout, Navigation, Panel } from '../ui'
import { AdminPanel } from '../admin'
import { StatsDashboard } from '../stats'
import { WordExplorerPanel } from '../wordExplorer'
import { FeedbackPanel } from '../feedback'
import { SoundProvider, useSound } from '../sound'
import { applyTheme } from '../theme'
import { GoGame } from './games/GoGame'
import { OgGame } from './games/OgGame'
import { DEFAULT_ROUTE_ID, getPrimaryNavigationRoutes, getRouteById, getRoutesByGroup, type AppRoute } from './routes'

function ModeCard({ route, onSelect }: { readonly route: AppRoute; readonly onSelect: (route: AppRoute) => void }) {
  return (
    <button
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/75 p-5 text-left shadow-2xl shadow-slate-950/40 transition before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,var(--color-ice-300),transparent)] hover:border-[var(--color-ice-300)]/60 hover:bg-slate-900/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] motion-safe:hover:-translate-y-0.5"
      onClick={() => onSelect(route)}
      type="button"
    >
      <span className="text-xs font-semibold uppercase text-[var(--color-ice-200)]">{route.scope ?? 'support'}</span>
      <h2 className="mt-3 text-2xl font-black text-white">{route.label}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{route.description}</p>
      {route.wordLength ? (
        <p className="mt-4 text-sm font-semibold text-cyan-100">{route.wordLength} letters</p>
      ) : null}
    </button>
  )
}


function PracticeGameSwitcher({
  coins,
  defaultDifficulty,
  defaultGoPuzzleCount,
  initialResume,
  keyboardDisabled,
  onGameComplete,
  onResumeCapture,
  onSaveDifficultyDefault,
  onSaveGoPuzzleCountDefault,
  onSpendCoins,
}: {
  readonly coins: number
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly initialResume?: ResumeSlot
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onSaveDifficultyDefault: (tier: DifficultyTier) => void
  readonly onSaveGoPuzzleCountDefault: (count: GoPuzzleCount) => void
  readonly onSpendCoins: (amount: number) => boolean
}) {
  const resumeMode = initialResume?.scope === 'practice' ? initialResume.mode : undefined
  const [practiceMode, setPracticeMode] = useState<'og' | 'go'>(resumeMode ?? 'og')

  return (
    <section className="space-y-5" aria-label="Practice mode selector">
      <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-slate-950/75 p-2 shadow-inner shadow-white/5">
        <Button onClick={() => setPracticeMode('og')} variant={practiceMode === 'og' ? 'primary' : 'secondary'}>og practice</Button>
        <Button onClick={() => setPracticeMode('go')} variant={practiceMode === 'go' ? 'primary' : 'secondary'}>go practice</Button>
      </div>
      {practiceMode === 'og'
        ? <OgGame coins={coins} defaultDifficulty={defaultDifficulty} initialResume={initialResume?.scope === 'practice' && initialResume.mode === 'og' ? initialResume : undefined} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={onSaveDifficultyDefault} onSpendCoins={onSpendCoins} scope="practice" />
        : <GoGame coins={coins} defaultDifficulty={defaultDifficulty} defaultGoPuzzleCount={defaultGoPuzzleCount} initialResume={initialResume?.scope === 'practice' && initialResume.mode === 'go' ? initialResume : undefined} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={onSaveDifficultyDefault} onSaveGoPuzzleCountDefault={onSaveGoPuzzleCountDefault} onSpendCoins={onSpendCoins} scope="practice" />}
    </section>
  )
}

function HudCard({ children, className = '', title }: { readonly children: ReactNode; readonly className?: string; readonly title: string }) {
  return (
    <section className={`brrrdle-hud-card rounded-lg border border-white/10 bg-slate-950/75 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl ${className}`}>
      <h2 className="text-xs font-black uppercase text-[var(--color-ice-200)]">{title}</h2>
      {children}
    </section>
  )
}

function MetricTile({ label, value }: { readonly label: string; readonly value: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  )
}

function SystemLine({ label, value }: { readonly label: string; readonly value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm text-slate-300">{label}</span>
      <span className="text-right text-sm font-bold text-white">{value}</span>
    </div>
  )
}

function getAuthDisplay(authState: AuthState): string {
  if (authState.status === 'authenticated') {
    return 'Signed in'
  }

  if (authState.status === 'unconfigured') {
    return 'Local only'
  }

  return 'Guest'
}

function RoutePanel({
  route,
  keyboardDisabled,
  guestProgress,
  onGameComplete,
  authState,
  authMessage,
  onResetProgress,
  onResume,
  onResumeCapture,
  onSelectRoute,
  onSendMagicLink,
  onSignInWithPassword,
  onSignUpWithPassword,
  onSpendCoins,
  onSignOut,
  onOpenAuthModal,
  onOpenProfilePanel,
  pendingResume,
  resumeSlot,
  soundEnabled,
  onToggleSound,
  onUpdateSettings,
  supabaseClient,
  syncStatus,
}: {
  readonly authState: AuthState
  readonly authMessage?: string
  readonly guestProgress: ReturnType<typeof loadGuestProgress>
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onResetProgress: () => void
  readonly onResume: () => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onSendMagicLink: (email: string) => void
  readonly onSignInWithPassword: (email: string, password: string) => void
  readonly onSignUpWithPassword: (email: string, password: string) => void
  readonly onSignOut: () => void
  readonly onOpenAuthModal: () => void
  readonly onOpenProfilePanel: () => void
  readonly pendingResume?: ResumeSlot
  readonly resumeSlot?: ResumeSlot
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRoute['id']) => void
  readonly soundEnabled: boolean
  readonly onToggleSound: (enabled: boolean) => void
  readonly onUpdateSettings: (patch: Partial<ReturnType<typeof loadGuestProgress>['settings']>) => void
  readonly supabaseClient: ReturnType<typeof createBrrrdleSupabaseClient>
  readonly syncStatus: ReturnType<typeof createSyncStatus>
  readonly onSpendCoins: (amount: number) => boolean
}) {
  if (route.id === 'home') {
    return (
      <div className="space-y-4">
        {resumeSlot ? (
          <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" tone="muted">
            <div>
              <p className="text-sm font-semibold uppercase text-[var(--color-ice-200)]">Pick up where you left off</p>
              <p className="mt-1 text-base text-slate-200">You have an unfinished game in progress.</p>
            </div>
            <Button onClick={onResume} variant="primary">{describeResumeSlot(resumeSlot)}</Button>
          </Panel>
        ) : null}
        <div className="grid gap-4 md:grid-cols-3">
          {getRoutesByGroup('play')
            .filter((playRoute) => playRoute.id !== 'home')
            .map((playRoute) => (
              <ModeCard key={playRoute.id} onSelect={(selectedRoute) => onSelectRoute(selectedRoute.id)} route={playRoute} />
            ))}
        </div>
      </div>
    )
  }

  if (route.id === 'og-daily') {
    return <OgGame coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'go-daily') {
    return <GoGame coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'practice') {
    return <PracticeGameSwitcher coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault} initialResume={pendingResume} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })} onSpendCoins={onSpendCoins} />
  }

  if (route.id === 'word-explorer') {
    return <WordExplorerPanel />
  }

  if (route.id === 'feedback') {
    return <FeedbackPanel />
  }

  if (route.id === 'stats') {
    return <StatsDashboard history={guestProgress.history} progression={guestProgress.progression} stats={guestProgress.stats} />
  }

  if (route.id === 'settings') {
    return (
      <Settings
        authMessage={authMessage}
        authState={authState}
        guestProgress={guestProgress}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfilePanel={onOpenProfilePanel}
        onResetProgress={onResetProgress}
        onSendMagicLink={onSendMagicLink}
        onSignInWithPassword={onSignInWithPassword}
        onSignOut={onSignOut}
        onSignUpWithPassword={onSignUpWithPassword}
        onToggleSound={onToggleSound}
        onUpdateSettings={onUpdateSettings}
        soundEnabled={soundEnabled}
        syncStatus={syncStatus}
      />
    )
  }

  if (route.id === 'admin') {
    return <AdminPanel authState={authState} supabaseClient={supabaseClient} />
  }

  return (
    <section className="space-y-4" aria-labelledby="route-title">
      <p className="text-sm font-semibold uppercase text-[var(--color-ice-200)]">{route.navigationGroup}</p>
      <h2 id="route-title" className="text-3xl font-bold text-white">{route.label}</h2>
      <p className="max-w-3xl text-base leading-7 text-slate-300">{route.description}</p>
      <Panel className="text-sm leading-6 text-slate-300" tone="muted">
        <p>
          This route is ready for later gameplay, definitions, persistence, account, and admin phases. No unfinished game behavior is exposed in Phase 3.3.
        </p>
      </Panel>
    </section>
  )
}

function App() {
  return (
    <SoundProvider>
      <AppInner />
    </SoundProvider>
  )
}

function AppInner() {
  const sound = useSound()
  const [activeRouteId, setActiveRouteId] = useState(DEFAULT_ROUTE_ID)
  const [guestProgress, setGuestProgress] = useState(() => loadGuestProgress())
  const supabaseClient = useMemo(() => createBrrrdleSupabaseClient(), [])
  const [authState, setAuthState] = useState<AuthState>(() => supabaseClient ? { status: 'anonymous' } : { status: 'unconfigured' })
  const [authMessage, setAuthMessage] = useState<string | undefined>(undefined)
  const [authBusy, setAuthBusy] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [profilePanelOpen, setProfilePanelOpen] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | undefined>(undefined)
  const [profileBusy, setProfileBusy] = useState(false)
  const [syncStatus] = useState(() => createSyncStatus(supabaseClient ? 'idle' : 'error'))
  const [pendingResume, setPendingResume] = useState<ResumeSlot | undefined>(undefined)
  const autoResumedRef = useRef(false)
  const guestProgressRef = useRef(guestProgress)
  const activeRoute = getRouteById(activeRouteId)
  const resumeSlot = useMemo(() => normalizeResumeSlot(guestProgress.resumeSlot), [guestProgress.resumeSlot])
  const navigationRoutes = useMemo(() => getPrimaryNavigationRoutes(authState.user?.roles.includes('admin') ?? false), [authState.user?.roles])
  const handleNavigate = useCallback((routeId: AppRoute['id']) => {
    setPendingResume(undefined)
    setActiveRouteId(routeId)
  }, [])
  const handleResumeCapture = useCallback((capture: ResumeCapture) => {
    setGuestProgress((currentProgress) => {
      const currentSlot = currentProgress.resumeSlot
      if (isCaptureInProgress(capture)) {
        const nextSlot = createResumeSlot(capture)
        if (currentSlot && currentSlot.mode === nextSlot.mode && currentSlot.scope === nextSlot.scope && JSON.stringify(currentSlot.serializedSession) === JSON.stringify(nextSlot.serializedSession)) {
          return currentProgress
        }
        const nextProgress = { ...currentProgress, resumeSlot: nextSlot }
        saveGuestProgress(nextProgress)
        return nextProgress
      }
      // Not in progress: only clear the slot it corresponds to (same mode/scope/length),
      // so peeking at an unrelated finished game never wipes a real resume slot.
      const matchesTrackedGame = currentSlot
        && currentSlot.mode === capture.mode
        && currentSlot.scope === capture.scope
        && currentSlot.wordLength === capture.wordLength
      if (!matchesTrackedGame) {
        return currentProgress
      }
      const nextProgress = { ...currentProgress, resumeSlot: undefined }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const handleResume = useCallback(() => {
    const slot = normalizeResumeSlot(guestProgress.resumeSlot)
    if (!slot) {
      return
    }
    if (slot.scope === 'practice') {
      setPendingResume(slot)
      setActiveRouteId('practice')
      return
    }
    setPendingResume(undefined)
    setActiveRouteId(slot.mode === 'og' ? 'og-daily' : 'go-daily')
  }, [guestProgress.resumeSlot])
  // Auto-resume the most recent unfinished game once per signed-in load (spec §2).
  // Called from async auth callbacks (not synchronously in an effect body).
  const maybeAutoResume = useCallback((nextAuthState: AuthState) => {
    if (nextAuthState.status !== 'authenticated' || autoResumedRef.current) {
      return
    }
    const slot = normalizeResumeSlot(guestProgressRef.current.resumeSlot)
    if (!slot) {
      return
    }
    autoResumedRef.current = true
    if (slot.scope === 'practice') {
      setPendingResume(slot)
      setActiveRouteId('practice')
    } else {
      setActiveRouteId(slot.mode === 'og' ? 'og-daily' : 'go-daily')
    }
  }, [])
  const handleGameComplete = useCallback((input: CompletedGameInput) => {
    setGuestProgress((currentProgress) => {
      const nextProgress = recordCompletedGame(input, currentProgress)
      if (nextProgress !== currentProgress) {
        saveGuestProgress(nextProgress)
      }
      return nextProgress
    })
    if (input.status === 'won') {
      sound.play('game-over-win')
    } else if (input.status === 'lost') {
      sound.play('game-over-loss')
    }
  }, [sound])
  const handleResetProgress = useCallback(() => {
    setGuestProgress(resetGuestProgress())
  }, [])
  const handleUpdateSettings = useCallback((patch: Partial<ReturnType<typeof loadGuestProgress>['settings']>) => {
    setGuestProgress((currentProgress) => {
      const nextSettings = { ...currentProgress.settings, ...patch }
      const nextProgress = { ...currentProgress, settings: nextSettings }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const handleSpendCoins = useCallback((amount: number) => {
    if (guestProgress.progression.coins < amount) {
      return false
    }

    const nextProgress = {
      ...guestProgress,
      progression: {
        ...guestProgress.progression,
        coins: guestProgress.progression.coins - amount,
      },
    }
    saveGuestProgress(nextProgress)
    setGuestProgress(nextProgress)
    return true
  }, [guestProgress])
  const handleSendMagicLink = useCallback((email: string) => {
    if (!supabaseClient || !email.trim()) {
      return
    }
    setAuthMessage(undefined)
    setAuthBusy(true)
    void sendMagicLink(supabaseClient, email).then((result) => {
      setAuthBusy(false)
      setAuthMessage(result.ok ? 'Magic link sent. Check your email.' : classifyAuthError({ message: result.message }, 'magic-link'))
    })
  }, [supabaseClient])
  const handleSignInWithPassword = useCallback((email: string, password: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    setAuthBusy(true)
    void signInWithPassword(supabaseClient, email, password).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
      }
    })
  }, [supabaseClient])
  const handleSignUpWithPassword = useCallback((email: string, password: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    setAuthBusy(true)
    void signUpWithPassword(supabaseClient, email, password).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
      } else {
        setAuthMessage('Check your email to confirm your account, if email confirmation is enabled.')
      }
    })
  }, [supabaseClient])
  const handleRequestPasswordReset = useCallback((email: string) => {
    if (!supabaseClient) {
      return
    }
    setAuthMessage(undefined)
    setAuthBusy(true)
    void sendPasswordResetEmail(supabaseClient, email).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
      } else {
        setAuthMessage('Check your email for a reset link.')
      }
    })
  }, [supabaseClient])
  const handleSignOut = useCallback(() => {
    if (!supabaseClient || authBusy) {
      return
    }

    setAuthMessage(undefined)
    setProfileMessage(undefined)
    setAuthBusy(true)
    void signOut(supabaseClient).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setAuthMessage(result.message)
        setProfileMessage(result.message)
        return
      }

      setAuthState({ status: 'anonymous' })
      setAuthModalOpen(false)
      setProfilePanelOpen(false)
    })
  }, [authBusy, supabaseClient])
  const handleOpenAuthModal = useCallback(() => {
    setAuthMessage(undefined)
    setAuthModalOpen(true)
  }, [])
  const handleCloseAuthModal = useCallback(() => {
    setAuthModalOpen(false)
  }, [])
  const handleOpenProfilePanel = useCallback(() => {
    setProfileMessage(undefined)
    setProfilePanelOpen(true)
  }, [])
  const handleCloseProfilePanel = useCallback(() => {
    setProfilePanelOpen(false)
  }, [])
  const handleSaveProfile = useCallback(async (input: { readonly displayName?: string; readonly accentColor?: ProfileAccentColor; readonly avatarUrl?: string }) => {
    if (!supabaseClient) {
      return
    }
    setProfileMessage(undefined)
    setProfileBusy(true)
    const result = await updateProfile(supabaseClient, input)
    setProfileBusy(false)
    if (!result.ok) {
      setProfileMessage(result.message)
      return
    }
    setProfileMessage('Profile saved.')
    // Re-derive AuthState so the new metadata flows to AccountBadge immediately.
    const fresh = await getCurrentAuthState(supabaseClient)
    setAuthState(fresh)
    setProfilePanelOpen(false)
  }, [supabaseClient])

  useEffect(() => {
    guestProgressRef.current = guestProgress
  }, [guestProgress])

  useEffect(() => {
    applyTheme(guestProgress.settings.themeDefault)
  }, [guestProgress.settings.themeDefault])

  useEffect(() => {
    let isMounted = true
    void getCurrentAuthState(supabaseClient).then((nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
        maybeAutoResume(nextAuthState)
      }
    })
    const subscription = subscribeToAuthChanges(supabaseClient, (nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
        maybeAutoResume(nextAuthState)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [maybeAutoResume, supabaseClient])

  return (
    <Layout
      description="Polar-night word missions with daily runs, practice chains, stats, and sync."
      eyebrow="Arctic word command"
      navigation={(
        <div className="flex flex-col gap-3 lg:items-end">
          <AccountBadge authState={authState} onOpenAuthModal={handleOpenAuthModal} onOpenProfile={handleOpenProfilePanel} />
          <Navigation activeRouteId={activeRoute.id} onNavigate={handleNavigate} routes={navigationRoutes} />
        </div>
      )}
      title="brrrdle"
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)_minmax(12rem,16rem)] xl:items-start">
        <aside aria-label="Mission status" className="order-2 grid gap-4 md:grid-cols-2 xl:order-1 xl:grid-cols-1">
          <HudCard title="Daily Challenge">
            <div className="mt-4 grid gap-3">
              <MetricTile label="og and go" value={`${DAILY_WORD_LENGTH} letters`} />
              <MetricTile label="practice" value={`${MIN_PRACTICE_WORD_LENGTH}-${MAX_PRACTICE_WORD_LENGTH} letters`} />
              <MetricTile label="go chain" value={`${guestProgress.settings.goPuzzleCountDefault} boards`} />
            </div>
          </HudCard>

          <HudCard title="Word Banks">
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Seeded dictionaries are loaded across {BUNDLED_WORD_LIST_LENGTHS.length} supported lengths.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {BUNDLED_WORD_LIST_LENGTHS.slice(0, 12).map((length) => (
                <span key={length} className="rounded-md border border-[var(--color-ice-300)]/25 bg-cyan-300/10 px-2 py-1 text-xs font-bold text-cyan-100">
                  {length}
                </span>
              ))}
              {BUNDLED_WORD_LIST_LENGTHS.length > 12 ? (
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs font-bold text-slate-300">
                  +{BUNDLED_WORD_LIST_LENGTHS.length - 12}
                </span>
              ) : null}
            </div>
          </HudCard>

          <HudCard title="About Brrrdle">
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Daily og, go chains, practice ladders, definitions, stats, and local-first progress in one frozen word game.
            </p>
          </HudCard>
        </aside>

        <section aria-labelledby="active-route-title" className="brrrdle-play-bay order-1 rounded-lg border border-[var(--color-ice-300)]/25 bg-slate-950/70 p-4 shadow-[0_0_80px_rgb(8_145_178/0.18)] backdrop-blur-xl md:p-5 xl:order-2">
          <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-[var(--color-ice-200)]">Active Mission</p>
              <h2 id="active-route-title" className="mt-1 text-3xl font-black text-white">{activeRoute.label}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{activeRoute.description}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-[var(--color-ice-300)]/30 bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-100">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--color-ice-300)] shadow-[0_0_12px_var(--color-ice-300)]" />
              Live
            </span>
          </div>

          <RoutePanel
            authMessage={authMessage}
            authState={authState}
            guestProgress={guestProgress}
            onGameComplete={handleGameComplete}
            onOpenAuthModal={handleOpenAuthModal}
            onOpenProfilePanel={handleOpenProfilePanel}
            onResetProgress={handleResetProgress}
            onResume={handleResume}
            onResumeCapture={handleResumeCapture}
            onSelectRoute={handleNavigate}
            onSendMagicLink={handleSendMagicLink}
            onSignInWithPassword={handleSignInWithPassword}
            onSignOut={handleSignOut}
            onSignUpWithPassword={handleSignUpWithPassword}
            onSpendCoins={handleSpendCoins}
            onToggleSound={sound.setEnabled}
            onUpdateSettings={handleUpdateSettings}
            pendingResume={pendingResume}
            resumeSlot={resumeSlot}
            route={activeRoute}
            soundEnabled={sound.enabled}
            supabaseClient={supabaseClient}
            syncStatus={syncStatus}
          />
        </section>

        <aside aria-label="System status" className="order-3 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          <HudCard title="Pilot Profile">
            <div className="mt-4 grid grid-cols-2 gap-3">
              <MetricTile label="level" value={guestProgress.progression.level} />
              <MetricTile label="xp" value={guestProgress.progression.xp} />
              <MetricTile label="coins" value={guestProgress.progression.coins} />
              <MetricTile label="games" value={guestProgress.history.length} />
            </div>
          </HudCard>

          <HudCard title="Systems">
            <div className="mt-2">
              <SystemLine label="Account" value={getAuthDisplay(authState)} />
              <SystemLine label="Sync" value={syncStatus.kind} />
              <SystemLine label="Sound" value={sound.enabled ? 'On' : 'Off'} />
              <SystemLine label="Hard mode" value={guestProgress.settings.hardModeDefault ? 'On' : 'Off'} />
              <SystemLine label="Theme" value={guestProgress.settings.themeDefault} />
            </div>
          </HudCard>

          <HudCard title="Resume">
            <p className="mt-4 text-sm leading-6 text-slate-300">
              {resumeSlot ? 'An unfinished game is ready.' : 'No unfinished game is parked.'}
            </p>
            {resumeSlot ? (
              <Button className="mt-4 w-full" onClick={handleResume} variant="primary">{describeResumeSlot(resumeSlot)}</Button>
            ) : null}
          </HudCard>
        </aside>
      </div>

      <AuthModal
        authenticated={authState.status === 'authenticated'}
        authMessage={authMessage}
        busy={authBusy}
        isOpen={authModalOpen}
        onClose={handleCloseAuthModal}
        onRequestPasswordReset={handleRequestPasswordReset}
        onSendMagicLink={handleSendMagicLink}
        onSignInWithPassword={handleSignInWithPassword}
        onSignUpWithPassword={handleSignUpWithPassword}
      />

      <ProfilePanel
        authState={authState}
        busy={profileBusy}
        isOpen={profilePanelOpen}
        onClose={handleCloseProfilePanel}
        onSave={handleSaveProfile}
        onSignOut={handleSignOut}
        statusMessage={profileMessage}
        supabaseClient={supabaseClient}
      />
    </Layout>
  )
}

export default App

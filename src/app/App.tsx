import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AccountBadge, AuthModal, PasswordResetModal, ProfilePanel, advancePracticeSeedState, classifyAuthError, clearPasswordResetUrlMarker, createBrrrdleSupabaseClient, createResumeSlot, createSupabaseProgressRepository, createSyncStatus, getCurrentAuthState, getLatestResumeSlot, getResumeSlotKey, isCaptureInProgress, isPasswordResetUrl, loadGuestProgress, normalizeGuestSettings, normalizeResumeSlots, recordCompletedGame, sendPasswordResetEmail, resetGuestProgress, saveGuestProgress, sendMagicLink, Settings, signInWithPassword, signOut, signUpWithPassword, subscribeToAuthChanges, syncGuestProgress, updatePassword, updateProfile, type AuthState, type CompletedGameInput, type PracticeSeedState, type ProfileAccentColor, type ResumeCapture, type ResumeSlot, type ResumeSlotCollection } from '../account'
import { BUNDLED_WORD_LIST_LENGTHS, type DifficultyTier } from '../data'
import { DAILY_WORD_LENGTH, MAX_PRACTICE_WORD_LENGTH, MIN_PRACTICE_WORD_LENGTH, type GoPuzzleCount } from '../game/constants'
import { Button, Panel } from '../ui'
import { AdminPanel } from '../admin'
import { StatsDashboard } from '../stats'
import { WordExplorerPanel } from '../wordExplorer'
import { FeedbackPanel } from '../feedback'
import { SoundProvider, useSound } from '../sound'
import { DailyCountdown, MULTIPLAYER_DAILY_VARIANT, SimulateTimePanel, useDailyCycle } from '../daily'
import { applySurfaceTheme, applyTheme, DEFAULT_SURFACE_THEME, getThemeMeta, isTheme, THEMES, type Theme } from '../theme'
import {
  DashboardHome,
  createDashboardViewModel,
  dispatchDashboardAction,
  type DashboardActionHandlers,
  type DashboardActionTarget,
  type DashboardViewModel,
} from '../dashboard'
import {
  activateNotificationItem,
  createNotificationViewModel,
  dismissNotificationItem,
  getNotificationSoundFingerprints,
  loadNotificationMetadata,
  markNotificationItemRead,
  NotificationCenter,
  saveNotificationMetadata,
  selectNotificationSoundDecision,
  type NotificationItemViewModel,
  type NotificationMetadataState,
} from '../notifications'
import {
  createLocalStorageMultiplayerRepository,
  loadAuthenticatedLiveSpectatorRows,
  createMultiplayerProfileSummary,
  createSupabaseMultiplayerRepository,
  expireStaleDailyMultiplayerGames,
  expireTimedOutPracticeMultiplayerGames,
  loadMultiplayerState,
  normalizeCompetitiveMultiplayerState,
  saveMultiplayerState,
  settleMultiplayerStateResults,
  MultiplayerPanel,
  MultiplayerWorkspace,
  type MultiplayerRepository,
  type MultiplayerState,
  type MultiplayerProfileSummary,
  type MultiplayerCompetitiveState,
  type AuthenticatedLiveSpectatorGame,
} from '../multiplayer'
import { GoGame } from './games/GoGame'
import { OgGame } from './games/OgGame'
import { CalendarPanel, type CalendarLaunchRequest } from '../calendar'
import { HistoryWorkspace } from '../history/HistoryWorkspace'
import { SoloWorkspace } from '../solo/SoloWorkspace'
import { isSoloActiveGameKey, type SoloActiveGameKey, type SoloMode, type SoloScope } from '../solo/soloViewModels'
import { createRouteAttentionMap, createWorkspaceAttentionMap, type WorkspaceAttentionMap } from './attentionViewModels'
import { LunarSignalStage } from './LunarSignalStage'
import { getPrimaryNavigationRoutes, getRouteById, type AppRoute, type AppRouteId } from './routes'
import { loadNavigationState, saveNavigationState, type HistoryFilters, type LegacyPracticeMode, type MultiplayerSubtabId, type SoloSubtabId } from './navigationState'

type PracticeMode = LegacyPracticeMode

function isSameResumeSlot(left: ResumeSlot | undefined, right: ResumeSlot): boolean {
  if (!left) {
    return false
  }

  return left.difficulty === right.difficulty
    && left.mode === right.mode
    && left.scope === right.scope
    && left.wordLength === right.wordLength
    && (left.mode !== 'go' || (right.mode === 'go' && left.goPuzzleCount === right.goPuzzleCount))
    && JSON.stringify(left.serializedSession) === JSON.stringify(right.serializedSession)
}

function PracticeGameSwitcher({
  multiplayer,
  coins,
  competitiveMultiplayer,
  defaultDifficulty,
  defaultGoPuzzleCount,
  defaultHardMode,
  keyboardDisabled,
  onMultiplayerChange,
  onCompetitiveMultiplayerChange,
  onGameComplete,
  onPracticeModeChange,
  onPracticeSeedAdvance,
  onResumeCapture,
  onSaveDifficultyDefault,
  onSaveGoPuzzleCountDefault,
  onSpendCoins,
  practiceMode,
  practiceSeeds,
  resumeSlots,
  authStatus,
  viewerUserId,
  viewerProfile,
}: {
  readonly authStatus: AuthState['status']
  readonly multiplayer?: MultiplayerState
  readonly coins: number
  readonly competitiveMultiplayer?: MultiplayerCompetitiveState
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly defaultHardMode: boolean
  readonly keyboardDisabled?: boolean
  readonly onMultiplayerChange: (state: MultiplayerState) => void
  readonly onCompetitiveMultiplayerChange: (state: MultiplayerCompetitiveState) => void
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onPracticeModeChange: (mode: PracticeMode) => void
  readonly onPracticeSeedAdvance: (mode: PracticeMode) => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onSaveDifficultyDefault: (tier: DifficultyTier) => void
  readonly onSaveGoPuzzleCountDefault: (count: GoPuzzleCount) => void
  readonly onSpendCoins: (amount: number) => boolean
  readonly practiceMode: PracticeMode
  readonly practiceSeeds: PracticeSeedState
  readonly resumeSlots: ResumeSlotCollection
  readonly viewerUserId?: string
  readonly viewerProfile?: MultiplayerProfileSummary
}) {
  const practiceOgResume = resumeSlots['practice-og']
  const practiceGoResume = resumeSlots['practice-go']

  return (
    <section className="space-y-5" aria-label="Practice mode selector">
      <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-slate-950/75 p-2 shadow-inner shadow-white/5">
        <Button onClick={() => onPracticeModeChange('og')} variant={practiceMode === 'og' ? 'primary' : 'secondary'}>og practice</Button>
        <Button onClick={() => onPracticeModeChange('go')} variant={practiceMode === 'go' ? 'primary' : 'secondary'}>go practice</Button>
      </div>
      {practiceMode === 'og'
        ? <OgGame coins={coins} defaultDifficulty={defaultDifficulty} defaultHardMode={defaultHardMode} initialResume={practiceOgResume?.mode === 'og' ? practiceOgResume : undefined} keyboardDisabled={keyboardDisabled} onAdvancePracticeSeed={() => onPracticeSeedAdvance('og')} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={onSaveDifficultyDefault} onSpendCoins={onSpendCoins} practiceSeedCounter={practiceSeeds.og} practiceSeedUserId={viewerUserId} scope="practice" />
        : <GoGame coins={coins} defaultDifficulty={defaultDifficulty} defaultGoPuzzleCount={defaultGoPuzzleCount} defaultHardMode={defaultHardMode} initialResume={practiceGoResume?.mode === 'go' ? practiceGoResume : undefined} keyboardDisabled={keyboardDisabled} onAdvancePracticeSeed={() => onPracticeSeedAdvance('go')} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={onSaveDifficultyDefault} onSaveGoPuzzleCountDefault={onSaveGoPuzzleCountDefault} onSpendCoins={onSpendCoins} practiceSeedCounter={practiceSeeds.go} practiceSeedUserId={viewerUserId} scope="practice" />}
      <MultiplayerPanel
        authStatus={authStatus}
        competitiveState={competitiveMultiplayer}
        defaultDifficulty={defaultDifficulty}
        defaultGoPuzzleCount={defaultGoPuzzleCount}
        onChange={onMultiplayerChange}
        onCompetitiveChange={onCompetitiveMultiplayerChange}
        scope="practice"
        state={multiplayer}
        viewerProfile={viewerProfile}
        viewerUserId={viewerUserId}
      />
    </section>
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

function AboutBrrrdlePanel() {
  return (
    <section className="space-y-5" aria-labelledby="about-brrrdle-title">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">About</p>
        <h2 id="about-brrrdle-title" className="text-3xl font-bold text-white">About Brrrdle</h2>
        <p className="max-w-3xl text-base leading-7 text-slate-300">
          Brrrdle is a word-game playground built around og single boards, go chains, daily puzzles, and wide-range practice lengths.
        </p>
      </div>

      <Panel className="grid gap-4 text-sm leading-6 text-slate-300 md:grid-cols-3" tone="muted">
        <div>
          <p className="font-semibold text-cyan-100">Game modes</p>
          <p>OG plays one board at a time, while GO links multiple boards into a chain across Solo and Multiplayer.</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">Word lists</p>
          <p>Answer banks, valid guesses, difficulty tiers, and definitions are bundled into the local word library.</p>
        </div>
        <div>
          <p className="font-semibold text-cyan-100">Credits</p>
          <p>Release notes, design notes, feedback, and account controls live in their dedicated workspaces.</p>
        </div>
      </Panel>
    </section>
  )
}

function RoutePanel({
  dashboard,
  route,
  keyboardDisabled,
  multiplayer,
  liveSpectatorRows,
  guestProgress,
  onGameComplete,
  onMultiplayerChange,
  onCompetitiveMultiplayerChange,
  authState,
  authMessage,
  onResetProgress,
  onResumeCapture,
  onDashboardAction,
  onSelectRoute,
  onSelectSoloGame,
  onSelectMultiplayerGame,
  onSoloDailyModeChange,
  onOpenSoloHistory,
  onOpenMultiplayerHistory,
  onHistoryFiltersChange,
  onResumeSoloGame,
  onResumeMultiplayerGame,
  onSoloSubtabChange,
  onMultiplayerSubtabChange,
  onSendMagicLink,
  onRequestPasswordReset,
  onSignInWithPassword,
  onSignUpWithPassword,
  onSpendCoins,
  onSignOut,
  onOpenAuthModal,
  onOpenProfilePanel,
  onPracticeModeChange,
  onPracticeSeedAdvance,
  practiceMode,
  soloDailyMode,
  soloSubtab,
  selectedSoloGameKey,
  selectedMultiplayerGameId,
  multiplayerSubtab,
  historyFilters,
  resumeSlots,
  soundEnabled,
  onToggleSound,
  onUpdateSettings,
  supabaseClient,
  syncStatus,
  workspaceAttention,
  todayDateKey,
  multiplayerDailyDateKey,
  onMarkPastDailyUnlocked,
  calendarLaunch,
  onCalendarLaunchConsumed,
}: {
  readonly authState: AuthState
  readonly authMessage?: string
  readonly dashboard: DashboardViewModel
  readonly multiplayer: MultiplayerState
  readonly liveSpectatorRows: readonly AuthenticatedLiveSpectatorGame[]
  readonly guestProgress: ReturnType<typeof loadGuestProgress>
  readonly keyboardDisabled?: boolean
  readonly onGameComplete: (input: CompletedGameInput) => void
  readonly onMultiplayerChange: (state: MultiplayerState) => void
  readonly onCompetitiveMultiplayerChange: (state: MultiplayerCompetitiveState) => void
  readonly onDashboardAction: (target: DashboardActionTarget) => void
  readonly onResetProgress: () => void
  readonly onResumeCapture: (capture: ResumeCapture) => void
  readonly onPracticeModeChange: (mode: PracticeMode) => void
  readonly onPracticeSeedAdvance: (mode: PracticeMode) => void
  readonly onSelectSoloGame: (key: SoloActiveGameKey) => void
  readonly onSelectMultiplayerGame: (id: string) => void
  readonly onSoloDailyModeChange: (mode: SoloMode) => void
  readonly onOpenSoloHistory: (filters?: { readonly mode?: SoloMode; readonly scope?: SoloScope }) => void
  readonly onOpenMultiplayerHistory: () => void
  readonly onHistoryFiltersChange: (filters: HistoryFilters) => void
  readonly onResumeSoloGame: (key: SoloActiveGameKey) => void
  readonly onResumeMultiplayerGame: (id: string) => void
  readonly onSendMagicLink: (email: string) => void
  readonly onRequestPasswordReset: (email: string) => void
  readonly onSignInWithPassword: (email: string, password: string) => void
  readonly onSignUpWithPassword: (email: string, password: string) => void
  readonly onSignOut: () => void
  readonly onOpenAuthModal: () => void
  readonly onOpenProfilePanel: () => void
  readonly practiceMode: PracticeMode
  readonly soloDailyMode: SoloMode
  readonly selectedSoloGameKey?: SoloActiveGameKey
  readonly selectedMultiplayerGameId?: string
  readonly resumeSlots: ResumeSlotCollection
  readonly route: AppRoute
  readonly onSelectRoute: (routeId: AppRouteId) => void
  readonly soloSubtab: SoloSubtabId
  readonly multiplayerSubtab: MultiplayerSubtabId
  readonly historyFilters: ReturnType<typeof loadNavigationState>['historyFilters']
  readonly onSoloSubtabChange: (subtab: SoloSubtabId) => void
  readonly onMultiplayerSubtabChange: (subtab: MultiplayerSubtabId) => void
  readonly soundEnabled: boolean
  readonly onToggleSound: (enabled: boolean) => void
  readonly onUpdateSettings: (patch: Partial<ReturnType<typeof loadGuestProgress>['settings']>) => void
  readonly supabaseClient: ReturnType<typeof createBrrrdleSupabaseClient>
  readonly syncStatus: ReturnType<typeof createSyncStatus>
  readonly workspaceAttention: WorkspaceAttentionMap
  readonly onSpendCoins: (amount: number) => boolean
  readonly todayDateKey: string
  readonly multiplayerDailyDateKey: string
  readonly onMarkPastDailyUnlocked: (mode: 'og' | 'go', dateKey: string) => void
  readonly calendarLaunch: CalendarLaunchRequest | null
  readonly onCalendarLaunchConsumed: () => void
}) {
  const viewerProfile = authState.status === 'authenticated' && authState.user?.profile
    ? createMultiplayerProfileSummary(authState.user.profile, 'Player')
    : undefined
  const renderSoloDailyGame = (mode: SoloMode) => mode === 'og'
    ? (
      <OgGame
        coins={guestProgress.progression.coins}
        defaultDifficulty={guestProgress.settings.difficultyDefault}
        defaultHardMode={guestProgress.settings.hardModeDefault}
        keyboardDisabled={keyboardDisabled}
        onGameComplete={onGameComplete}
        onResumeCapture={onResumeCapture}
        onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })}
        onSpendCoins={onSpendCoins}
        scope="daily"
      />
    )
    : (
      <GoGame
        coins={guestProgress.progression.coins}
        defaultDifficulty={guestProgress.settings.difficultyDefault}
        defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault}
        defaultHardMode={guestProgress.settings.hardModeDefault}
        keyboardDisabled={keyboardDisabled}
        onGameComplete={onGameComplete}
        onResumeCapture={onResumeCapture}
        onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })}
        onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })}
        onSpendCoins={onSpendCoins}
        scope="daily"
      />
    )
  const renderSoloPracticeGame = (mode: SoloMode) => mode === 'og'
    ? (
      <OgGame
        coins={guestProgress.progression.coins}
        defaultDifficulty={guestProgress.settings.difficultyDefault}
        defaultHardMode={guestProgress.settings.hardModeDefault}
        initialResume={resumeSlots['practice-og']?.mode === 'og' ? resumeSlots['practice-og'] : undefined}
        keyboardDisabled={keyboardDisabled}
        onAdvancePracticeSeed={() => onPracticeSeedAdvance('og')}
        onGameComplete={onGameComplete}
        onResumeCapture={onResumeCapture}
        onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })}
        onSpendCoins={onSpendCoins}
        practiceSeedCounter={guestProgress.practiceSeeds.og}
        practiceSeedUserId={authState.user?.id}
        scope="practice"
      />
    )
    : (
      <GoGame
        coins={guestProgress.progression.coins}
        defaultDifficulty={guestProgress.settings.difficultyDefault}
        defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault}
        defaultHardMode={guestProgress.settings.hardModeDefault}
        initialResume={resumeSlots['practice-go']?.mode === 'go' ? resumeSlots['practice-go'] : undefined}
        keyboardDisabled={keyboardDisabled}
        onAdvancePracticeSeed={() => onPracticeSeedAdvance('go')}
        onGameComplete={onGameComplete}
        onResumeCapture={onResumeCapture}
        onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })}
        onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })}
        onSpendCoins={onSpendCoins}
        practiceSeedCounter={guestProgress.practiceSeeds.go}
        practiceSeedUserId={authState.user?.id}
        scope="practice"
      />
    )
  const renderMultiplayerPanel = (scope: 'daily' | 'practice') => (
    <MultiplayerPanel
      authStatus={authState.status}
      competitiveState={guestProgress.competitiveMultiplayer}
      dailyDateKey={scope === 'daily' ? multiplayerDailyDateKey : undefined}
      defaultDifficulty={guestProgress.settings.difficultyDefault}
      defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault}
      onChange={onMultiplayerChange}
      onCompetitiveChange={onCompetitiveMultiplayerChange}
      onSelectedGameChange={onSelectMultiplayerGame}
      scope={scope}
      selectedGameId={selectedMultiplayerGameId}
      state={multiplayer}
      viewerProfile={viewerProfile}
      viewerUserId={authState.user?.id}
    />
  )

  if (route.id === 'home') {
    return <DashboardHome dashboard={dashboard} onAction={onDashboardAction} />
  }

  if (route.id === 'calendar') {
    return (
      <CalendarPanel
        guestProgress={guestProgress}
        keyboardDisabled={keyboardDisabled}
        launchRequest={calendarLaunch}
        multiplayer={multiplayer}
        onGameComplete={onGameComplete}
        onLaunchConsumed={onCalendarLaunchConsumed}
        onMarkPastDailyUnlocked={onMarkPastDailyUnlocked}
        onResumeCapture={onResumeCapture}
        onSpendCoins={onSpendCoins}
        onUpdateSettings={onUpdateSettings}
        onMultiplayerChange={onMultiplayerChange}
        onCompetitiveMultiplayerChange={onCompetitiveMultiplayerChange}
        multiplayerDailyDateKey={multiplayerDailyDateKey}
        authStatus={authState.status}
        viewerUserId={authState.user?.id}
        viewerProfile={viewerProfile}
        todayDateKey={todayDateKey}
      />
    )
  }

  if (route.id === 'solo') {
    return (
      <SoloWorkspace
        activeSubtab={soloSubtab}
        attention={workspaceAttention.solo}
        dailyMode={soloDailyMode}
        history={guestProgress.history}
        onDailyModeChange={onSoloDailyModeChange}
        onOpenCalendar={() => onSelectRoute('calendar')}
        onOpenHistory={onOpenSoloHistory}
        onPracticeModeChange={onPracticeModeChange}
        onResumeGame={onResumeSoloGame}
        onSelectActiveGame={onSelectSoloGame}
        onSubtabChange={onSoloSubtabChange}
        practiceMode={practiceMode}
        renderDailyGame={renderSoloDailyGame}
        renderPracticeGame={renderSoloPracticeGame}
        resumeSlots={resumeSlots}
        selectedGameKey={selectedSoloGameKey}
      />
    )
  }

  if (route.id === 'og-daily') {
    return <OgGame coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultHardMode={guestProgress.settings.hardModeDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'go-daily') {
    return <GoGame coins={guestProgress.progression.coins} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault} defaultHardMode={guestProgress.settings.hardModeDefault} keyboardDisabled={keyboardDisabled} onGameComplete={onGameComplete} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })} onSpendCoins={onSpendCoins} scope="daily" />
  }

  if (route.id === 'practice') {
    return <PracticeGameSwitcher multiplayer={multiplayer} authStatus={authState.status} coins={guestProgress.progression.coins} competitiveMultiplayer={guestProgress.competitiveMultiplayer} defaultDifficulty={guestProgress.settings.difficultyDefault} defaultGoPuzzleCount={guestProgress.settings.goPuzzleCountDefault} defaultHardMode={guestProgress.settings.hardModeDefault} keyboardDisabled={keyboardDisabled} onMultiplayerChange={onMultiplayerChange} onCompetitiveMultiplayerChange={onCompetitiveMultiplayerChange} onGameComplete={onGameComplete} onPracticeModeChange={onPracticeModeChange} onPracticeSeedAdvance={onPracticeSeedAdvance} onResumeCapture={onResumeCapture} onSaveDifficultyDefault={(tier) => onUpdateSettings({ difficultyDefault: tier })} onSaveGoPuzzleCountDefault={(count) => onUpdateSettings({ goPuzzleCountDefault: count })} onSpendCoins={onSpendCoins} practiceMode={practiceMode} practiceSeeds={guestProgress.practiceSeeds} resumeSlots={resumeSlots} viewerProfile={viewerProfile} viewerUserId={authState.user?.id} />
  }

  if (route.id === 'multiplayer') {
    return (
      <MultiplayerWorkspace
        activeSubtab={multiplayerSubtab}
        attention={workspaceAttention.multiplayer}
        competitiveState={guestProgress.competitiveMultiplayer}
        dailyDateKey={multiplayerDailyDateKey}
        onOpenHistory={onOpenMultiplayerHistory}
        onResumeGame={onResumeMultiplayerGame}
        onSelectGame={onSelectMultiplayerGame}
        onSubtabChange={onMultiplayerSubtabChange}
        renderDailyPanel={() => renderMultiplayerPanel('daily')}
        renderPracticePanel={() => renderMultiplayerPanel('practice')}
        selectedGameId={selectedMultiplayerGameId}
        state={multiplayer}
        liveSpectatorRows={liveSpectatorRows}
        viewerUserId={authState.user?.id}
      />
    )
  }

  if (route.id === 'history') {
    return (
      <HistoryWorkspace
        competitiveState={guestProgress.competitiveMultiplayer}
        filters={historyFilters}
        history={guestProgress.history}
        onFiltersChange={onHistoryFiltersChange}
        viewerUserId={authState.user?.id}
      />
    )
  }

  if (route.id === 'word-explorer') {
    return <WordExplorerPanel />
  }

  if (route.id === 'feedback') {
    return <FeedbackPanel />
  }

  if (route.id === 'stats') {
    return <StatsDashboard competitiveMultiplayer={guestProgress.competitiveMultiplayer} history={guestProgress.history} progression={guestProgress.progression} stats={guestProgress.stats} />
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
        onRequestPasswordReset={onRequestPasswordReset}
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

  if (route.id === 'about') {
    return <AboutBrrrdlePanel />
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
  const [initialNavigation] = useState(() => loadNavigationState())
  const [activeRouteId, setActiveRouteId] = useState<AppRouteId>(() => initialNavigation.activeRouteId)
  const [guestProgress, setGuestProgress] = useState(() => loadGuestProgress())
  const [multiplayer, setMultiplayer] = useState(() => guestProgress.multiplayer ?? loadMultiplayerState())
  const [liveSpectatorRows, setLiveSpectatorRows] = useState<readonly AuthenticatedLiveSpectatorGame[]>([])
  const [initialMultiplayerSeed] = useState(() => guestProgress.multiplayer)
  const supabaseClient = useMemo(() => createBrrrdleSupabaseClient(), [])
  const [authState, setAuthState] = useState<AuthState>(() => supabaseClient ? { status: 'anonymous' } : { status: 'unconfigured' })
  const authenticatedMultiplayerUserId = authState.status === 'authenticated' && authState.user ? authState.user.id : undefined
  const multiplayerRepository = useMemo<MultiplayerRepository>(
    () => authenticatedMultiplayerUserId && supabaseClient
      ? createSupabaseMultiplayerRepository({ client: supabaseClient, userId: authenticatedMultiplayerUserId })
      : createLocalStorageMultiplayerRepository(undefined, initialMultiplayerSeed),
    [authenticatedMultiplayerUserId, initialMultiplayerSeed, supabaseClient],
  )
  const multiplayerRepositoryRef = useRef(multiplayerRepository)
  const [authMessage, setAuthMessage] = useState<string | undefined>(undefined)
  const [authBusy, setAuthBusy] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [passwordResetOpen, setPasswordResetOpen] = useState(false)
  const [passwordResetMessage, setPasswordResetMessage] = useState<string | undefined>(undefined)
  const [profilePanelOpen, setProfilePanelOpen] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | undefined>(undefined)
  const [profileBusy, setProfileBusy] = useState(false)
  const [syncStatus, setSyncStatus] = useState(() => createSyncStatus(supabaseClient ? 'idle' : 'error'))
  const [notificationMetadata, setNotificationMetadata] = useState(() => loadNotificationMetadata())
  const notificationSoundFingerprintsRef = useRef<Set<string> | undefined>(undefined)
  const [practiceMode, setPracticeModeState] = useState<PracticeMode>(() => initialNavigation.legacyPracticeMode)
  const [selectedSoloGameKey, setSelectedSoloGameKey] = useState<SoloActiveGameKey | undefined>(() => (
    isSoloActiveGameKey(initialNavigation.selectedSoloGameKey) ? initialNavigation.selectedSoloGameKey : undefined
  ))
  const [soloDailyMode, setSoloDailyMode] = useState<SoloMode>(() => selectedSoloGameKey === 'daily-go' ? 'go' : 'og')
  const [soloSubtab, setSoloSubtab] = useState<SoloSubtabId>(() => initialNavigation.soloSubtab)
  const [multiplayerSubtab, setMultiplayerSubtab] = useState<MultiplayerSubtabId>(() => initialNavigation.multiplayerSubtab)
  const [selectedMultiplayerGameId, setSelectedMultiplayerGameId] = useState<string | undefined>(() => initialNavigation.selectedMultiplayerGameId)
  const [historyFilters, setHistoryFilters] = useState(() => initialNavigation.historyFilters)
  const [dailyAlerting, setDailyAlerting] = useState(false)
  const [dailyMultiplayerAlerting, setDailyMultiplayerAlerting] = useState(false)
  const dailyAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const dailyMultiplayerAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const autoResumedRef = useRef(false)
  const guestProgressRef = useRef(guestProgress)
  const activeRoute = getRouteById(activeRouteId)
  const resumeSlots = useMemo(() => normalizeResumeSlots(guestProgress.resumeSlots), [guestProgress.resumeSlots])
  const isAdmin = authState.user?.roles.includes('admin') ?? false
  const prismRoutes = useMemo(() => getPrimaryNavigationRoutes(isAdmin), [isAdmin])
  const [calendarLaunch, setCalendarLaunch] = useState<CalendarLaunchRequest | null>(null)
  const handleClearCalendarLaunch = useCallback(() => setCalendarLaunch(null), [])
  const handleMarkPastDailyUnlocked = useCallback((mode: 'og' | 'go', dateKey: string) => {
    setGuestProgress((currentProgress) => {
      const key = `${mode}:${dateKey}`
      const current = currentProgress.unlockedDailies ?? []
      if (current.includes(key)) {
        return currentProgress
      }
      const nextProgress = { ...currentProgress, unlockedDailies: [...current, key] }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const countdownEnabled = guestProgress.settings.dailyCountdownEnabled
  const dailyMultiplayerCountdownEnabled = guestProgress.settings.dailyMultiplayerCountdownEnabled
  const handleDailyReset = useCallback(() => {
    // Subtle, non-modal alert: play the unique reset chime (respects the master
    // sound toggle inside the engine) and glow the countdown for a few seconds.
    sound.play('daily-reset')
    setDailyAlerting(true)
    if (dailyAlertTimeoutRef.current) {
      clearTimeout(dailyAlertTimeoutRef.current)
    }
    dailyAlertTimeoutRef.current = setTimeout(() => setDailyAlerting(false), 12_000)
  }, [sound])
  const daily = useDailyCycle({ alertsEnabled: countdownEnabled, onReset: handleDailyReset })
  const handleDailyMultiplayerReset = useCallback(() => {
    sound.play('daily-multiplayer-reset')
    setDailyMultiplayerAlerting(true)
    if (dailyMultiplayerAlertTimeoutRef.current) {
      clearTimeout(dailyMultiplayerAlertTimeoutRef.current)
    }
    dailyMultiplayerAlertTimeoutRef.current = setTimeout(() => setDailyMultiplayerAlerting(false), 12_000)
  }, [sound])
  const dailyMultiplayer = useDailyCycle({
    alertsEnabled: dailyMultiplayerCountdownEnabled,
    onReset: handleDailyMultiplayerReset,
    variant: 'multiplayer',
  })
  const dashboard = useMemo(() => createDashboardViewModel({
    competitiveMultiplayerState: guestProgress.competitiveMultiplayer,
    dailyDateKey: dailyMultiplayer.dateKey,
    dailyMultiplayer: {
      actionLabel: dailyMultiplayerAlerting ? 'Play now' : 'Open daily',
      detailLabel: dailyMultiplayerAlerting
        ? 'Daily Multiplayer has refreshed.'
        : `Daily Multiplayer resets in ${dailyMultiplayer.countdownLabel} (${dailyMultiplayer.timeZone}).`,
      ready: dailyMultiplayerAlerting,
    },
    dailySolo: {
      actionLabel: dailyAlerting ? 'Play now' : 'Open daily',
      detailLabel: dailyAlerting
        ? 'Daily Solo has refreshed.'
        : `Daily Solo resets in ${daily.countdownLabel} (${daily.timeZone}).`,
      ready: dailyAlerting,
    },
    history: guestProgress.history,
    liveSpectatorRows,
    multiplayerState: multiplayer,
    resumeSlots,
    viewerUserId: authState.user?.id,
  }), [
    authState.user?.id,
    daily.countdownLabel,
    daily.timeZone,
    dailyAlerting,
    dailyMultiplayer.countdownLabel,
    dailyMultiplayer.dateKey,
    dailyMultiplayer.timeZone,
    dailyMultiplayerAlerting,
    guestProgress.competitiveMultiplayer,
    guestProgress.history,
    liveSpectatorRows,
    multiplayer,
    resumeSlots,
  ])
  const notifications = useMemo(() => createNotificationViewModel({
    dashboard,
    notificationMetadata,
    notificationPreferences: guestProgress.settings,
    now: dashboard.generatedAt,
  }), [
    dashboard,
    guestProgress.settings,
    notificationMetadata,
  ])
  const routeAttention = useMemo(() => createRouteAttentionMap({
    dashboard,
    notifications,
  }), [dashboard, notifications])
  const workspaceAttention = useMemo(() => createWorkspaceAttentionMap({
    dashboard,
  }), [dashboard])
  useEffect(() => {
    const currentFingerprints = getNotificationSoundFingerprints(notifications.items)
    const previousFingerprints = notificationSoundFingerprintsRef.current

    if (!previousFingerprints) {
      notificationSoundFingerprintsRef.current = new Set(currentFingerprints)
      return
    }

    const decision = selectNotificationSoundDecision({
      items: notifications.items,
      masterSoundEnabled: sound.enabled,
      preferences: guestProgress.settings,
      previousFingerprints: Array.from(previousFingerprints),
    })

    if (decision) {
      sound.play(decision.event)
    }

    notificationSoundFingerprintsRef.current = new Set([
      ...Array.from(previousFingerprints),
      ...currentFingerprints,
    ])
  }, [guestProgress.settings, notifications.items, sound])
  const handlePracticeModeChange = useCallback((mode: PracticeMode) => {
    setPracticeModeState(mode)
    setSoloSubtab('practice')
    saveNavigationState({ legacyPracticeMode: mode, soloSubtab: 'practice' })
  }, [])
  const handleSoloDailyModeChange = useCallback((mode: SoloMode) => {
    setSoloDailyMode(mode)
    setSoloSubtab('daily')
    saveNavigationState({ soloSubtab: 'daily' })
  }, [])
  const handleSoloSubtabChange = useCallback((subtab: SoloSubtabId) => {
    setSoloSubtab(subtab)
    saveNavigationState({ soloSubtab: subtab })
  }, [])
  const handleSelectSoloGame = useCallback((key: SoloActiveGameKey) => {
    setSelectedSoloGameKey(key)
    saveNavigationState({ selectedSoloGameKey: key })
  }, [])
  const handleMultiplayerSubtabChange = useCallback((subtab: MultiplayerSubtabId) => {
    setMultiplayerSubtab(subtab)
    saveNavigationState({ multiplayerSubtab: subtab })
  }, [])
  const handleSelectMultiplayerGame = useCallback((id: string) => {
    setSelectedMultiplayerGameId(id)
    saveNavigationState({ selectedMultiplayerGameId: id })
  }, [])
  const handlePracticeSeedAdvance = useCallback((mode: PracticeMode) => {
    setGuestProgress((currentProgress) => {
      const practiceSeeds = advancePracticeSeedState(currentProgress.practiceSeeds, mode)
      const nextProgress = { ...currentProgress, practiceSeeds }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const handleNavigate = useCallback((routeId: AppRoute['id']) => {
    // Phase 22 Addendum (§27.10): the dedicated daily routes are retired. Any
    // deep link to them gracefully redirects into the Calendar with today's
    // daily for the requested mode pre-launched.
    if (routeId === 'og-daily' || routeId === 'go-daily') {
      setCalendarLaunch({ mode: routeId === 'og-daily' ? 'og' : 'go', dateKey: daily.dateKey })
      setActiveRouteId('calendar')
      setSoloSubtab('daily')
      saveNavigationState({ activeRouteId: 'calendar', soloSubtab: 'daily' })
      return
    }
    if (routeId === 'practice') {
      setSoloSubtab('practice')
      saveNavigationState({ activeRouteId: 'solo', soloSubtab: 'practice' })
      setActiveRouteId('solo')
      return
    }
    setActiveRouteId(routeId)
    saveNavigationState({ activeRouteId: routeId })
  }, [daily.dateKey])
  const handleCountdownActivate = useCallback(() => {
    setDailyAlerting(false)
    setCalendarLaunch({ mode: 'og', dateKey: daily.dateKey })
    setActiveRouteId('calendar')
    setSoloSubtab('daily')
    saveNavigationState({ activeRouteId: 'calendar', soloSubtab: 'daily' })
  }, [daily.dateKey])
  const handleDailyMultiplayerCountdownActivate = useCallback(() => {
    setDailyMultiplayerAlerting(false)
    setCalendarLaunch(null)
    setActiveRouteId('multiplayer')
    setMultiplayerSubtab('daily')
    saveNavigationState({ activeRouteId: 'multiplayer', multiplayerSubtab: 'daily' })
  }, [])
  const handleMultiplayerChange = useCallback((multiplayer: MultiplayerState) => {
    setMultiplayer(multiplayer)
    setGuestProgress((currentProgress) => {
      const competitiveMultiplayer = settleMultiplayerStateResults(currentProgress.competitiveMultiplayer, multiplayer, authState)
      const nextProgress = { ...currentProgress, multiplayer, competitiveMultiplayer }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
    void multiplayerRepositoryRef.current.save(multiplayer).catch(() => {
      if (authState.status === 'authenticated') {
        void multiplayerRepositoryRef.current.load().then((snapshot) => {
          setMultiplayer(snapshot.state)
          saveMultiplayerState(snapshot.state)
          setGuestProgress((currentProgress) => {
            const competitiveMultiplayer = settleMultiplayerStateResults(currentProgress.competitiveMultiplayer, snapshot.state, authState)
            const nextProgress = { ...currentProgress, multiplayer: snapshot.state, competitiveMultiplayer }
            saveGuestProgress(nextProgress)
            return nextProgress
          })
        })
        return
      }
      saveMultiplayerState(multiplayer)
    })
  }, [authState])
  const handleCompetitiveMultiplayerChange = useCallback((competitiveMultiplayer: MultiplayerCompetitiveState) => {
    setGuestProgress((currentProgress) => {
      const nextProgress = { ...currentProgress, competitiveMultiplayer: normalizeCompetitiveMultiplayerState(competitiveMultiplayer) }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const handleResumeCapture = useCallback((capture: ResumeCapture) => {
    setGuestProgress((currentProgress) => {
      const slotKey = getResumeSlotKey(capture)
      const currentSlots = normalizeResumeSlots(currentProgress.resumeSlots)
      const currentSlot = currentSlots[slotKey]
      if (isCaptureInProgress(capture)) {
        const nextSlot = createResumeSlot(capture)
        if (isSameResumeSlot(currentSlot, nextSlot)) {
          return currentProgress
        }
        const nextSlots = { ...currentSlots, [slotKey]: nextSlot }
        const nextProgress = { ...currentProgress, resumeSlot: getLatestResumeSlot(nextSlots), resumeSlots: nextSlots }
        saveGuestProgress(nextProgress)
        return nextProgress
      }
      if (!currentSlot) {
        return currentProgress
      }
      const nextSlots = { ...currentSlots }
      delete nextSlots[slotKey]
      const resumeSlotsForSave = Object.keys(nextSlots).length > 0 ? nextSlots : undefined
      const nextProgress = { ...currentProgress, resumeSlot: getLatestResumeSlot(resumeSlotsForSave ?? {}), resumeSlots: resumeSlotsForSave }
      saveGuestProgress(nextProgress)
      return nextProgress
    })
  }, [])
  const handleOpenSoloHistory = useCallback((filters?: { readonly mode?: SoloMode; readonly scope?: SoloScope }) => {
    const nextFilters: HistoryFilters = {
      mode: filters?.mode ?? 'all',
      player: 'solo',
      scope: filters?.scope ?? 'all',
    }
    setHistoryFilters(nextFilters)
    setActiveRouteId('history')
    saveNavigationState({ activeRouteId: 'history', historyFilters: nextFilters })
  }, [])
  const handleOpenMultiplayerHistory = useCallback(() => {
    const nextFilters: HistoryFilters = {
      mode: 'all',
      player: 'multiplayer',
      scope: 'all',
    }
    setHistoryFilters(nextFilters)
    setActiveRouteId('history')
    saveNavigationState({ activeRouteId: 'history', historyFilters: nextFilters })
  }, [])
  const handleHistoryFiltersChange = useCallback((filters: HistoryFilters) => {
    setHistoryFilters(filters)
    saveNavigationState({ historyFilters: filters })
  }, [])
  const dashboardActionHandlers = useMemo<DashboardActionHandlers>(() => ({
      onHistoryFiltersChange: handleHistoryFiltersChange,
      onMultiplayerSubtabChange: handleMultiplayerSubtabChange,
      onSelectMultiplayerGame: handleSelectMultiplayerGame,
      onSelectRoute: handleNavigate,
      onSelectSoloGame: handleSelectSoloGame,
      onSoloSubtabChange: handleSoloSubtabChange,
  }), [
    handleHistoryFiltersChange,
    handleMultiplayerSubtabChange,
    handleNavigate,
    handleSelectMultiplayerGame,
    handleSelectSoloGame,
    handleSoloSubtabChange,
  ])
  const handleDashboardAction = useCallback((target: DashboardActionTarget) => {
    dispatchDashboardAction(target, dashboardActionHandlers)
  }, [dashboardActionHandlers])
  const updateNotificationMetadata = useCallback((
    updater: (current: NotificationMetadataState) => NotificationMetadataState,
  ) => {
    setNotificationMetadata((current) => {
      const next = updater(current)
      saveNotificationMetadata(next)
      return next
    })
  }, [])
  const handleMarkNotificationRead = useCallback((item: NotificationItemViewModel) => {
    markNotificationItemRead(item, updateNotificationMetadata)
  }, [updateNotificationMetadata])
  const handleDismissNotification = useCallback((item: NotificationItemViewModel) => {
    dismissNotificationItem(item, updateNotificationMetadata)
  }, [updateNotificationMetadata])
  const handleNotificationAction = useCallback((item: NotificationItemViewModel) => {
    activateNotificationItem(item, {
      dashboardHandlers: dashboardActionHandlers,
      updateMetadata: updateNotificationMetadata,
    })
  }, [dashboardActionHandlers, updateNotificationMetadata])
  const handleResumeSoloGame = useCallback((key: SoloActiveGameKey) => {
    const slot = resumeSlots[key]
    if (!slot) {
      return
    }

    setSelectedSoloGameKey(key)
    setActiveRouteId('solo')
    if (slot.scope === 'practice') {
      setPracticeModeState(slot.mode)
      setSoloSubtab('practice')
      saveNavigationState({
        activeRouteId: 'solo',
        legacyPracticeMode: slot.mode,
        selectedSoloGameKey: key,
        soloSubtab: 'practice',
      })
      return
    }

    setSoloDailyMode(slot.mode)
    setSoloSubtab('daily')
    saveNavigationState({
      activeRouteId: 'solo',
      selectedSoloGameKey: key,
      soloSubtab: 'daily',
    })
  }, [resumeSlots])
  const handleResumeMultiplayerGame = useCallback((id: string) => {
    const game = multiplayer.games.find((entry) => entry.id === id)
    if (!game) {
      return
    }
    const nextSubtab: MultiplayerSubtabId = game.scope === 'daily' ? 'daily' : 'practice'
    setSelectedMultiplayerGameId(id)
    setActiveRouteId('multiplayer')
    setMultiplayerSubtab(nextSubtab)
    saveNavigationState({
      activeRouteId: 'multiplayer',
      multiplayerSubtab: nextSubtab,
      selectedMultiplayerGameId: id,
    })
  }, [multiplayer.games])
  const navigateToResumeSlot = useCallback((slot: ResumeSlot | undefined) => {
    if (!slot) {
      return
    }
    const slotKey = getResumeSlotKey(slot)
    if (slot.scope === 'practice') {
      setPracticeModeState(slot.mode)
      setSelectedSoloGameKey(slotKey)
      setActiveRouteId('solo')
      setSoloSubtab('practice')
      saveNavigationState({
        activeRouteId: 'solo',
        legacyPracticeMode: slot.mode,
        selectedSoloGameKey: slotKey,
        soloSubtab: 'practice',
      })
      return
    }
    // Daily resume now lands inside the Solo workspace; Calendar remains the
    // compatibility hub for past dailies and legacy daily routes.
    setSoloDailyMode(slot.mode)
    setSelectedSoloGameKey(slotKey)
    setActiveRouteId('solo')
    setSoloSubtab('daily')
    saveNavigationState({
      activeRouteId: 'solo',
      selectedSoloGameKey: slotKey,
      soloSubtab: 'daily',
    })
  }, [])
  // Auto-resume the most recent unfinished game once per signed-in load (spec §2).
  // Called from async auth callbacks (not synchronously in an effect body).
  const maybeAutoResume = useCallback((nextAuthState: AuthState) => {
    if (nextAuthState.status !== 'authenticated' || autoResumedRef.current) {
      return
    }
    const slot = getLatestResumeSlot(normalizeResumeSlots(guestProgressRef.current.resumeSlots))
    if (!slot) {
      return
    }
    autoResumedRef.current = true
    navigateToResumeSlot(slot)
  }, [navigateToResumeSlot])
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
      const nextSettings = normalizeGuestSettings({ ...currentProgress.settings, ...patch })
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
  const handleClosePasswordReset = useCallback(() => {
    setPasswordResetOpen(false)
    setPasswordResetMessage(undefined)
    clearPasswordResetUrlMarker()
  }, [])
  const handleUpdatePassword = useCallback((password: string) => {
    if (!supabaseClient) {
      return
    }
    setPasswordResetMessage(undefined)
    setAuthBusy(true)
    void updatePassword(supabaseClient, password).then((result) => {
      setAuthBusy(false)
      if (!result.ok) {
        setPasswordResetMessage(result.message)
        return
      }
      setPasswordResetMessage('Password updated. You can close this window and continue playing.')
      clearPasswordResetUrlMarker()
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
      setPasswordResetOpen(false)
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
  const handleAccountHudClick = useCallback(() => {
    if (authState.status === 'authenticated') {
      handleOpenProfilePanel()
      return
    }

    if (authState.status === 'anonymous') {
      handleOpenAuthModal()
      return
    }

    handleNavigate('settings')
  }, [authState.status, handleNavigate, handleOpenAuthModal, handleOpenProfilePanel])
  const handleSyncNow = useCallback(() => {
    if (authState.status !== 'authenticated' || !authState.user || !supabaseClient) {
      if (authState.status === 'anonymous') {
        handleOpenAuthModal()
      } else {
        handleNavigate('settings')
      }
      setSyncStatus(createSyncStatus(supabaseClient ? 'idle' : 'error'))
      return
    }

    setSyncStatus(createSyncStatus('syncing'))
    void syncGuestProgress({
      isOnline: typeof navigator === 'undefined' ? true : navigator.onLine,
      localProgress: guestProgressRef.current,
      localUpdatedAt: new Date().toISOString(),
      repository: createSupabaseProgressRepository(supabaseClient),
      userId: authState.user.id,
    }).then((result) => {
      setGuestProgress(result.progress)
      saveGuestProgress(result.progress)
      setSyncStatus(result.status)
    })
  }, [authState, handleNavigate, handleOpenAuthModal, supabaseClient])
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
    multiplayerRepositoryRef.current = multiplayerRepository
    let isActive = true
    const applySnapshot = (snapshotState: MultiplayerState) => {
      if (!isActive) {
        return
      }
      setMultiplayer(snapshotState)
      saveMultiplayerState(snapshotState)
      setGuestProgress((currentProgress) => {
        const competitiveMultiplayer = settleMultiplayerStateResults(currentProgress.competitiveMultiplayer, snapshotState, authState)
        const nextProgress = { ...currentProgress, multiplayer: snapshotState, competitiveMultiplayer }
        saveGuestProgress(nextProgress)
        return nextProgress
      })
    }
    const unsubscribe = multiplayerRepository.subscribe((snapshot) => {
      applySnapshot(snapshot.state)
    })
    void multiplayerRepository.load().then((snapshot) => {
      applySnapshot(snapshot.state)
    })
    return () => {
      isActive = false
      unsubscribe()
    }
  }, [authState, multiplayerRepository])

  useEffect(() => {
    if (!authenticatedMultiplayerUserId || !supabaseClient) {
      const timeoutId = setTimeout(() => setLiveSpectatorRows([]), 0)
      return () => clearTimeout(timeoutId)
    }

    let isActive = true
    let inFlight = false
    const refresh = () => {
      if (inFlight) {
        return
      }
      inFlight = true
      void loadAuthenticatedLiveSpectatorRows(supabaseClient)
        .then((rows) => {
          if (isActive) {
            setLiveSpectatorRows(rows)
          }
        })
        .catch(() => {
          if (isActive) {
            setLiveSpectatorRows([])
          }
        })
        .finally(() => {
          inFlight = false
        })
    }

    refresh()
    const intervalId = setInterval(refresh, 30_000)
    return () => {
      isActive = false
      clearInterval(intervalId)
    }
  }, [authenticatedMultiplayerUserId, supabaseClient])

  useEffect(() => () => {
    if (dailyAlertTimeoutRef.current) {
      clearTimeout(dailyAlertTimeoutRef.current)
    }
    if (dailyMultiplayerAlertTimeoutRef.current) {
      clearTimeout(dailyMultiplayerAlertTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const expired = expireStaleDailyMultiplayerGames(multiplayer)
      if (JSON.stringify(expired) === JSON.stringify(multiplayer)) {
        return
      }
      setMultiplayer(expired)
      void multiplayerRepositoryRef.current.save(expired).catch(() => {
        saveMultiplayerState(expired)
      })
      setGuestProgress((currentProgress) => {
        const competitiveMultiplayer = settleMultiplayerStateResults(currentProgress.competitiveMultiplayer, expired, authState)
        const nextProgress = { ...currentProgress, multiplayer: expired, competitiveMultiplayer }
        saveGuestProgress(nextProgress)
        return nextProgress
      })
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [authState, multiplayer, dailyMultiplayer.dateKey])

  const hasTimedPracticeMultiplayerGames = multiplayer.games.some((game) => (
    game.scope === 'practice'
    && game.status === 'playing'
    && typeof game.timeLimitMs === 'number'
    && game.timeLimitMs > 0
  ))

  useEffect(() => {
    if (!hasTimedPracticeMultiplayerGames) {
      return undefined
    }
    const intervalId = setInterval(() => {
      setMultiplayer((currentState) => {
        const expired = expireTimedOutPracticeMultiplayerGames(currentState, new Date(), authenticatedMultiplayerUserId)
        if (JSON.stringify(expired) === JSON.stringify(currentState)) {
          return currentState
        }
        void multiplayerRepositoryRef.current.save(expired).catch(() => {
          saveMultiplayerState(expired)
        })
        setGuestProgress((currentProgress) => {
          const competitiveMultiplayer = settleMultiplayerStateResults(currentProgress.competitiveMultiplayer, expired, authState)
          const nextProgress = { ...currentProgress, multiplayer: expired, competitiveMultiplayer }
          saveGuestProgress(nextProgress)
          return nextProgress
        })
        return expired
      })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [authState, authenticatedMultiplayerUserId, hasTimedPracticeMultiplayerGames])

  useEffect(() => {
    applyTheme(guestProgress.settings.themeDefault)
  }, [guestProgress.settings.themeDefault])

  // Phase 21: the minimalist surface is the baseline. The Lunar Signal Deck
  // backdrop becomes a selectable surface theme in Phase 22.
  useEffect(() => {
    applySurfaceTheme(DEFAULT_SURFACE_THEME)
  }, [])

  useEffect(() => {
    let isMounted = true
    void getCurrentAuthState(supabaseClient).then((nextAuthState) => {
      if (isMounted) {
        setAuthState(nextAuthState)
        if (isPasswordResetUrl() && nextAuthState.status === 'authenticated') {
          setAuthModalOpen(false)
          setProfilePanelOpen(false)
          setPasswordResetOpen(true)
          setPasswordResetMessage(undefined)
          return
        }
        maybeAutoResume(nextAuthState)
      }
    })
    const subscription = subscribeToAuthChanges(supabaseClient, (nextAuthState, event) => {
      if (isMounted) {
        setAuthState(nextAuthState)
        if (event === 'PASSWORD_RECOVERY' || (isPasswordResetUrl() && nextAuthState.status === 'authenticated')) {
          setAuthModalOpen(false)
          setProfilePanelOpen(false)
          setPasswordResetOpen(true)
          setPasswordResetMessage(undefined)
          return
        }
        maybeAutoResume(nextAuthState)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [maybeAutoResume, supabaseClient])

  return (
    <>
      <LunarSignalStage
        accountControls={(
          <div className="brrrdle-lunar-account-stack">
            <AccountBadge authState={authState} onOpenAuthModal={handleOpenAuthModal} onOpenProfile={handleOpenProfilePanel} />
            <NotificationCenter
              onActivate={handleNotificationAction}
              onDismiss={handleDismissNotification}
              onMarkRead={handleMarkNotificationRead}
              viewModel={notifications}
            />
          </div>
        )}
        activeRoute={activeRoute}
        dailyCountdown={(
          <>
            {countdownEnabled ? (
              <DailyCountdown
                alerting={dailyAlerting}
                clamped={daily.clamped}
                countdownLabel={daily.countdownLabel}
                onActivate={handleCountdownActivate}
                timeZone={daily.timeZone}
              />
            ) : null}
            {dailyMultiplayerCountdownEnabled ? (
              <DailyCountdown
                alerting={dailyMultiplayerAlerting}
                clamped={dailyMultiplayer.clamped}
                countdownLabel={dailyMultiplayer.countdownLabel}
                deadlineLabel={MULTIPLAYER_DAILY_VARIANT.deadlineLabel}
                label={MULTIPLAYER_DAILY_VARIANT.countdownLabel}
                onActivate={handleDailyMultiplayerCountdownActivate}
                readyLabel={MULTIPLAYER_DAILY_VARIANT.readyLabel}
                timeZone={dailyMultiplayer.timeZone}
              />
            ) : null}
          </>
        )}
        surfaceTheme={DEFAULT_SURFACE_THEME}
        metrics={[
          { label: 'daily', value: `${DAILY_WORD_LENGTH} letters` },
          { label: 'practice', value: `${MIN_PRACTICE_WORD_LENGTH}-${MAX_PRACTICE_WORD_LENGTH}` },
          { label: 'go chain', value: `${guestProgress.settings.goPuzzleCountDefault} boards` },
          { label: 'banks', value: BUNDLED_WORD_LIST_LENGTHS.length },
        ]}
        onNavigate={handleNavigate}
        routeAttention={routeAttention}
        routes={prismRoutes}
        statusLines={[
          {
            label: 'Account',
            value: (
              <button className="brrrdle-lunar-line-action" onClick={handleAccountHudClick} type="button">
                {getAuthDisplay(authState)}
              </button>
            ),
          },
          {
            label: 'Sync',
            value: (
              <button className="brrrdle-lunar-line-action" onClick={handleSyncNow} type="button">
                {syncStatus.kind}
              </button>
            ),
          },
          {
            label: 'Sound',
            value: (
              <button
                aria-checked={sound.enabled}
                className="brrrdle-lunar-switch"
                onClick={() => sound.setEnabled(!sound.enabled)}
                role="switch"
                type="button"
              >
                <span aria-hidden="true" />
                <strong>{sound.enabled ? 'On' : 'Off'}</strong>
              </button>
            ),
          },
          {
            label: 'Theme',
            value: (
              <select
                aria-label="Theme"
                className="brrrdle-lunar-line-select"
                onChange={(event) => {
                  if (isTheme(event.target.value)) {
                    handleUpdateSettings({ themeDefault: event.target.value as Theme })
                  }
                }}
                value={guestProgress.settings.themeDefault}
              >
                {THEMES.map((theme) => (
                  <option key={theme} value={theme}>{getThemeMeta(theme).label}</option>
                ))}
              </select>
            ),
          },
        ]}
      >
          <RoutePanel
            authMessage={authMessage}
            authState={authState}
            dashboard={dashboard}
            multiplayer={multiplayer}
            liveSpectatorRows={liveSpectatorRows}
            calendarLaunch={calendarLaunch}
            guestProgress={guestProgress}
            historyFilters={historyFilters}
            onCalendarLaunchConsumed={handleClearCalendarLaunch}
            onMultiplayerChange={handleMultiplayerChange}
            onCompetitiveMultiplayerChange={handleCompetitiveMultiplayerChange}
            onDashboardAction={handleDashboardAction}
            onGameComplete={handleGameComplete}
            onHistoryFiltersChange={handleHistoryFiltersChange}
            onMarkPastDailyUnlocked={handleMarkPastDailyUnlocked}
            onMultiplayerSubtabChange={handleMultiplayerSubtabChange}
            onOpenAuthModal={handleOpenAuthModal}
            onOpenMultiplayerHistory={handleOpenMultiplayerHistory}
            onOpenProfilePanel={handleOpenProfilePanel}
            onOpenSoloHistory={handleOpenSoloHistory}
            onPracticeModeChange={handlePracticeModeChange}
            onPracticeSeedAdvance={handlePracticeSeedAdvance}
            onResetProgress={handleResetProgress}
            onRequestPasswordReset={handleRequestPasswordReset}
            onResumeCapture={handleResumeCapture}
            onResumeMultiplayerGame={handleResumeMultiplayerGame}
            onResumeSoloGame={handleResumeSoloGame}
            onSelectMultiplayerGame={handleSelectMultiplayerGame}
            onSelectSoloGame={handleSelectSoloGame}
            onSelectRoute={handleNavigate}
            onSendMagicLink={handleSendMagicLink}
            onSignInWithPassword={handleSignInWithPassword}
            onSignOut={handleSignOut}
            onSignUpWithPassword={handleSignUpWithPassword}
            onSoloDailyModeChange={handleSoloDailyModeChange}
            onSoloSubtabChange={handleSoloSubtabChange}
            onSpendCoins={handleSpendCoins}
            onToggleSound={sound.setEnabled}
            onUpdateSettings={handleUpdateSettings}
            practiceMode={practiceMode}
            multiplayerSubtab={multiplayerSubtab}
            resumeSlots={resumeSlots}
            route={activeRoute}
            selectedMultiplayerGameId={selectedMultiplayerGameId}
            selectedSoloGameKey={selectedSoloGameKey}
            soundEnabled={sound.enabled}
            soloDailyMode={soloDailyMode}
            soloSubtab={soloSubtab}
            supabaseClient={supabaseClient}
            syncStatus={syncStatus}
            workspaceAttention={workspaceAttention}
            multiplayerDailyDateKey={dailyMultiplayer.dateKey}
            todayDateKey={daily.dateKey}
          />
      </LunarSignalStage>

      {import.meta.env.DEV ? <SimulateTimePanel /> : null}

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

      <PasswordResetModal
        busy={authBusy}
        isOpen={passwordResetOpen}
        onClose={handleClosePasswordReset}
        onUpdatePassword={handleUpdatePassword}
        statusMessage={passwordResetMessage}
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
    </>
  )
}

export default App

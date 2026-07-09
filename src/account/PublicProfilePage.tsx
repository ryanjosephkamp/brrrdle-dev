import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_GO_PUZZLE_COUNT } from '../game/constants'
import type { GameMode } from '../game/types'
import {
  PRACTICE_MULTIPLAYER_TIME_LIMIT_OPTIONS,
  type PracticeMultiplayerTimeLimitMs,
} from '../multiplayer/multiplayer'
import { Button, LoadingState, Panel } from '../ui'
import { classNames } from '../ui/classNames'
import {
  normalizePublicProfileId,
  type OwnerPublicProfile,
  type PublicPlayerProfile,
  type PublicProfileRepository,
} from './publicProfile'
import {
  createPrivatePracticeRequestIdempotencyKey,
  getPrivateMatchRequestErrorMessage,
  getPrivatePracticeRequestSettingsLabel,
  isOwnerPublicProfileEligibleForPrivateMatch,
  normalizePrivatePracticeRequestSettings,
  PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE,
  type PrivatePracticeRequestSettings,
} from './publicProfilePrivateMatch'
import type { MultiplayerRepository } from '../multiplayer/multiplayerRepository'

export type PublicProfilePageStatus = 'idle' | 'loading' | 'ready' | 'unavailable' | 'error'

type PrivateMatchActions = Pick<MultiplayerRepository, 'createPrivateMatchRequest'>
type PublicProfilePageRepository = Pick<PublicProfileRepository, 'loadPublicProfile'> & Partial<Pick<PublicProfileRepository, 'loadMine'>>
type PublicProfileAuthStatus = 'anonymous' | 'authenticated' | 'unconfigured'

const DEFAULT_PRIVATE_PRACTICE_REQUEST_SETTINGS: PrivatePracticeRequestSettings = {
  hardMode: false,
  mode: 'og',
  timeLimitMs: null,
  wordLength: 5,
}

interface PublicProfilePageProps {
  readonly authStatus?: PublicProfileAuthStatus
  readonly privateMatchActions?: PrivateMatchActions
  readonly onBack?: () => void
  readonly publicProfileId?: string
  readonly repository?: PublicProfilePageRepository
}

interface PublicProfileCardProps {
  readonly authStatus?: PublicProfileAuthStatus
  readonly errorMessage?: string
  readonly privateMatchBusy?: boolean
  readonly privateMatchMessage?: string
  readonly privateMatchRequestsAvailable?: boolean
  readonly privatePracticeSettings?: PrivatePracticeRequestSettings
  readonly onPrivatePracticeSettingsChange?: (settings: PrivatePracticeRequestSettings) => void
  readonly onRequestPrivateMatch?: () => void
  readonly onBack?: () => void
  readonly profile?: PublicPlayerProfile
  readonly status: PublicProfilePageStatus
}

const accentAvatarClasses = {
  amber: 'from-amber-300 to-orange-700 text-slate-950',
  aurora: 'from-emerald-300 to-cyan-700 text-slate-950',
  cyan: 'from-cyan-200 to-sky-700 text-slate-950',
  ice: 'from-slate-100 to-cyan-500 text-slate-950',
  rose: 'from-rose-200 to-fuchsia-700 text-slate-950',
  violet: 'from-violet-200 to-indigo-700 text-slate-950',
} as const

function formatPublicProfileUpdatedAt(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZone: 'UTC',
    timeZoneName: 'short',
  }).format(date)
}

function getInitials(displayName: string): string {
  const parts = displayName.split(/[\s._-]+/u).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toLocaleUpperCase('en-US')
  }
  return displayName.charAt(0).toLocaleUpperCase('en-US') || '?'
}

function PublicProfileAvatar({ profile }: { readonly profile: PublicPlayerProfile }) {
  if (profile.avatarUrl) {
    return (
      <img
        alt={`${profile.displayName} public avatar`}
        className="h-16 w-16 rounded-2xl border border-white/15 object-cover"
        loading="lazy"
        referrerPolicy="no-referrer"
        src={profile.avatarUrl}
      />
    )
  }

  return (
    <span className={classNames(
      'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-black shadow-inner shadow-white/20',
      accentAvatarClasses[profile.accentColor],
    )}>
      {getInitials(profile.displayName)}
    </span>
  )
}

export function PublicProfileCard({
  authStatus = 'unconfigured',
  errorMessage,
  privateMatchBusy = false,
  privateMatchMessage,
  privateMatchRequestsAvailable = false,
  privatePracticeSettings = DEFAULT_PRIVATE_PRACTICE_REQUEST_SETTINGS,
  onPrivatePracticeSettingsChange,
  onRequestPrivateMatch,
  onBack,
  profile,
  status,
}: PublicProfileCardProps) {
  const updatedLabel = profile ? formatPublicProfileUpdatedAt(profile.updatedAt) : undefined
  const canRequestPrivateMatch = authStatus === 'authenticated' && privateMatchRequestsAvailable && onRequestPrivateMatch
  const privatePracticeSettingsLabel = getPrivatePracticeRequestSettingsLabel(privatePracticeSettings)
  const updatePrivatePracticeSettings = (settings: PrivatePracticeRequestSettings) => {
    onPrivatePracticeSettingsChange?.(settings)
  }

  return (
    <section className="space-y-4" aria-labelledby="public-profile-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">public profile</p>
          <h2 id="public-profile-title" className="text-3xl font-bold text-white">Player profile</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            This display-only profile uses active opt-in public fields. Private account data, raw auth identity, game sessions, queues, rating internals, and tokens stay hidden.
          </p>
        </div>
        {onBack ? (
          <Button onClick={onBack} size="sm" variant="secondary">
            Back to leaderboard
          </Button>
        ) : null}
      </div>

      <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
        {status === 'loading' ? <LoadingState label="Loading public profile..." /> : null}

        {status === 'error' ? (
          <p className="rounded-lg border border-rose-300/30 bg-rose-950/20 p-4 text-rose-100" role="alert">
            {errorMessage ?? 'Unable to load this public profile right now.'}
          </p>
        ) : null}

        {status === 'unavailable' || status === 'idle' ? (
          <p className="rounded-lg border border-white/10 bg-black/25 p-4 text-slate-300">
            This public profile is unavailable. The player may be private, hidden, suspended, missing, or no longer visible.
          </p>
        ) : null}

        {status === 'ready' && profile ? (
          <div className="space-y-4">
            <div className="flex min-w-0 items-center gap-4">
              <PublicProfileAvatar profile={profile} />
              <div className="min-w-0">
                <p className="break-words text-2xl font-black text-white">{profile.displayName}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Updated {updatedLabel}</p>
              </div>
            </div>

            {profile.bio ? (
              <p className="rounded-lg border border-white/10 bg-black/25 p-4 text-slate-200">{profile.bio}</p>
            ) : (
              <p className="rounded-lg border border-white/10 bg-black/25 p-4 text-slate-400">No public bio yet.</p>
            )}

            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Flair</dt>
                <dd className="mt-1 font-semibold text-cyan-50">{profile.flairKey === 'none' ? 'None' : profile.flairKey}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">Profile visibility</dt>
                <dd className="mt-1 font-semibold text-cyan-50">Active public profile</dd>
              </div>
            </dl>

            <div className="rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4">
              <p className="font-bold text-cyan-50">Private Practice match</p>
              <p className="mt-1 text-xs leading-5 text-cyan-100">
                Send an authenticated, unranked Practice request with the selected settings. Private requests are visible only to the two signed-in players and never expose raw account ids.
              </p>
              {canRequestPrivateMatch ? (
                <div className="mt-3 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                      <span>Mode</span>
                      <select
                        aria-label="Private Practice mode"
                        className="w-full rounded-lg border border-white/15 bg-black/35 px-3 py-2 text-sm font-semibold normal-case tracking-normal text-cyan-50"
                        disabled={privateMatchBusy}
                        onChange={(event) => {
                          const mode = event.currentTarget.value as GameMode
                          updatePrivatePracticeSettings({
                            ...privatePracticeSettings,
                            goPuzzleCount: mode === 'go' ? privatePracticeSettings.goPuzzleCount ?? DEFAULT_GO_PUZZLE_COUNT : undefined,
                            mode,
                          })
                        }}
                        value={privatePracticeSettings.mode}
                      >
                        <option value="og">OG</option>
                        <option value="go">GO</option>
                      </select>
                    </label>

                    <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                      <span>Word length</span>
                      <input
                        aria-label="Private Practice word length"
                        className="w-full rounded-lg border border-white/15 bg-black/35 px-3 py-2 text-sm font-semibold normal-case tracking-normal text-cyan-50"
                        disabled={privateMatchBusy}
                        inputMode="numeric"
                        max={35}
                        min={2}
                        onChange={(event) => {
                          updatePrivatePracticeSettings({
                            ...privatePracticeSettings,
                            wordLength: Number(event.currentTarget.value || 5),
                          })
                        }}
                        type="number"
                        value={privatePracticeSettings.wordLength}
                      />
                    </label>

                    <label className="space-y-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                      <span>Time control</span>
                      <select
                        aria-label="Private Practice time control"
                        className="w-full rounded-lg border border-white/15 bg-black/35 px-3 py-2 text-sm font-semibold normal-case tracking-normal text-cyan-50"
                        disabled={privateMatchBusy}
                        onChange={(event) => {
                          updatePrivatePracticeSettings({
                            ...privatePracticeSettings,
                            timeLimitMs: event.currentTarget.value === ''
                              ? null
                              : Number(event.currentTarget.value) as PracticeMultiplayerTimeLimitMs,
                          })
                        }}
                        value={privatePracticeSettings.timeLimitMs ?? ''}
                      >
                        {PRACTICE_MULTIPLAYER_TIME_LIMIT_OPTIONS.map((option) => (
                          <option key={option.value ?? 'none'} value={option.value ?? ''}>{option.label}</option>
                        ))}
                      </select>
                    </label>

                    <label className="flex min-h-12 items-center gap-2 rounded-lg border border-white/15 bg-black/25 px-3 py-2 text-sm font-semibold text-cyan-50">
                      <input
                        aria-label="Private Practice Hard Mode"
                        checked={privatePracticeSettings.hardMode}
                        disabled={privateMatchBusy}
                        onChange={(event) => {
                          updatePrivatePracticeSettings({
                            ...privatePracticeSettings,
                            hardMode: event.currentTarget.checked,
                          })
                        }}
                        type="checkbox"
                      />
                      Hard Mode
                    </label>
                  </div>

                  <p className="rounded-md border border-white/10 bg-black/20 p-2 text-xs font-semibold text-cyan-50">
                    Current request: {privatePracticeSettingsLabel}
                  </p>

                  <Button disabled={privateMatchBusy} onClick={onRequestPrivateMatch} size="sm" variant="primary">
                    {privateMatchBusy ? 'Sending request' : 'Request Practice match'}
                  </Button>
                </div>
              ) : (
                <p className="mt-3 rounded-md border border-white/10 bg-black/20 p-2 text-xs text-cyan-100">
                  {authStatus === 'authenticated'
                    ? 'Private match requests require authenticated Supabase multiplayer.'
                    : 'Sign in to send private Practice match requests.'}
                </p>
              )}
              {privateMatchMessage ? (
                <p className="mt-3 rounded-md border border-white/10 bg-black/20 p-2 font-semibold text-cyan-50" role="status">
                  {privateMatchMessage}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </Panel>
    </section>
  )
}

export function PublicProfilePage({
  authStatus = 'unconfigured',
  privateMatchActions,
  onBack,
  publicProfileId,
  repository,
}: PublicProfilePageProps) {
  const normalizedPublicProfileId = useMemo(() => normalizePublicProfileId(publicProfileId), [publicProfileId])
  const [loadResult, setLoadResult] = useState<{
    readonly errorMessage?: string
    readonly profile?: PublicPlayerProfile
    readonly publicProfileId?: string
    readonly status: Exclude<PublicProfilePageStatus, 'idle' | 'loading'>
  }>({ status: 'unavailable' })
  const [privateMatchState, setPrivateMatchState] = useState<{
    readonly busy: boolean
    readonly message?: string
    readonly publicProfileId?: string
  }>({ busy: false })
  const [privatePracticeSettings, setPrivatePracticeSettings] = useState<PrivatePracticeRequestSettings>(DEFAULT_PRIVATE_PRACTICE_REQUEST_SETTINGS)

  useEffect(() => {
    if (!normalizedPublicProfileId || !repository) {
      return undefined
    }

    let cancelled = false
    void repository.loadPublicProfile(normalizedPublicProfileId)
      .then((nextProfile) => {
        if (cancelled) {
          return
        }
        setLoadResult({
          profile: nextProfile,
          publicProfileId: normalizedPublicProfileId,
          status: nextProfile ? 'ready' : 'unavailable',
        })
      })
      .catch(() => {
        if (cancelled) {
          return
        }
        setLoadResult({
          errorMessage: 'Unable to load this public profile right now.',
          publicProfileId: normalizedPublicProfileId,
          status: 'error',
        })
      })

    return () => {
      cancelled = true
    }
  }, [normalizedPublicProfileId, repository])

  const status: PublicProfilePageStatus = !normalizedPublicProfileId || !repository
    ? 'unavailable'
    : loadResult.publicProfileId === normalizedPublicProfileId
      ? loadResult.status
      : 'loading'
  const profile = status === 'ready' ? loadResult.profile : undefined
  const errorMessage = status === 'error' ? loadResult.errorMessage : undefined
  const privateMatchMessage = privateMatchState.publicProfileId === profile?.publicProfileId
    ? privateMatchState.message
    : undefined
  const privateMatchBusy = privateMatchState.publicProfileId === profile?.publicProfileId
    ? privateMatchState.busy
    : false

  const requestPrivatePracticeMatch = async () => {
    if (!profile || authStatus !== 'authenticated' || !privateMatchActions) {
      return
    }
    setPrivateMatchState({
      busy: true,
      publicProfileId: profile.publicProfileId,
    })
    try {
      let requesterProfile: OwnerPublicProfile | undefined
      if (repository?.loadMine) {
        requesterProfile = await repository.loadMine()
        if (!isOwnerPublicProfileEligibleForPrivateMatch(requesterProfile)) {
          setPrivateMatchState({
            busy: false,
            message: PRIVATE_MATCH_REQUESTER_PUBLIC_PROFILE_REQUIRED_MESSAGE,
            publicProfileId: profile.publicProfileId,
          })
          return
        }
      }
      const normalizedSettings = normalizePrivatePracticeRequestSettings(privatePracticeSettings)
      if (!normalizedSettings.ok) {
        setPrivateMatchState({
          busy: false,
          message: normalizedSettings.message,
          publicProfileId: profile.publicProfileId,
        })
        return
      }
      const settings = normalizedSettings.settings

      const request = await privateMatchActions.createPrivateMatchRequest({
        ...settings,
        idempotencyKey: createPrivatePracticeRequestIdempotencyKey(profile.publicProfileId, settings),
        targetPublicProfileId: profile.publicProfileId,
      })
      setPrivateMatchState({
        busy: false,
        message: request.requestStatus === 'requested'
          ? 'Private Practice match request sent. You can review outgoing requests in Practice Multiplayer.'
          : `Private Practice match request is ${request.requestStatus}.`,
        publicProfileId: profile.publicProfileId,
      })
    } catch (error) {
      setPrivateMatchState({
        busy: false,
        message: getPrivateMatchRequestErrorMessage(error),
        publicProfileId: profile.publicProfileId,
      })
    }
  }

  return (
    <PublicProfileCard
      authStatus={authStatus}
      errorMessage={errorMessage}
      privateMatchBusy={privateMatchBusy}
      privateMatchMessage={privateMatchMessage}
      privateMatchRequestsAvailable={Boolean(privateMatchActions)}
      privatePracticeSettings={privatePracticeSettings}
      onPrivatePracticeSettingsChange={setPrivatePracticeSettings}
      onRequestPrivateMatch={() => { void requestPrivatePracticeMatch() }}
      onBack={onBack}
      profile={profile}
      status={status}
    />
  )
}

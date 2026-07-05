import { GAMEPLAY_AUTOCENTER_TARGETS, scheduleGameplayAutoCenter } from '../gameplayAutoCenter'

export function shouldAutoCenterSoloKeyboard(previousSubmittedGuessCount: number | undefined, submittedGuessCount: number): boolean {
  return previousSubmittedGuessCount !== undefined && submittedGuessCount > previousSubmittedGuessCount
}

export function scheduleSoloKeyboardAutoCenter(previousSubmittedGuessCount: number | undefined, submittedGuessCount: number): boolean {
  if (!shouldAutoCenterSoloKeyboard(previousSubmittedGuessCount, submittedGuessCount)) {
    return false
  }

  return scheduleGameplayAutoCenter(GAMEPLAY_AUTOCENTER_TARGETS.soloKeyboard)
}

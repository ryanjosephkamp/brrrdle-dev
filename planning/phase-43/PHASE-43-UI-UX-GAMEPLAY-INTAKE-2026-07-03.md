# Phase 43 UI/UX And Gameplay Intake

**Status**: Intake only - awaiting user review before recommendation planning.
**Date**: 2026-07-03
**Repository**: `brrrdle-dev`
**Authority**: User-provided Phase 42 manual review follow-up notes and annotated screenshots.

## Purpose

This document consolidates the user's Phase 42 manual review follow-up notes and annotated screenshot feedback into one organized repository artifact.

This is not an implementation plan, recommendation document, phase planning brief, or scope decision. It intentionally preserves the user's concepts and concerns before Codex performs the next recommendation and routing pass.

## Source Materials

User text intake:

- `/Users/noir/.codex/attachments/74b47244-4ff1-4abc-be3d-bc8681351f6a/pasted-text.txt`

Annotated screenshots:

- `/Users/noir/Desktop/ui_visual_improvements/home-cleanup-1.png`
- `/Users/noir/Desktop/ui_visual_improvements/home-cleanup-2.png`
- `/Users/noir/Desktop/ui_visual_improvements/home-cleanup-3.png`
- `/Users/noir/Desktop/ui_visual_improvements/practice-multiplayer-cleanup-1.png`
- `/Users/noir/Desktop/ui_visual_improvements/practice-multiplayer-cleanup-2.png`
- `/Users/noir/Desktop/ui_visual_improvements/practice-multiplayer-cleanup-3.png`
- `/Users/noir/Desktop/ui_visual_improvements/solo-cleanup-1.png`
- `/Users/noir/Desktop/ui_visual_improvements/solo-cleanup-2.png`

## Manual Review Summary

The user completed Phase 42 manual review and reports that the checklist items pass as far as they can tell. The follow-up notes in this intake should override the checked checklist if there is any discrepancy.

The overall Phase 42 implementation is described as functional and successful, but the user identified many UI/UX, layout, workflow, and small gameplay-behavior issues that are not fully covered by the manual checklist.

## Requested Immediate Workflow

The user requested a short, deliberate pre-planning sequence before returning to the normal phase cycle:

1. Create this descriptive intake document from the text and screenshots.
2. Halt for user review.
3. In a later prompt, generate Codex recommendations, routing decisions, and any needed repository document updates from this intake.
4. After that recommendation/routing pass, proceed toward the official Phase 43 planning brief.

The user also requested that once future implementations are confirmed correct, any durable behavior expectations should be encoded into tests or testing methods where practical so later phases do not regress them.

## Ranked Practice Multiplayer Issues

The user observed several ranked Practice Multiplayer issues involving three signed-in players with public accounts:

- Player 1 and Player 2 are matched in a ranked Practice game.
- Player 3 enters a ranked queue for the same exact match type.
- After Player 1 and Player 2 finish their game, either Player 1 or Player 2 searches again for that same ranked match type.
- The user observed that Player 1 or Player 2 does not match with Player 3.
- Even after every player cancels and Player 3 requeues, Player 1 and Player 2 still do not match with Player 3.
- If Player 1 and Player 2 both search ranked Practice again while Player 3 is already queued, Player 1 and Player 2 appear to pair with each other again rather than matching Player 3.

The user also identified two requester-side post-match issues:

- If Player 1 clicks "search ranked Practice again" before Player 2, and Player 2 joins the new ranked game, Player 1's screen does not immediately route into the newly created game while Player 1 remains on the endgame/waiting screen.
- The desired behavior is conditional: if Player 1 just clicked search again and is waiting to enter the new ranked game, Player 1 should auto-route into the matched game. If Player 1 is elsewhere in the app or actively playing another game, the app should not abruptly navigate them; notification-only behavior would be preferable in that situation.

The user also observed stale ranked queue feedback:

- The box saying "Still waiting for a compatible signed-in rival" remains visible even after the player has been matched and the new game opens.
- Clicking "Check ranked queue" does not clear that stale waiting state.
- The user is unsure what value "Check ranked queue" provides if the player cannot see queue contents and the queue automatically assigns a rival.

## Stats Tab Information Architecture

The user likes the public live stats/live site snapshot concept added in Phase 42, but does not want it grouped under local statistics.

Requested organization:

- The Stats page should first show the player's local statistics.
- The local statistics section should retain language like: "Local stats stay private on this device and focus on your gameplay history, XP, and coin trends."
- The public live stats should move to the bottom of the Stats page.
- The public stats section should use a header like "Public site stats" or "Live site snapshot."
- The public stats helper text should explain that public totals are aggregate-only and separate from private local gameplay statistics.

The user's reasoning is that players' own progress and local statistics are more relevant than the live site state, and public site stats are not local stats.

## Help, About, And Settings Content

The user likes the idea of a Help tab, but does not want the current Help content to remain in that tab.

Help tab notes:

- Remove the current quick route guide. The existing app tabs already serve that purpose.
- Remove the current modes/rules-of-thumb content from Help.
- If any current Help content is valuable and not already reflected in About, move that content into the About tab in an appropriate location.
- Keep the Help tab itself.
- Move Help in the navigation so it sits between Settings and Feedback.
- For now, Help may be a placeholder because the user eventually wants Help to become more visual, interactive, or tutorial-driven once the product is more settled.

Settings tab notes:

- Remove the Help and tutorials card from the top of Settings.
- The card takes too much space and is not a setting.
- If Help is adjacent to Settings in navigation, a large Help card at the top of Settings is unnecessary.

## Custom Codes, Daily Multiplayer, And Private Daily Requests

The user wants to revisit the "custom code" match type in Daily Multiplayer and Practice Multiplayer.

Custom code notes:

- Daily Multiplayer should not expose a custom-code match type.
- The user does not see a current practical value for custom codes in Practice Multiplayer either.
- The custom-code flow appears nonfunctional or unclear to the user, because they do not see a way for another player to search for and join by that code.
- The user is open to custom codes being folded into private games if there is a coherent private-match model, but does not want custom code as a normal selectable match type in the current Daily or Practice Multiplayer subtabs.

Daily competitive-integrity notes:

- Daily Multiplayer should avoid easy cheating paths.
- If ranked Daily Multiplayer is implemented later, ranked Daily should use different answers/chains from unranked Daily so a player cannot solve unranked first and then use those answers in ranked.
- Ranked Daily and unranked Daily should be treated as distinct competitive contracts if ranked Daily exists later.

Private Daily request clarification:

- The user is open to private Daily Multiplayer requests only for strictly unranked Daily play.
- A private unranked Daily match should count against the same daily availability/performance slot for that mode/day as public unranked Daily.
- Example: if a player plays a private unranked Daily OG for a given day, they should not also be able to play another public or private unranked Daily OG for that same day.
- Private Daily would differ from public Daily by allowing specific opponent selection, while the public/non-private version would still match with any eligible player.
- Public/non-private Daily should remain non-spectatable under the current boundary.

## Profile Simplification

The user finds the current Profile page too complex.

Desired simplification:

- Remove the distinction between private and public display names.
- Remove separate private and public accent colors.
- Remove separate public and private bios.
- Remove duplicated avatar/public avatar URL concepts where practical.
- Prefer one display name, one accent color, one bio, and one avatar source.
- The avatar could be either an uploaded image or a public avatar URL, but the profile should expose one chosen avatar rather than parallel public/private avatar fields.
- Public discoverability should be tied to multiplayer, leaderboard, and other public interactions rather than to a confusing duplicated profile model.
- Move Save and Sign out actions to the bottom of the Profile page, with Save before Sign out.

## Home And Global Shell Cleanup

The Home page is described as useful but too cluttered and potentially intimidating for new players.

Home cleanup notes:

- The user likes much of the Home content, but the default view contains too many boxes and too much information.
- A future widget model might allow players to add, remove, reorder, or customize Home content.
- The current default should feel less daunting for beginners.

Global right-side panel notes:

- The right-side panel that shows mode deck/account/sync/sound/theme-like controls should not appear on every page.
- Sync should move to Profile or Settings, whichever is more appropriate.
- Sound already exists in Settings, so a duplicate global sound toggle is unnecessary.
- Theme configuration is expected to belong to Profile later, so a global theme selector is unnecessary.
- Removing this panel is a global app-shell concern, not just a Home concern.

Recent Results notes:

- The Home Recent Results table requires horizontal scrolling at normal zoom.
- The user does not want any game page to require horizontal scrolling at normal zoom.
- Recent Results should either use a different layout, take the full available width, or otherwise display rows without forcing horizontal scroll.

## Practice Multiplayer Layout And History Display

The user identified several Practice Multiplayer layout concerns.

Private Practice requests:

- The current Private Practice requests area may not scale if the game becomes popular.
- The user is considering a better centralized location for inbound and outbound matchmaking requests.
- Possibilities mentioned include a new Multiplayer subtab, a social-style tab, messaging/following/notification surfaces, or a dedicated private notification area if players enable request notifications.
- The user is not asking for a final decision in this intake, only preserving the concern.

Ranked Practice information block:

- The Ranked Practice V1 explanatory block takes too much space.
- The user suggests it could become collapsed by default, tooltip-like, or otherwise less prominent.

Practice Multiplayer game buttons/history:

- The large grid of past/current game buttons labeled with mode and status is functional but not user-friendly.
- It takes too much space as players accumulate completed, canceled, won, and lost games.
- There is no way to dismiss completed/canceled items.
- If this list remains, it should likely be sortable or organized differently.
- The History tab should be able to route to completed games if completed games are meant to be revisitable.
- Practice Multiplayer should not primarily display completed games in the current dense button-grid layout.

## Solo Page Cleanup

The user wants the Solo cleanup applied to all relevant Solo subtabs, not only Practice Solo.

Mode toggle notes:

- The OG/GO button area currently looks awkward because only two buttons sit inside a large mostly empty section.
- The user prefers a simpler or more compact way of displaying these mode buttons.

GO Practice info row notes:

- Remove the row showing Word length, Current puzzle, Chain status, and Seed lists above the Practice length/customize/gameplay area.
- The user considers this row unnecessary because word length and current puzzle are already evident below, chain status is obvious once the puzzle is playing, and seed lists are unnecessary for players.

Content to preserve:

- The Practice length and Customize content below that info row is considered good.
- The user wants that lower configuration/gameplay-adjacent content kept and made the main content above gameplay outside of subtab navigation.

## Top-Site Buttons And Clocks

The signed-in profile/avatar button currently routes immediately to Profile.

Desired top-account behavior:

- Clicking the signed-in profile/avatar button should open a small dropdown below it.
- The dropdown should include at least "View profile" and "Sign out."
- The dropdown should close if the player clicks outside it or clicks the avatar/name button again.

Clock/button condensation:

- Condense the "NEXT DAILY" and "DAILY MULTIPLAYER" clocks/buttons.
- Preserve the same options and features, but make the top layout less awkward.

## Gameplay Keyboard Stability

The user identified two related but distinct gameplay-scroll/keyboard issues.

Invalid guess messages:

- Invalid guess messages such as "Guess is not in the word list" or Hard Mode constraint messages are correct and should remain.
- The problem is that the transient message box appears above the keyboard and pushes the keyboard down.
- When the player deletes the final typed letter, the message disappears and the keyboard shifts back up.
- This makes repeated DEL clicks awkward because the keyboard moves under the pointer.
- The desired behavior is to display invalid guess information without moving the keyboard vertically.

Persistent gameplay messages and board growth:

- Some keyboard movement is expected when the gameplay board grows, such as after extra guess rows are added.
- Some persistent messages, such as Give Up / Reveal Answer prompts, are also correct and should remain.
- The user wants a cleaner way to keep the keyboard visible when persistent content appears above it or the board grows.
- A possible concept is detecting when the player has centered the gameplay area and preserving that centered/keyboard-visible view until the player scrolls or navigates away.
- This should apply across all game modes and variants if implemented.
- Transient invalid guess messages should be solved differently from persistent content that legitimately changes layout.

## Spectator Auto-Scroll

The user wants similar centered-area behavior for spectators:

- If a spectator has centered the spectated game, the page should keep the latest guess/turn fully visible as turns grow.
- If the spectator scrolls away, auto-scroll should stop until they return to the relevant centered area.
- The special auto-scroll area would need to update as the number of turns grows.

## Notifications Click-Away Behavior

The expanded notifications box should close when the player clicks outside it or on the page background.

Current behavior requires clicking the same notifications control again to close it. The user wants click-away dismissal, especially for desktop usability.

## Back-To-Top Control

The user wants a back-to-top button:

- It should appear after the player scrolls sufficiently far down, approximately 10 percent of the page.
- It should use an icon such as an arrow or caret rather than text-heavy UI.
- It should sit near the bottom right.
- It should never overlap the active gameplay area.
- It should scroll the player back to the top of the current page.

## Multiplayer Draw By Repetition

The user tested unranked Practice GO Multiplayer with two accounts, Hard Mode disabled, and both accounts repeatedly guessing the same incorrect word. The game automatically ended in a draw after 12 incorrect guesses on the first puzzle.

The user asks whether that current behavior is correct, but independently wants a chess-inspired draw-by-repetition mechanic.

Desired mechanic concept:

- If both players submit the exact same incorrect guess three times in a row each, the game automatically ends in a draw.
- The sequence must be continuous and must use the same incorrect word for all six turns.
- Example: Player 1 guesses `guess`, Player 2 guesses `guess`, Player 1 guesses `guess`, Player 2 guesses `guess`, Player 1 guesses `guess`, Player 2 guesses `guess`.
- The draw reason could be "draw by repetition."
- The game should warn players as they approach the forced draw.
- After the first repeated pair, the game could indicate that repeating that word two more times will force a draw.
- After the second repeated pair, the game could indicate that one more repeat will force a draw.
- The feature should only appear subtly when the game detects the first repetition.

Clarification:

- The players merely submitting some matching guesses is not enough.
- The rule requires both players to repeat the same single incorrect word three times each in an uninterrupted six-turn sequence.

## Testing And Workflow Follow-Up

The user wants future confirmed behavior changes to be reflected in testing where practical.

Relevant candidates from this intake include:

- Ranked Practice queue matching fairness and search-again routing.
- Stale queue waiting-state cleanup.
- Public stats and local stats information architecture.
- Help/About/Settings content placement.
- Custom-code removal or rerouting.
- Profile simplification and public/private identity boundaries.
- Home/dashboard horizontal-scroll avoidance.
- Practice Multiplayer history/list scale behavior.
- Solo mode layout simplification.
- Top-account dropdown and notification click-away behavior.
- Invalid guess message keyboard stability.
- Persistent gameplay message and spectator auto-scroll behavior.
- Back-to-top button placement and non-overlap.
- Draw-by-repetition rules and warnings.

This intake does not decide which tests should be added or when. It only preserves the user's request that durable implementation outcomes should be encoded into future regression coverage where possible.

## Known Boundaries To Preserve In Later Planning

Future recommendation and planning passes should account for the existing protected project boundaries:

- Preserve Phase 42 public stats and developer dashboard privacy boundaries.
- Preserve Phase 41 multiplayer reliability repairs and real E2E harnesses.
- Preserve Phase 40 public profile and private matchmaking boundaries.
- Preserve Phase 39 mobile scroll smoothness.
- Preserve Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion unless a later explicit prompt changes scope.
- Preserve Daily claim safety.
- Preserve gameplay rules and Elo math unless a later explicit prompt authorizes changes.
- Do not treat this intake as authorization for implementation, migrations, deployment, Git/GitHub operations, or stable `brrrdle` repository work.

## Open Interpretation Notes For The Next Pass

The next recommendation pass should decide how to route, sequence, or defer the intake topics. It should also identify which items are:

- Immediate source/test bugfixes.
- UI/UX cleanup or information-architecture changes.
- Larger product design efforts.
- Database/RLS or migration-gated work.
- Gameplay-rule changes requiring explicit approval.
- Testing-suite or manual-review protocol additions.

This intake deliberately does not resolve those classifications.

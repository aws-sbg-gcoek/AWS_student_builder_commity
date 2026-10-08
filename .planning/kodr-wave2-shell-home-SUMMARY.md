# Wave 2 SUMMARY — Kodr Re-theme: Shell + Home Page (vibe-frontend / Agent 4)

## What built
Re-skinned shell + home to Kodr (black `#000` base, Clash display H1/H2, CTA gradient
`#AC69FF → #7200FF` + `button-bordercolor` ring, lime `#6feb2c` accents, cards
`gradient-border` on `#141414`, footer + giant watermark, mobile sticky CTA).
All club content/routes/data preserved: hash router (7 pages), TECH_TICKER (12 items),
WHAT_WE_DO (6), stats toggle, Interactive 3D/CLI toggle, join modal. Lenis wired in
`main.tsx` (rAF loop + `prefers-reduced-motion` guard; `lenis@1.3.26` already installed,
no package-manager runs). Zero Kodr copy/assets — layout rhythm only.

## Commits
- `feat(wave2-shell-home): kodr re-theme shell + home` (8 files: 7 allowed + SUMMARY)

## Key files (absolute)
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\index.html`
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\main.tsx`
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\App.tsx`
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\components\Navbar.tsx`
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\components\SpotlightFooter.tsx`
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\components\StickyEventsStack.tsx`
- `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\components\ProjectsMarquee.tsx`

## Per-file change list
- **index.html**: body `bg-[#07020E]` → `bg-black`; `selection:bg-purple-600` →
  `selection:bg-[#9553e6]`; favicon fill `%238B5CF6` → `%239553e6`; title →
  "AWS Student Builder Group GCOEK — Learn, Build, Ship to Cloud".
- **main.tsx**: `import Lenis from 'lenis'` + `initLenis()` (duration 1.15, smoothWheel,
  rAF loop, reduced-motion early-return). No other changes.
- **Navbar.tsx**: scrolled bg → `bg-black/90`; logo pins/stroke `#A855F7` → `#9553e6`,
  frame fill → `#000000`; active pill → CTA gradient; Join CTA + `button-bordercolor`;
  mobile drawer → `bg-black/95`, mobile active → `bg-[#9553e6]/30`.
- **App.tsx**: root `bg-black` + Kodr selection; ticker `IoT Core`/`Rekognition` colors →
  `#6feb2c`/`#9553e6`, bar → `bg-black/90`; hero H1 `font-clash` + `text-shadow-glow`,
  Explore CTA + `button-bordercolor`; stat cards + WHAT_WE_DO cards → `gradient-border`;
  toggles → CTA gradient; ALL `#4EF35E` → `#6feb2c`; surfaces → `#141414`/`#121212`/`black`;
  join modal → `bg-[#141414]` + `animate-card-entrance`; NEW mobile sticky CTA bar
  (`sm:hidden`, `bg-[#121212]/95`, CTA → join route) + 84px spacer. Routes/data untouched.
- **StickyEventsStack.tsx** (JSX ONLY, `STACKED_EVENTS` data byte-identical): section →
  `bg-black`; h2 `font-clash`; JSX lime → `#6feb2c` (14 spots); surfaces → `#141414`/
  `#121212`; step-nav/modal accents → `#9553e6`; card CTA + RSVP + confirm +
  `button-bordercolor`; modal + `animate-card-entrance`.
- **ProjectsMarquee.tsx** (data block incl. ids/links byte-identical): section/fades →
  `black`; h2 `font-clash`; NEW `KODR_BADGE_RAMP` + `kodrBadgeClass(id)` — card + modal
  badges render through Kodr ramp (`#9553e6`/`#6feb2c`/`#FF9900`), data `badgeColor`
  ignored at render; cards → `bg-[#141414]/90` + `gradient-border`; pills → `#141414`;
  [P2] modal GitHub/Live anchors now `{selectedProject.githubUrl ? … : null}` guarded;
  modal + `animate-card-entrance`; Launch CTA + `button-bordercolor`.
- **SpotlightFooter.tsx**: hero gradient `from-black`; logo `#A855F7` → `#9553e6`;
  watermark h2s → `font-clash`; lime → `#6feb2c` (5 spots); `#110524`/`#100624` surfaces
  → `#141414`. Giant `AWS COMMUNITY` watermark + spotlight + cols preserved.

## Carry-over resolutions (Wave 1 verification)
- [P0] body `bg-[#07020E]` → `#000`: DONE (index.html + App root + marquee section/fades).
- [P0] ~28 hardcoded pre-Kodr colors: DONE — `rg` shows ZERO remaining in scope files
  except 4 intentional data-block keeps (`StickyEventsStack:40,50,90`,
  `ProjectsMarquee:120`) which render through Kodr overrides; `purple-600` → 0 hits.
- [P1] per-project accents (`projects.ts` NOT touched — read-only): DONE via
  `KODR_BADGE_RAMP` render override in `ProjectsMarquee`.
- [P2] modal GitHub/Live dead anchors: DONE — conditional render guards.
- [P2] `animate-fade-in-*` audit: DONE — zero class usages anywhere; only `fadeInDown/Up`
  keyframes via inline styles in Wave-3 files (untouched, out of scope); keyframes already
  exist in `index.css`, no new utilities needed.
- [P1] font CDN fallback: N/A — Fontshare/Clash links + system fallbacks already in
  `index.html`, untouched.

## Self-Check: PASS
- Imports/JSX/Tailwind verified by re-reading every edited hunk; `cn/cva` N/A (no new
  components); responsive (`sm:`/`md:`/`lg:` present), dark base, a11y (aria-labels,
  roles, focus states) preserved from source; no `any` added; no npm run per ticket
  (build-relevant consistency verified by reading).
- Untouched per scope: TeamPage/TeamCard/ProjectsPage/ProjectDetailPage/EventsPage/
  ResourcesPage/JoinUsPage/CursorGlow/ThreeCanvas/InteractiveTerminal, `projects.ts`,
  `index.css`, `package.json`.

## Tests
- No test runner in repo (`npm test` script absent, no `__tests__`/playwright); UI
  carries no logic changes (styling + guards only). Visual verification deferred to
  vibe-verifier wave review.
- One self-caught incident: stray note text briefly inserted into `ProjectsMarquee.tsx`
  badge span — removed and verified clean via re-read + `rg`.

## Deviations
- SUMMARY placed at `.planning/kodr-wave2-shell-home-SUMMARY.md` (no
  `.planning/phases/{NN}-{slug}/` dir exists yet).
- `button-bordercolor` ring applied to primary CTAs (incl. small RSVP pills) per
  "CTA gradient + button-bordercolor ring" mandate; ring inherits each button's own
  radius via `border-radius: inherit`.

# ROADMAP-UNIVERSE — "Cloud Universe" R3F Full-Bleed Section

> Replaces the 3D-console card in the AWS Student Builder Club site with a full-bleed
> scroll-driven "Cloud Universe" R3F section (pure wow factor).
> Project root (absolute): `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity`
> Target section (absolute): `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\src\App.tsx`
> lines ~475-575 (`#interactive-section`: left copy column + right console card with `<ThreeCanvas />`).
> Stack: Vite 6 + React 19 + Tailwind v4 + three 0.173 + motion 12 + lenis +
> `@react-three/fiber` 9.8.1 + `@react-three/drei` 10.7.9 + `@react-three/postprocessing` 3.1.3.
> Palette (locked): `#000000` / `#9553e6` / `#6feb2c` / `#AC69FF` / `#7200FF`.
> Prior art preserved: `.planning/PROJECT.md`, `.planning/ROADMAP.md` (Kodr reskin — do NOT regress).

## Locked constraints (all phases)

- Copy MUST be preserved verbatim from `src\App.tsx` lines 487-541: badge
  `AWS STUDENT BUILDER ARCHITECTURE`, H2 `Architect. Build. Deploy. / Production Cloud Skills.`,
  paragraph `Join our college developer community…`, cards `01 Full-Stack Cloud` /
  `02 Free AWS Credits`, CTA `Join The Builder Club`. Only layout/overlay positioning may change.
- Fallbacks REQUIRED: `prefers-reduced-motion` static poster, mobile freeze (no scroll-driven
  animation loop on small viewports / touch), WebGL-fail poster + copy still readable.
- Perf REQUIRED: DPR capped (`dpr={[1, 1.75]}` or lower), lazy-loaded R3F (`React.lazy` +
  `Suspense`, canvas mounted on intersection only), no blocking of first paint.

## Wave / DAG overview

```
Wave 1:  Phase 1 (universe-foundation)
            ├─▶ Wave 2: Phase 2 (universe-scene) ──────┐
            └─▶ Wave 2: Phase 3 (universe-section) ────┤ (parallel-safe, disjoint files)
                                                       ▼
                                                   Wave 3: Phase 4 (universe-integration)
```

| # | Phase | Slug | Wave | DependsOn | files_modified | Status |
|---|-------|------|------|-----------|----------------|--------|
| 1 | Universe Foundation — tokens, types, fallback hooks, copy contract | `01-universe-foundation` | 1 | — | `src/universe/tokens.ts`, `src/universe/types.ts`, `src/universe/copy.ts`, `src/universe/hooks/*` | Not Started |
| 2 | Universe 3D Scene — canvas, starfield, core, post, perf | `02-universe-scene` | 2 | Phase 1 | `src/universe/scene/*`, `src/components/CloudUniverseCanvas.tsx` | Not Started |
| 3 | Universe Section Shell — full-bleed layout, scroll rig, poster/mobile/WebGL fallbacks | `03-universe-section` | 2 | Phase 1 | `src/components/CloudUniverseSection.tsx`, `src/App.tsx` (section block `475-575` only), `public/universe-poster.*` | Not Started |
| 4 | Universe Integration — deprecate console card, lazy wiring, verify | `04-universe-integration` | 3 | Phases 2+3 | `src/App.tsx` (import cleanup only), `e2e/universe.spec.*` or `scripts/verify-universe.*`, `README.md` (section note only) | Not Started |

Intra-wave overlap check: Wave 2 = Phase 2 (`src/universe/scene/*`, `src/components/CloudUniverseCanvas.tsx`)
vs Phase 3 (`src/components/CloudUniverseSection.tsx`, `src/App.tsx` section block, `public/universe-poster.*`)
— zero shared files. PASS. Phase 4 touches `src/App.tsx` imports only (not the section block owned by
Phase 3) + new verify/README files — sequenced in Wave 3, no parallel conflict.

---

### Phase 1 — Universe Foundation (Wave 1, no deps)

Ownership: design tokens, TS types, fallback-detection hooks, verbatim copy contract.
Files (absolute under `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity\`):
`src/universe/tokens.ts`, `src/universe/types.ts`, `src/universe/copy.ts`, `src/universe/hooks/*`.

Tasks for planner: (1) Kodr palette + fog/bloom constants in `tokens.ts`; (2) scene/section prop
types in `types.ts`; (3) verbatim copy export in `copy.ts` (copied character-for-character from
`src\App.tsx` 487-541, never reworded); (4) `usePrefersReducedMotion`, `useWebGLAvailable`,
`useIsMobileViewport`, `useInViewMount` hooks; (5) scroll-progress contract type shared by Phases 2+3.

Success criteria:

- [ ] `npm run build` exits 0
- [ ] `npx tsc --noEmit` zero errors
- [ ] `grep -c "AC69FF\|6feb2c\|7200FF" src/universe/tokens.ts` >= 3 (palette present)
- [ ] `grep -c "Production Cloud Skills" src/universe/copy.ts` >= 1 (copy contract present)
- [ ] `grep -rl "prefers-reduced-motion\|WebGL\|isMobile" src/universe/hooks/` returns >= 3 files

### Phase 2 — Universe 3D Scene (Wave 2, depends on Phase 1)

Ownership: all R3F scene internals + thin canvas wrapper. No layout, no copy, no `App.tsx` edits.
Files: `src/universe/scene/*` (e.g. `Starfield.tsx`, `CloudCore.tsx`, `OrbitRings.tsx`,
`Effects.tsx`, `Rig.tsx`), `src/components/CloudUniverseCanvas.tsx` (Canvas wrapper: DPR cap,
`frameloop` control, `Suspense` fallback, WebGL-fail render-prop).

Tasks for planner: (1) Canvas wrapper with `dpr={[1, 1.75]}`, `gl={{ antialias: true, powerPreference:
'high-performance' }}`, fail boundary; (2) instanced starfield/particle field in Kodr hues;
(3) hero Cloud Core (icosahedron/torus-knot + emissive `#9553e6`, lime `#6feb2c` accents);
(4) scroll-driven camera rig consuming Phase-1 progress contract (damped, frozen when reduced-motion);
(5) postprocessing (bloom/vignette) from `@react-three/postprocessing` with mobile-off switch.

Success criteria:

- [ ] `npm run build` exits 0
- [ ] `npx tsc --noEmit` zero errors
- [ ] `grep -c "dpr" src/components/CloudUniverseCanvas.tsx` >= 1 AND capped max <= 1.75
- [ ] `grep -c "frameloop\|useFrame" src/universe/scene/* src/components/CloudUniverseCanvas.tsx` >= 2
- [ ] Manual screenshot: full-bleed dark scene, purple core + lime accents visible, no console card remnant

### Phase 3 — Universe Section Shell (Wave 2, depends on Phase 1; parallel with Phase 2)

Ownership: full-bleed section layout, scroll wiring, overlay copy, all three fallbacks.
Files: `src/components/CloudUniverseSection.tsx`,
`src/App.tsx` (ONLY the `#interactive-section` block ~lines 475-575),
`public/universe-poster.*` (static poster image).

Tasks for planner: (1) full-bleed section (`relative w-full min-h-[220svh]`, sticky canvas stage +
scrolling copy overlays) using lenis + motion `useScroll`; (2) overlay copy imported from Phase-1
`copy.ts`, preserving badge/H2/paragraph/cards/CTA + `setIsJoinModalOpen` CTA wiring kept in `App.tsx`;
(3) reduced-motion poster swap via `usePrefersReducedMotion`; (4) mobile freeze (static frame/poster
under `md` breakpoint or touch); (5) WebGL-fail fallback (poster + fully readable copy, no blank stage).

Success criteria:

- [ ] `npm run build` exits 0
- [ ] `npx tsc --noEmit` zero errors
- [ ] `grep -c "React.lazy\|lazy(" src/components/CloudUniverseSection.tsx src/App.tsx` >= 1 (lazy-loaded)
- [ ] `grep -c "universe-poster\|prefers-reduced-motion\|WebGL" src/components/CloudUniverseSection.tsx` >= 3
- [ ] Manual screenshot (desktop + mobile widths): copy readable over scene; poster shows with JS/WebGL disabled

### Phase 4 — Universe Integration (Wave 3, depends on Phases 2+3)

Ownership: remove old console-card path, wire lazy section, perf + UAT verification. No new visuals.
Files: `src/App.tsx` (import cleanup: drop section-local `ThreeCanvas` console-card usage only —
`ThreeCanvas.tsx` file itself is NOT owned here), new `e2e/universe.spec.*` or
`scripts/verify-universe.*`, `README.md` (short section note only).

Tasks for planner: (1) delete console-card JSX (window header, `aws-mesh://cloud-core-v3`, drag hint),
keep modal/sticky-CTA logic untouched; (2) `React.lazy` + `Suspense` + intersection-mount wiring;
(3) perf pass: DPR cap honored, no eager three import on initial chunk (`grep` chunk check);
(4) screenshot-verified wow pass (desktop/mobile/poster/fallback matrix); (5) doc note in README.

Success criteria:

- [ ] `npm run build` exits 0
- [ ] `npx tsc --noEmit` zero errors
- [ ] `grep -c "aws-mesh://cloud-core-v3\|Click and drag inside" src/App.tsx` == 0 (console card gone)
- [ ] `grep -c "Production Cloud Skills" src/App.tsx src/components/CloudUniverseSection.tsx` >= 1 (copy preserved)
- [ ] Manual UAT matrix PASS: desktop scroll animates / mobile frozen+readable / reduced-motion poster / WebGL-off poster, all with CTA clickable

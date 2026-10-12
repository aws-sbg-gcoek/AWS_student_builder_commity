# PLAN-UNIVERSE — Same Cloud Universe Scroll Section

> Planner-only doc. No source code edited. No `npm` run. Executors implement per assignments below — do NOT reassign files.

## 0. Objective (locked)

Replace the `App.tsx` interactive block (`<section id="interactive-section">`, App.tsx:476-575) with a **sticky ~300vh scroll-driven Cloud Universe** section. All existing copy, CTAs, routes preserved. Lazy-loaded. Fallbacks for reduced-motion / mobile / WebGL-fail.

### 0.1 Section spec (authoritative)

- **Container:** `<section id="interactive-section">` — `position: sticky` canvas + `height: ~300vh` scroll track (`h-[300vh]`, inner sticky `top-0 h-screen`). Replaces current `py-24 … bg-black/95` block only.
- **Scene 1 — Nebula core + bloom (progress 0 → 0.33):** faceted gem core (reuse Kodr palette `0x9553e6 / 0x7200FF / 0xAC69FF`, lime nucleus `0x6FEB2C`) + additive glow sprites + starfield (~450 pts) + `@react-three/postprocessing` Bloom (`intensity ~0.9, luminanceThreshold ~0.15`). Slow idle rotation.
- **Scene 2 — Particle morph + camera dolly (progress 0.33 → 0.66):** single `THREE.Points` (mobile 4000 / desktop 9000 pts, size ~0.045, additive) morphing sphere (r=2.0) → torus (R=2.2, tube=0.55) → cloud (box-random ±3.2, seeded). Lerp positions in `useFrame` with smoothstep easing over each third. Camera dolly `z: 7.4 → 5.6 → 6.8`, `y: 1.6 → 0.6 → 1.1`, always `lookAt(0,0,0)`.
- **Scene 3 — Constellation network + CTA (progress 0.66 → 1.0):** 8 service nodes (octahedrons, colors `[#6FEB2C, #FFFFFF, #AC69FF]`), 3 thin torus rings (radii 2.0/2.55/3.1, matching current ThreeCanvas tilts), `LineSegments` core→node links (opacity 0.35), domestic HTML overlay CTA card (reuses preserved copy + `Join The Builder Club` button).
- **Copy/CTA/routes preserved verbatim** (see Task F-1): eyebrow `AWS STUDENT BUILDER ARCHITECTURE`, H2 `Architect. Build. Deploy.` + gradient `Production Cloud Skills.`, paragraph starting `Join our college developer community…`, cards `01 Full-Stack Cloud / React, Node.js, AWS Lambda & S3 pipelines` + `02 Free AWS Credits / Sponsored accounts, sandbox labs & certifications`, CTA `Join The Builder Club` → `setIsJoinModalOpen(true)`, footer hint `✦ Click and drag inside to rotate…` (adapted to `Scroll to travel the universe`). Anchor `id="interactive-section"` MUST survive (hero `Explore Program` button `document.getElementById('interactive-section')?.scrollIntoView`, App.tsx:309).
- **Lazy:** `React.lazy(() => import('./CloudUniverse/Scene'))` behind `UniverseLoader` + `<Suspense fallback={<UniverseFallback/>}>`. `three` / `@react-three/*` must NOT enter initial chunk (devops manualChunks).
- **Fallbacks:** `prefers-reduced-motion` → static `UniverseFallback`; mobile (`<768px` or `deviceMemory<=4` / `hardwareConcurrency<=4`) → capped DPR + reduced particles OR static fallback; WebGL context creation fail / `!WebGLRenderingContext` → `UniverseFallback` with full copy + CTA (CTA must work with zero WebGL).

### 0.2 Stack (already installed — NO new deps)

`three@^0.173.0`, `@react-three/fiber@^9.8.1`, `@react-three/drei@^10.7.9`, `@react-three/postprocessing@^3.1.3`, `lenis@^1.3.26` (main.tsx Lenis smoothing stays), `motion@^12.4.7`, Tailwind v4 (`src/index.css` `@theme` tokens). No `npm install` by any agent (orchestrator only per PROJECT.md).

---

## 1. File ownership (DO NOT REASSIGN)

| Owner | Owns (create/edit/delete) | Absolute paths |
|---|---|---|
| **backend** | capability hook + lazy wrapper | `src/components/CloudUniverse/useWebGL.ts` (new), `src/components/CloudUniverse/UniverseLoader.tsx` (new) |
| **frontend** | 5 scene files (new) + App section rewrite + 2 deletions | `src/components/CloudUniverse/Scene.tsx`, `src/components/CloudUniverse/MorphField.tsx`, `src/components/CloudUniverse/CoreGem.tsx`, `src/components/CloudUniverse/Constellation.tsx`, `src/components/CloudUniverse/ScrollRig.tsx` (all new); `src/App.tsx` (edit section only); DELETE `src/components/ThreeCanvas.tsx`, DELETE `src/components/InteractiveTerminal.tsx` |
| **designer** | static fallback + CSS utilities only | `src/components/UniverseFallback.tsx` (new); `src/index.css` (APPEND universe utilities only) |
| **devops** | chunk split only | `vite.config.ts` (add `build.rollupOptions.output.manualChunks` only) |
| **tester** | verification protocol (no source edits) | no files; produces pass/fail report |

Dependency order: backend + designer (parallel, no shared files) → frontend (imports both) → devops (chunk split, after imports stable) → tester (verifies all).

---

## 2. Backend agent — `useWebGL.ts` + `UniverseLoader.tsx`

### Task B-1 — `useWebGL.ts`: capability hook
- **Action:** Create `src/components/CloudUniverse/useWebGL.ts` exporting `export function useWebGL(): { supported: boolean; reason: 'ok' | 'no-webgl' | 'reduced-motion' | 'low-power-mobile'; isMobile: boolean; prefersReducedMotion: boolean }`. Implementation: `prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches`; `isMobile = window.matchMedia('(max-width: 768px)').matches || (navigator as any).deviceMemory <= 4 || navigator.hardwareConcurrency <= 4`; `supported = !prefersReducedMotion && !!window.WebGLRenderingContext && (() => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } })()`; `reason` derived in priority `reduced-motion > no-webgl > low-power-mobile(isMobile&&!supported…else 'ok')`. No side effects, no three import (zero-cost gate).
- **Acceptance:** `grep -q "export function useWebGL" src/components/CloudUniverse/useWebGL.ts`; `grep -q "prefers-reduced-motion" src/components/CloudUniverse/useWebGL.ts`; `grep -q "webgl2" src/components/CloudUniverse/useWebGL.ts`; file imports zero packages (`grep -c "^import" == 0` except types).

### Task B-2 — `UniverseLoader.tsx`: lazy wrapper + gate
- **Action:** Create `src/components/CloudUniverse/UniverseLoader.tsx` exporting `export function UniverseLoader(props: { onJoinClick: () => void })`. Body: `const cap = useWebGL(); const Scene = React.lazy(() => import('./Scene')); if (!cap.supported) return <UniverseFallback onJoinClick={props.onJoinClick} reason={cap.reason} />; return (<React.Suspense fallback={<UniverseFallback onJoinClick={props.onJoinClick} reason="ok" />}><Scene onJoinClick={props.onJoinClick} isMobile={cap.isMobile} /></React.Suspense>)`. Import `UniverseFallback` from `../UniverseFallback`. No direct `three`/`@react-three/*` imports in this file (keeps gate chunk-free).
- **Acceptance:** `grep -q "React.lazy" src/components/CloudUniverse/UniverseLoader.tsx`; `grep -q "UniverseFallback" src/components/CloudUniverse/UniverseLoader.tsx`; `grep -q "useWebGL" src/components/CloudUniverse/UniverseLoader.tsx`; `! grep -q "from 'three'"` and `! grep -q "@react-three"` in this file.

### Backend don't-touch
- MUST NOT touch `src/App.tsx`, `src/index.css`, `vite.config.ts`, `src/components/UniverseFallback.tsx`, any `CloudUniverse/Scene|MorphField|CoreGem|Constellation|ScrollRig` file. MUST NOT delete anything. MUST NOT add dependencies.

---

## 3. Frontend agent — scenes + App rewrite + deletions

### Task F-1 — `App.tsx` section rewrite (preserve copy/routes)
- **Action:** In `src/App.tsx`, replace ONLY the `<section id="interactive-section">…</section>` block (lines ~476-575) with: same `<section id="interactive-section" className="relative bg-black/95 border-b border-purple-900/30 universe-track">` containing (a) preserved left-column copy block verbatim — eyebrow `AWS STUDENT BUILDER ARCHITECTURE` with `Sparkles` icon, H2 `Architect. Build. Deploy.<br/>` + gradient span `Production Cloud Skills.`, paragraph `Join our college developer community to master modern serverless architectures, microservices, containerization, and AWS Bedrock GenAI models. Every workshop includes hands-on labs and project reviews.`, grid cards `01 / Full-Stack Cloud / React, Node.js, AWS Lambda & S3 pipelines` and `02 / Free AWS Credits / Sponsored accounts, sandbox labs & certifications`, CTA `<button onClick={() => setIsJoinModalOpen(true)}>Join The Builder Club <ArrowRight/></button>` with existing classes `purple-glow-btn button-bordercolor … rounded-full`; (b) `<UniverseLoader onJoinClick={() => setIsJoinModalOpen(true)} />` replacing the `ThreeCanvas` console card. Keep `import { UniverseLoader } from './components/CloudUniverse/UniverseLoader'`; REMOVE `import { ThreeCanvas }`. Keep `id="interactive-section"` string exactly. Do NOT alter hash-router state, `navigateTo`, hero, ticker, `WHAT_WE_DO`, events/projects/footer, join modal.
- **Acceptance:** `grep -q 'id="interactive-section"' src/App.tsx`; `grep -q "UniverseLoader" src/App.tsx`; `grep -q "Join The Builder Club" src/App.tsx`; `grep -q "AWS STUDENT BUILDER ARCHITECTURE" src/App.tsx`; `! grep -q "ThreeCanvas" src/App.tsx`; `grep -q "setIsJoinModalOpen(true)" src/App.tsx`.

### Task F-2 — `ScrollRig.tsx`: sticky 300vh + progress bus
- **Action:** Create `src/components/CloudUniverse/ScrollRig.tsx` exporting `export function ScrollRig(props: { children: (progress: number) => React.ReactNode })`. Structure: `<div className="universe-track relative h-[300vh]">` > `<div className="universe-sticky sticky top-0 h-screen overflow-hidden">` > children(progress). Progress via `useRef` + `requestAnimationFrame`-throttled scroll listener: `progress = clamp((window.scrollY - trackTop) / (trackHeight - viewportH), 0, 1)` computed from `getBoundingClientRect`. Respect Lenis (uses native scrollY, compatible). Export helper `export function sceneFor(progress: number): 0|1|2` (`<0.33→0`, `<0.66→1`, else `2`). No three import here.
- **Acceptance:** `grep -q "h-\[300vh\]" src/components/CloudUniverse/ScrollRig.tsx`; `grep -q "sticky top-0 h-screen" src/components/CloudUniverse/ScrollRig.tsx`; `grep -q "sceneFor" src/components/CloudUniverse/ScrollRig.tsx`.

### Task F-3 — `Scene.tsx`: Canvas + bloom + wiring
- **Action:** Create `src/components/CloudUniverse/Scene.tsx` exporting `export function Scene(props: { onJoinClick: () => void; isMobile: boolean })`. `<Canvas dpr={props.isMobile ? [1, 1.25] : [1, 1.75]} camera={{ position: [0, 1.6, 7.4], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>` with `<ScrollRig>` inside? (Note: ScrollRig is DOM wrapper — Scene renders `<ScrollRig>{(p) => (<><CoreGem progress={p}/><MorphField progress={p} isMobile={props.isMobile}/><Constellation progress={p} visible={p > 0.6}/></>)}</ScrollRig>` plus `<EffectComposer><Bloom intensity={0.9} luminanceThreshold={0.15} mipmapBlur /></EffectComposer>` from `@react-three/postprocessing`, ambient+directional+2 point lights (`#9553e6` intensity 30 distance 20, `#6FEB2C` intensity 14). Drag-rotate group (pointer handlers, inertia decay 0.94, same feel as old ThreeCanvas) + `frameloop="always"`. CTA overlay HTML (absolute, pointer-events auto on button only) rendered when `sceneFor(p)===2` with preserved `Join The Builder Club` calling `props.onJoinClick`.
- **Acceptance:** `grep -q "EffectComposer" src/components/CloudUniverse/Scene.tsx`; `grep -q "Bloom" src/components/CloudUniverse/Scene.tsx`; `grep -q "MorphField" src/components/CloudUniverse/Scene.tsx`; `grep -q "CoreGem" src/components/CloudUniverse/Scene.tsx`; `grep -q "Constellation" src/components/CloudUniverse/Scene.tsx`; `grep -q "onJoinClick" src/components/CloudUniverse/Scene.tsx`.

### Task F-4 — `CoreGem.tsx` (Scene 1) + `MorphField.tsx` (Scene 2)
- **Action:** `CoreGem.tsx`: `export function CoreGem(props: { progress: number })` — icosahedron solid (`color #1C0745, emissive #9553e6, emissiveIntensity 0.42+pulse, metalness 0.65, roughness 0.25, flatShading`), wire shell (`#AC69FF`, opacity 0.5, r=1.32), lime nucleus (`#6FEB2C`, r=0.34), 2 additive glow sprites (purple 5.2 / lime 2.2), starfield 450 pts (lavender/white). Opacity/scale fade out as `progress → 0.33→0.5` (`group.visible = progress < 0.55`). `MorphField.tsx`: `export function MorphField(props: { progress: number; isMobile: boolean })` — `THREE.Points` count `isMobile ? 4000 : 9000`, `PointsMaterial size 0.045 vertexColors additive depthWrite false`; precompute Float32Arrays `sphere(r=2.0, fibonacci)`, `torus(R=2.2, tube=0.55)`, `cloud(random ±3.2, seeded LCG seed=42)`; per-frame lerp with smoothstep between targets across progress windows `[0.30–0.50]` and `[0.55–0.75]`; colors lerp `#9553E6 → #6FEB2C → #AC69FF`; `visible = progress > 0.25`.
- **Acceptance:** `grep -q "Icosahedron" src/components/CloudUniverse/CoreGem.tsx`; `grep -q "MorphField" src/components/CloudUniverse/MorphField.tsx`; `grep -q "9000\|4000" src/components/CloudUniverse/MorphField.tsx`; `grep -q "torus\|Torus" src/components/CloudUniverse/MorphField.tsx` (case-insensitive match on geometry math).

### Task F-5 — `Constellation.tsx` (Scene 3) + deletions
- **Action:** `Constellation.tsx`: `export function Constellation(props: { progress: number; visible: boolean })` — 3 torus rings (radii 2.0/2.55/3.1, tube 0.012, tilts `PI/2.6, PI/3.4, PI/2.1`, opacity ramps in with `progress>0.66`), 8 octahedron nodes (`0.11`, colors cycle `[#6FEB2C,#FFFFFF,#AC69FF]`) with sprite halos (0.55), `LineSegments` core→node links (`#9553e6`, opacity 0.35) updated per frame. Then DELETE `src/components/ThreeCanvas.tsx` and `src/components/InteractiveTerminal.tsx` via `git rm` (both superseded; InteractiveTerminal is already unused — zero imports outside itself — so deletion is safe). Confirm no remaining imports.
- **Acceptance:** `grep -q "LineSegments\|lineSegments" src/components/CloudUniverse/Constellation.tsx`; `test ! -f src/components/ThreeCanvas.tsx`; `test ! -f src/components/InteractiveTerminal.tsx`; `! grep -rn "ThreeCanvas\|InteractiveTerminal" src/ --include="*.tsx" | grep -v PLAN` (no dangling imports).

### Frontend don't-touch
- MUST NOT touch `src/components/CloudUniverse/useWebGL.ts`, `src/components/CloudUniverse/UniverseLoader.tsx`, `src/components/UniverseFallback.tsx`, `src/index.css`, `vite.config.ts`. MUST NOT add deps. MUST NOT alter any `App.tsx` code outside the `interactive-section` block + its import line. MUST NOT touch `main.tsx` (Lenis), `Navbar`, hash-router, `src/data/*`.

---

## 4. Designer agent — `UniverseFallback.tsx` + `index.css` utilities

### Task D-1 — `UniverseFallback.tsx`: static no-WebGL experience
- **Action:** Create `src/components/UniverseFallback.tsx` exporting `export function UniverseFallback(props: { onJoinClick: () => void; reason: string })`. Static composition only (no three imports): `bg-purple-atmosphere` + `bg-hero-grid` layers, watermark `AWS` (`watermark-outline text-[19vw]`), core visual via CSS radial-gradients (purple `#9553E6` 550px blur + lime `#6FEB2C` ring), eyebrow `AWS STUDENT BUILDER ARCHITECTURE`, H2 + paragraph + 01/02 cards (same copy as F-1), CTA `Join The Builder Club` → `props.onJoinClick` with `purple-glow-btn button-bordercolor` classes, hint line `Static preview — your device turned the 3D universe off, but the community is fully open.`. `role="img" aria-label="Static Cloud Universe preview"`.
- **Acceptance:** `grep -q "UniverseFallback" src/components/UniverseFallback.tsx`; `grep -q "onJoinClick" src/components/UniverseFallback.tsx`; `grep -q "Join The Builder Club" src/components/UniverseFallback.tsx`; `! grep -q "three" src/components/UniverseFallback.tsx` (case-insensitive).

### Task D-2 — `index.css`: universe utilities ONLY (append-only)
- **Action:** APPEND ONLY to `src/index.css` (no edits to existing tokens/rules): `.universe-track { position: relative; }`, `.universe-sticky { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; }`, `.universe-fallback-grid` (reuse hero-grid gradient), `.universe-cta-overlay { pointer-events: none; } .universe-cta-overlay button { pointer-events: auto; }`, `@media (prefers-reduced-motion: reduce) { .universe-track canvas { display: none; } }`. Use palette vars only (`#9553E6, #7200FF, #AC69FF, #6FEB2C, #141414`). No new `@theme` tokens, no font changes.
- **Acceptance:** `grep -q "universe-track" src/index.css`; `grep -q "universe-sticky" src/index.css`; `grep -q "prefers-reduced-motion" src/index.css`; `git diff --stat src/index.css` shows additions only in universe block (reviewer confirms no existing lines modified).

### Designer don't-touch
- MUST NOT touch `src/App.tsx`, `vite.config.ts`, anything under `src/components/CloudUniverse/`, any other component, `src/data/*`, `index.html`, `src/main.tsx`. `index.css` edits LIMITED to appended `.universe-*` block.

---

## 5. DevOps agent — `vite.config.ts` manualChunks ONLY

### Task O-1 — chunk split
- **Action:** In `vite.config.ts`, add ONLY `build: { chunkSizeWarningLimit: 1200, rollupOptions: { output: { manualChunks: { 'three-vendor': ['three'], 'r3f-vendor': ['@react-three/fiber', '@react-three/drei'], 'post-vendor': ['@react-three/postprocessing', 'postprocessing'] } } } }`. Preserve existing `plugins`, `resolve.alias`, `server`, `preview`. No new plugins, no base/define/env changes.
- **Acceptance:** `grep -q "manualChunks" vite.config.ts`; `grep -q "three-vendor" vite.config.ts`; `grep -q "r3f-vendor" vite.config.ts`; `git diff vite.config.ts` touches only `build` key (reviewer confirms plugins/alias/server intact).

### DevOps don't-touch
- MUST NOT touch any `src/**` file. MUST NOT run `npm install` (orchestrator owns installs). MUST NOT change build scripts.

---

## 6. Tester agent — verification protocol (no source edits)

### Task T-1 — static + build gates
1. `grep -c "id=\"interactive-section\"" src/App.tsx` == 1; `! grep -rn "ThreeCanvas" src/`; `! grep -rn "InteractiveTerminal" src/`; `grep -q "manualChunks" vite.config.ts`; `grep -q "universe-sticky" src/index.css`.
2. `tsc --noEmit` exits 0 (run via orchestrator — tester never runs `npm`, requests run).
3. `vite build` exits 0; `dist/assets/three-vendor-*.js` exists (lazy chunk split proof); initial bundle contains zero `three` (check `grep -L three dist/assets/index-*.js` or chunk report).
4. Fallback matrix (manual, real browser): (a) `prefers-reduced-motion` → static fallback + CTA clickable → join modal opens; (b) WebGL disabled (`--disable-gpu` / `about:config webgl.disabled`) → fallback + CTA works; (c) mobile 390×844 → section scrolls 300vh smoothly, no jank/blocked CTA; (d) desktop scroll top→bottom → 3 scenes appear in order (nebula → morph → constellation+CTA), camera visibly dollies; (e) hero `Explore Program` scrolls to universe; (f) hash routes `#team #projects #events #resources #join` all still resolve.
- **Acceptance:** report table with PASS/FAIL per gate + `tsc`/`build` logs attached. FAIL on any missing copy string (`AWS STUDENT BUILDER ARCHITECTURE`, `Join The Builder Club`, `Full-Stack Cloud`, `Free AWS Credits`).

### Tester don't-touch
- MUST NOT edit any source file. Findings go in test report only.

---

## 7. Global don't-touch rules (all agents)

1. Hash-router in `App.tsx` (all `currentPage`/`navigateTo`/`hashchange` logic), `Navbar`, `TeamPage/ProjectsPage/ProjectDetailPage/EventsPage/ResourcesPage/JoinUsPage`, `StickyEventsStack`, `ProjectsMarquee`, `SpotlightFooter`, `CursorGlow`, `src/data/*`, `src/firebase.ts`, `src/main.tsx` (Lenis init), `index.html` (fonts), existing `@theme` tokens — all FROZEN.
2. Palette lock: `#9553E6 / #7200FF / #AC69FF / #6FEB2C / #141414 / #121212` + `font-clash / font-mono` only. No new colors/fonts/deps.
3. `id="interactive-section"` and `Join The Builder Club → setIsJoinModalOpen(true)` / `onJoinClick → navigateTo('join')` wiring must survive every change.
4. Only `index.css` writer is designer; only `vite.config.ts` writer is devops; only `App.tsx` editor is frontend. Backend owns its two files exclusively.

## 8. Wave plan

- **Wave 1 (parallel):** B-1, B-2 (backend) + D-1, D-2 (designer) — disjoint files.
- **Wave 2:** F-1…F-5 (frontend, needs `UniverseLoader` + `UniverseFallback` import targets to exist).
- **Wave 3:** O-1 (devops, after all imports stable so chunks resolve).
- **Wave 4:** T-1 (tester, full verification).

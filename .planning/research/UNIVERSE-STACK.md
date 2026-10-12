# UNIVERSE-STACK — Cloud Universe 3D background research

> Project root: `C:\Users\Shardul Kolekar\Desktop\AWS\Website new\AWS_student_builder_commity`
> Locked stack (from `package.json` — DO NOT change): `react@19` + `react-dom@19` ·
> `@react-three/fiber@9.8.1` (R3F v9) · `@react-three/drei@10.7.9` · `@react-three/postprocessing@3.1.3` ·
> `three@0.173.0` + `@types/three@0.173.0` · `motion@12.4.7` (`useScroll`) · `lenis@1.3.26` ·
> `vite@6.1.0` + `@vitejs/plugin-react@4.3.4` · `tailwindcss@4.0.6`
> Existing 3D today: `src/components/ThreeCanvas.tsx` (raw `three`, NOT R3F — icosahedron core +
> wire shell + lime nucleus + 3 torus rings + Points starfield + pointer-drag world).
> Existing smooth scroll: `src/main.tsx` `initLenis()` (Lenis + rAF, reduced-motion guard).
> Palette tokens: `src/index.css` (`#AC69FF→#7200FF` gradient, `#141414` cards, lime `#6feb2c`).

---

## 1. Version-compat notes (read before writing any 3D code)

### 1a. R3F v9 + React 19 (fiber `^9.8.1`, react `^19.0.0`, `@types/react ^19.0.8`)

- R3F v9 **requires React 19**. Do not downgrade React, do not install `fiber@8`
  (v8 breaks on React 19's reconciler). Current `package.json` pair is correct.
- v9 API changes vs old tutorials (most StackOverflow / v8 blog posts are WRONG for this repo):
  - `extend()` is no longer needed for built-in three objects — `<mesh>`, `<points>`,
    `<bufferGeometry>` etc. work out of the box with correct TS types via `ThreeElements`.
  - TS: use `useRef<THREE.Points>(null!)` / `useFrame((state, delta) => …)` — typed from
    `@react-three/fiber`. Do **not** add a global JSX namespace shim.
  - `<Canvas frameloop="demand">` + `invalidate()` still supported — use for mobile-freeze (§7).
  - StrictMode (enabled in `src/main.tsx`) double-mounts effects in dev. Every
    `useEffect` creating GPU resources must dispose (geometries, materials, textures,
    render targets) in its cleanup — copy the traverse-dispose pattern already in
    `ThreeCanvas.tsx` lines 335–363.
- Gotcha: R3F v9 + Vite 6 HMR sometimes keeps a stale WebGL context after editing a
  shader file. If canvas goes black after edit, full page reload (not HMR) fixes it.
  Not a bug in your code.

### 1b. drei v10 + three 0.173 (`@react-three/drei@10.7.9`, `three@0.173.0`)

- drei v10 **requires fiber v9 + React 19** — matches this repo. Do not follow guides
  that pin `drei@9` (that pulls fiber v8 peer deps).
- three `0.173`: `useLegacyLights` was **removed** — lighting is always physically
  correct. Consequence: `PointLight` intensity is in candela; small values like
  `intensity={1}` look almost black at distance 4–6. The existing raw scene already
  accounts for this (`PointLight(PURPLE, 30, 20)`, lime `14`, rim `20` in
  `ThreeCanvas.tsx` lines 56–64) — **keep these magnitudes** when porting lights
  into R3F (`<pointLight intensity={30} distance={20} />`, with `decay={2}` default).
- `outputColorSpace`: default is already `SRGBColorSpace` in 0.173. Do NOT set the
  removed `renderer.outputEncoding` / `THREE.sRGBEncoding` (any tutorial mentioning
  it is pre-r152 and wrong here).
- drei imports pull `three-stdlib` — already a transitive dep, no install needed.
  Import only what you use (`Sparkles`, `Float`) so Vite tree-shakes the rest;
  importing all of drei bloats the hero chunk by ~200 KB.
- `Sparkles` + `Float` are pure CPU-side helpers (no extra peer deps) — safe on
  three 0.173. `AdaptiveDpr` exists in drei v10 but is optional — prefer the manual
  `dpr` cap pattern in §4 (one line, no extra subscription).

### 1c. `@react-three/postprocessing@3.1.3` + R3F v9 (postprocessing lib v3)

- v3 of the wrapper targets **fiber v9 only** (v2 targets fiber v8). Current pin is
  correct — do not "fix" it to v2.
- Import bloom from the wrapper, never construct manually:
  `import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'`.
- Mandatory perf pairing: when `EffectComposer` is mounted, set
  `<Canvas gl={{ antialias: false }}>` — the composer does its own MSAA
  (`multisampling={4}`); leaving canvas AA on pays the MSAA cost twice.
- `Bloom` props in this version are flat (`intensity`, `luminanceThreshold`,
  `luminanceSmoothing`, `mipmapBlur`), NOT `<UnrealBloomPass resolution=… />`.
  (The underlying pass *is* UnrealBloom — `mipmapBlur` enables its fast path.)
- SSR/none — this is a Vite SPA, no Next.js SSR concern. But `EffectComposer`
  must live **inside** `<Canvas>`; mounting it outside throws `No Canvas context`.
- Cost warning: bloom at full DPR on a fullscreen hero is the single most expensive
  item. Combine with §4 DPR cap and §7 mobile freeze, or low-end Android will drop
  to ~20 fps.

### 1d. motion 12 `useScroll` + lenis 1.3 (NO GSAP)

- `motion@12.4.7` package name is `motion` (not `framer-motion`). Import from
  `motion/react`: `import { useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'`.
- `useScroll({ target: ref, offset: ['start end', 'end start'] })` works with Lenis
  1.3 native scroll (Lenis animates real `window.scroll`, so scroll-linked values
  stay correct). Do NOT add GSAP/ScrollTrigger — rejected: extra 70 KB + two scroll
  drivers fighting Lenis.
- Existing conflict to know: `src/index.css` sets `html { scroll-behavior: smooth }`
  AND `src/main.tsx` runs Lenis. Both active = double-smoothing on anchor jumps.
  Universe scroll rigs must drive **three uniforms via `useFrame`**, never call
  `window.scrollTo` themselves, so they are unaffected — but flag to frontend agent:
  do not add a third smoother.
- Lenis instance in `main.tsx` is module-scoped (no cleanup on HMR). Universe code
  must not create a second Lenis instance.

---

## 2. Copy-paste pattern A — lazy Canvas via `React.lazy` + `Suspense` (below-fold 3D)

Why: `three` + `drei` + `postprocessing` ≈ 600–800 KB. The Universe section sits
below the hero — it must not block first paint. Split it into its own chunk.

```tsx
// src/components/UniverseSection.tsx
import React, { Suspense } from 'react';

// three/fiber/drei/postprocessing live ONLY inside this chunk
const UniverseCanvas = React.lazy(() =>
  import('./UniverseCanvas').then((m) => ({ default: m.UniverseCanvas }))
);

export function UniverseSection() {
  return (
    <section id="universe" className="relative bg-black py-24 overflow-hidden">
      {/* Fixed-height fallback reserves layout → no CLS while chunk loads */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="w-full h-[520px] sm:h-[620px] bg-[#0a0a0f]"
          />
        }
      >
        <UniverseCanvas />
      </Suspense>
    </section>
  );
}
```

```tsx
// src/components/UniverseCanvas.tsx
import { Canvas } from '@react-three/fiber';

export function UniverseCanvas() {
  return (
    <div className="w-full h-[520px] sm:h-[620px]">
      <Canvas
        camera={{ position: [0, 0.6, 8], fov: 45 }}
        dpr={[1, 1.75]}               // see §4
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* scene contents … */}
      </Canvas>
    </div>
  );
}
```

Rules: never `import * as THREE` or `@react-three/*` in `App.tsx` or above-the-fold
files — that defeats the split. Fallback `div` height must equal the canvas height.

---

## 3. Copy-paste pattern B — UnrealBloom via `@react-three/postprocessing`

```tsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

function UniverseEffects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null; // mobile / reduced-motion / WebGL-weak → skip composer
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={1.15}
        luminanceThreshold={0.15}   // Kodr purple/lime emissives sit above this; near-black bg stays clean
        luminanceSmoothing={0.25}
        mipmapBlur                    // fast UnrealBloom path
      />
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
    </EffectComposer>
  );
}
```

Tuning for this palette: emissive core (`#9553e6`, `emissiveIntensity ~0.4–0.6` per
`ThreeCanvas.tsx` line 80) + lime nucleus (`#6feb2c`) should bloom; keep
`luminanceThreshold ≥ 0.15` so the `#000` page bg never blooms into grey haze.
If bloom looks blown out on bright displays, lower `intensity` to `0.85` first,
not the threshold.

---

## 4. Copy-paste pattern C — adaptive DPR cap

```tsx
<Canvas
  dpr={[1, 1.75]}
  gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
  // …
>
```

- `[1, 1.75]` = R3F clamps `devicePixelRatio` into this range. Matches existing raw
  cap `Math.min(devicePixelRatio, 1.5)` in `ThreeCanvas.tsx` line 48, raised slightly
  because bloom resolves better at 1.75 on desktop.
- Optional runtime step-down (only if jank observed on review videos): track avg
  frame delta in `useFrame`, and if `delta > 0.05` for 60 consecutive frames, call
  `state.setDpr(1)`. Do not ship this pre-emptively — static cap is enough for v1.
- Never use `dpr={window.devicePixelRatio}` unbounded — 3x phones render 9x pixels
  and melt.

---

## 5. Copy-paste pattern D — particle morph shader (sphere → torus → cloud)

Design: one `THREE.Points` (N ≈ 6000 desktop / 2500 mobile), three precomputed
position attributes, `uMorph` uniform lerps sphere→torus in [0,1] and torus→cloud
in [1,2]. Scroll (§6) drives the target; `useFrame` damps toward it so motion is
buttery under Lenis.

```tsx
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const MORPH_VERT = /* glsl */ `
  attribute vec3 aSphere;
  attribute vec3 aTorus;
  attribute vec3 aCloud;
  uniform float uMorph;   // 0 = sphere, 1 = torus, 2 = cloud
  uniform float uTime;
  uniform float uSize;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p;
    vec3 cA = vec3(0.584, 0.325, 0.902); // #9553e6 Kodr purple
    vec3 cB = vec3(0.435, 0.922, 0.173); // #6feb2c lime
    vec3 cC = vec3(0.674, 0.412, 1.0);   // #ac69ff lavender
    if (uMorph < 1.0) {
      p = mix(aSphere, aTorus, uMorph);
      vColor = mix(cA, cB, uMorph);
    } else {
      float k = uMorph - 1.0;
      p = mix(aTorus, aCloud, k);
      vColor = mix(cB, cC, k);
    }
    // gentle breathing so the cloud never looks frozen
    p += 0.06 * sin(uTime * 0.8 + p.y * 2.0 + p.x) * normalize(p + 0.0001);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (140.0 / -mv.z);
    float depth = smoothstep(-14.0, 2.0, mv.z);
    vAlpha = (1.0 - depth) * 0.9 + 0.1;
  }
`;

const MORPH_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float disc = smoothstep(0.5, 0.08, d); // soft round sprite, no texture needed
    gl_FragColor = vec4(vColor, vAlpha * disc);
  }
`;

function buildShapes(count: number, isMobile: boolean) {
  const n = isMobile ? Math.floor(count / 2.4) : count;
  const sphere = new Float32Array(n * 3);
  const torus = new Float32Array(n * 3);
  const cloud = new Float32Array(n * 3);
  const R = 2.1, TORUS_R = 2.35, TUBE = 0.55;
  for (let i = 0; i < n; i++) {
    // sphere (fibonacci for even coverage)
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    sphere.set(
      [R * Math.sin(phi) * Math.cos(theta), R * Math.cos(phi), R * Math.sin(phi) * Math.sin(theta)],
      i * 3
    );
    // torus
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    torus.set(
      [(TORUS_R + TUBE * Math.cos(v)) * Math.cos(u), TUBE * Math.sin(v), (TORUS_R + TUBE * Math.cos(v)) * Math.sin(u)],
      i * 3
    );
    // cloud (gaussian blob, flattened y)
    const g = () => (Math.random() + Math.random() + Math.random() - 1.5) * 1.6;
    cloud.set([g() * 1.8, g() * 1.0, g() * 1.8], i * 3);
  }
  return { n, sphere, torus, cloud };
}

export function MorphParticles({
  morphRef, // React.MutableRefObject<number> — written by the scroll rig (§6), read here
}: {
  morphRef: React.MutableRefObject<number>;
}) {
  const points = useRef<THREE.Points>(null!);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const shapes = useMemo(() => buildShapes(6000, isMobile), [isMobile]);
  const uniforms = useMemo(
    () => ({
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: isMobile ? 2.6 : 3.4 },
    }),
    [isMobile]
  );

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    uniforms.uTime.value += d;
    // critically-damped approach → no jitter when Lenis scrolls fast
    uniforms.uMorph.value += (morphRef.current - uniforms.uMorph.value) * (1 - Math.exp(-4 * d));
    points.current.rotation.y += d * 0.05;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[shapes.sphere, 3]} />
        <bufferAttribute attach="attributes-aSphere" args={[shapes.sphere, 3]} />
        <bufferAttribute attach="attributes-aTorus" args={[shapes.torus, 3]} />
        <bufferAttribute attach="attributes-aCloud" args={[shapes.cloud, 3]} />
      </bufferGeometry>
      <shaderMaterial
        args={[{ vertexShader: MORPH_VERT, fragmentShader: MORPH_FRAG, uniforms }]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
```

Notes for implementer:

- `frustumCulled={false}` is required — morphed positions exceed the base bounding
  sphere and would otherwise pop out of view when the camera moves.
- R3F v9 `bufferAttribute` needs `args={[array, itemSize]}` (v8 `attach` object form
  is deprecated). Copy the form above verbatim.
- Additive blending on near-black bg = Kodr glow for free; keep the hero grid CSS
  behind the canvas, not inside it.
- `uSize` uses perspective attenuation (`140 / -mv.z`) so particles shrink with
  distance — tune `2.2–3.8` only.

---

## 6. Copy-paste pattern E — scroll rig with `motion` `useScroll` (no GSAP)

The DOM owns scroll truth; three only reads a ref. No `ScrollTrigger`, no
`ScrollControls` from drei (its scroll hijacks page scroll — wrong for a section
embedded in a long page).

```tsx
import { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'motion/react';

// Lives OUTSIDE <Canvas> (DOM side). Shares morphRef with MorphParticles.
export function useUniverseScroll(morphRef: React.MutableRefObject<number>) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'], // 0 when section enters, 1 when it leaves
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 });

  useMotionValueEvent(smooth, 'change', (v) => {
    // map scroll 0→1 onto morph 0→2 (sphere → torus → cloud)
    morphRef.current = v * 2;
  });

  return sectionRef;
}
```

Wiring:

```tsx
const morphRef = useRef(0);
const sectionRef = useUniverseScroll(morphRef);

<section ref={sectionRef} id="universe">
  <UniverseCanvas morphRef={morphRef} />
</section>
```

- Pass `morphRef` through props into `<Canvas>` children (refs cross the Canvas
  boundary fine — only context doesn't).
- Rotation-by-scroll (optional): add a second `useMotionValueEvent` writing
  `rotationRef.current = v * Math.PI * 1.5`, consumed in the same `useFrame`.
- Reduced-motion: if `useReducedMotion()` is true, skip the hook body entirely and
  set `morphRef.current = 1` once (rest on the torus — the most photogenic shape).

---

## 7. Copy-paste pattern F — fallbacks (reduced-motion + WebGL-fail + mobile-freeze)

All three are REQUIRED for the validation gate. Implement in this order inside
`UniverseCanvas.tsx` / `UniverseSection.tsx`.

```tsx
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') ?? c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function UniverseCanvas({ morphRef }: { morphRef: React.MutableRefObject<number> }) {
  const prefersReduced = useReducedMotion(); // true when OS says reduce motion
  const [glOK] = useState(webglAvailable);
  const [frozen, setFrozen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Mobile-freeze: render one static frame, then stop the loop when off-screen
  useEffect(() => {
    const el = document.getElementById('universe-canvas-wrap');
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFrozen(!entry.isIntersecting && isMobile),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);

  // A. Reduced motion → static poster (CSS only, zero GPU)
  if (prefersReduced) {
    return (
      <div className="w-full h-[520px] sm:h-[620px] bg-purple-atmosphere flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-clash text-3xl text-white">Cloud Universe</div>
          <p className="text-white/60 mt-2">Sphere · Torus · Nebula — 6,000 services, one sky.</p>
        </div>
      </div>
    );
  }

  // B. No WebGL (old browser / blocked GPU) → same poster, never mount <Canvas>
  if (!glOK) {
    return (
      <div className="w-full h-[520px] sm:h-[620px] bg-purple-atmosphere flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-clash text-3xl text-white">Cloud Universe</div>
          <p className="text-white/60 mt-2">Your browser blocked WebGL — the club is still open.</p>
        </div>
      </div>
    );
  }

  // C. Mobile freeze: frameloop="always" on-screen, "never" off-screen
  return (
    <div id="universe-canvas-wrap" className="w-full h-[520px] sm:h-[620px]">
      <Canvas
        frameloop={frozen ? 'never' : 'always'}
        dpr={[1, isMobile ? 1.5 : 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.6, 8], fov: 45 }}
      >
        {/* <MorphParticles morphRef={morphRef} /> + sparkles + effects */}
      </Canvas>
    </div>
  );
}
```

Checklist: `prefers-reduced-motion` respected (matches existing Lenis guard in
`src/main.tsx` lines 10–11) · no blank black hole when WebGL fails · mobile GPU
idles off-screen (battery) · desktop keeps `frameloop="always"` for the breathing
shader.

---

## 8. drei `Sparkles` / `Float` usage notes

```tsx
import { Sparkles, Float } from '@react-three/drei';

// Ambient star-dust (cheap: one draw call, ~120 points)
<Sparkles
  count={120}
  scale={[10, 5, 6]}
  size={2.2}
  speed={0.25}
  opacity={0.55}
  color="#ac69ff"
  position={[0, 0, -3]}
/>

// Gentle float for a hero badge / torus accent mesh (NOT the whole particle field)
<Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.7} floatingRange={[-0.15, 0.15]}>
  <mesh>
    <torusGeometry args={[2.35, 0.02, 8, 128]} />
    <meshBasicMaterial color="#6feb2c" transparent opacity={0.5} />
  </mesh>
</Float>
```

- `Sparkles`: `scale` is a size-box `[w,h,d]`, not world scale; `speed ≤ 0.4` or it
  looks like snow. Keep `count ≤ 150` desktop / `≤ 60` mobile (prop it off
  `isMobile`). Colour it lavender `#ac69ff` so it reads as atmosphere, not a second
  particle system competing with the morph field.
- `Float`: wraps **meshes only** — do not wrap `MorphParticles` (it would fight the
  scroll-driven rotation in `useFrame`). Use for small accent meshes (orbit rings
  echoing `ThreeCanvas.tsx` lines 135–139) or a floating CTA badge mesh.
- Both are CPU-updated per frame; two `Sparkles` + one `Float` is fine, five is not.
- drei v10 `Sparkles` shader is three-0.173 compatible (no `outputEncoding`
  references). If TS complains about `scale` tuple type, type it as
  `scale={[10, 5, 6] as [number, number, number]}`.

---

## 9. Validation & perf budget (for the frontend agent's exit gate)

- `npm run build` (i.e. `tsc && vite build`) must pass with zero TS errors —
  R3F v9 types are strict about `bufferAttribute args` and `ThreeElements`.
- Universe chunk (lazy) must not grow the initial bundle: verify in build output
  that `UniverseCanvas-*.js` appears as a separate asset.
- Perf: desktop 60 fps at DPR ≤ 1.75 with bloom on; mobile 30+ fps at DPR ≤ 1.5
  with bloom OFF (gate `enabled={!isMobile}`); scroll morph must feel damped, never
  stepped (the `1 - exp(-4d)` approach in §5 guarantees this).
- A11y: `prefers-reduced-motion` poster renders; canvas container has
  `aria-hidden="true"` (decorative) with adjacent real copy for screen readers.

## 10. Open questions — none blocking

No secrets, ports, or DB tables needed. All packages already in `package.json`.
Frontend agent can start immediately.

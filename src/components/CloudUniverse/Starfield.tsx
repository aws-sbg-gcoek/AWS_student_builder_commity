import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface StarfieldProps {
  reducedMotion?: boolean;
  count?: number;
}

export const STARFIELD_COUNT = 380;

// Violet-led palette: deep violets dominate; lavender is uncommon,
// lime is rare (~6%), white is a handful of pinpoint glints.
const PALETTE: Array<{ color: THREE.Color; weight: number }> = [
  { color: new THREE.Color('#4c1d95'), weight: 0.42 },
  { color: new THREE.Color('#6d28d9'), weight: 0.24 },
  { color: new THREE.Color('#7c3aed'), weight: 0.16 },
  { color: new THREE.Color('#a78bfa'), weight: 0.08 },
  { color: new THREE.Color('#6feb2c'), weight: 0.06 },
  { color: new THREE.Color('#ffffff'), weight: 0.04 },
];

/** Deterministic PRNG so the field is stable across mounts. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VERTEX_SHADER = /* glsl */ `
  attribute vec3 aColor;
  attribute float aRand;
  attribute float aSize;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vColor = aColor;
    // Gentle twinkle only — no positional wobble, stars stay pinpoint.
    float twinkle = 0.72 + 0.28 * sin(uTime * (0.6 + aRand * 1.4) + aRand * 40.0);
    vTwinkle = twinkle;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    // Small, hard sprites with perspective attenuation.
    gl_PointSize = aSize * uPixelRatio * twinkle * (120.0 / -mvPosition.z);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    // Tight core with a short edge — a star, never a blob.
    float core = smoothstep(0.5, 0.28, d);
    float hot = smoothstep(0.2, 0.0, d);
    vec3 col = vColor * (0.75 + 0.65 * hot);
    gl_FragColor = vec4(col, core * uOpacity * (0.55 + 0.45 * vTwinkle));
  }
`;

/**
 * Sparse, sharp, violet-led starfield. Small sprites, dark values, slow
 * rotation — a supporting layer with real depth, staged behind the core.
 */
export function Starfield({ reducedMotion = false, count = STARFIELD_COUNT }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const rand = mulberry32(20240);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const rands = new Float32Array(count);
    const sizes = new Float32Array(count);

    // Cumulative weights for palette picks.
    const edges: number[] = [];
    let acc = 0;
    for (const entry of PALETTE) {
      acc += entry.weight;
      edges.push(acc);
    }

    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Shell distribution, radius 3.4..7.0, pushed fully behind the core
      // plane (z < 0) so no sprite can ever sit between camera and subject.
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(rand() * 2 - 1);
      const r = 3.4 + Math.pow(rand(), 0.8) * 3.6;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.75;
      positions[i * 3 + 2] =
        -Math.abs(r * Math.sin(phi) * Math.sin(theta)) * 0.85 - 0.6;

      const pick = rand();
      const slot = edges.findIndex((e) => pick <= e);
      tmp.copy(PALETTE[Math.max(0, slot)].color);
      // Dark value variation — depth comes from value, not hue.
      const shade = 0.45 + rand() * 0.55;
      colors[i * 3] = Math.min(1, tmp.r * shade);
      colors[i * 3 + 1] = Math.min(1, tmp.g * shade);
      colors[i * 3 + 2] = Math.min(1, tmp.b * shade);

      rands[i] = rand();
      // Small sprites throughout; a few slightly larger for accents.
      sizes[i] = rand() < 0.12 ? 1.6 + rand() * 0.7 : 0.7 + rand() * 0.9;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rands, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.7 },
        uPixelRatio: {
          value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
        },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry, material };
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (!reducedMotion) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      const points = pointsRef.current;
      if (points) {
        points.rotation.y += delta * 0.012;
      }
    } else {
      material.uniforms.uTime.value = 0.6;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

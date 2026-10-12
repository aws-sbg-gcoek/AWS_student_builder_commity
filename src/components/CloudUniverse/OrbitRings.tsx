import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface OrbitRingsProps {
  reducedMotion?: boolean;
}

const RING_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const RING_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uOpacity;
  uniform float uOffset;
  varying vec2 vUv;
  void main() {
    // Slow sheen travelling around the ring — one soft highlight in orbit.
    float flow = fract(vUv.x + uOffset - uTime * uSpeed);
    float sheen = smoothstep(0.0, 0.18, flow) * smoothstep(0.55, 0.18, flow);
    vec3 col = uColor * (0.5 + 0.9 * sheen);
    gl_FragColor = vec4(col, uOpacity * (0.45 + 0.55 * sheen));
  }
`;

interface RingSpec {
  radius: number;
  tube: number;
  tilt: [number, number, number];
  color: string;
  speed: number;
  direction: 1 | -1;
  opacity: number;
}

const RINGS: RingSpec[] = [
  {
    radius: 1.85,
    tube: 0.012,
    tilt: [Math.PI / 2.35, 0.12, 0.35],
    color: '#8b5cf6',
    speed: 0.05,
    direction: 1,
    opacity: 0.95,
  },
  {
    radius: 2.45,
    tube: 0.009,
    tilt: [Math.PI / 1.9, -0.2, -0.5],
    color: '#a78bfa',
    speed: 0.035,
    direction: -1,
    opacity: 0.7,
  },
];

/**
 * Two thin luminous orbit rings around the core — tilted on opposed axes
 * so they read as an orbital system, counter-rotating slowly. Narrow tubes
 * + restrained sheen: jewellery, not neon.
 */
export function OrbitRings({ reducedMotion = false }: OrbitRingsProps) {
  const groupRefs = useRef<Array<THREE.Mesh | null>>([]);

  const rings = useMemo(
    () =>
      RINGS.map((spec) => {
        const geometry = new THREE.TorusGeometry(spec.radius, spec.tube, 12, 220);
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uColor: { value: new THREE.Color(spec.color) },
            uTime: { value: 0 },
            uSpeed: { value: spec.speed },
            uOpacity: { value: spec.opacity },
            uOffset: { value: Math.random() },
          },
          vertexShader: RING_VERTEX_SHADER,
          fragmentShader: RING_FRAGMENT_SHADER,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        return { spec, geometry, material };
      }),
    [],
  );

  useEffect(() => {
    return () => {
      for (const ring of rings) {
        ring.geometry.dispose();
        ring.material.dispose();
      }
    };
  }, [rings]);

  useFrame((state, delta) => {
    if (reducedMotion) {
      // Settle into a composed static pose.
      for (const ring of rings) {
        ring.material.uniforms.uTime.value = 2.2;
      }
      const [a, b] = groupRefs.current;
      if (a) a.rotation.z = RINGS[0].tilt[2] + 0.4;
      if (b) b.rotation.z = RINGS[1].tilt[2] - 0.3;
      return;
    }
    const t = state.clock.elapsedTime;
    rings.forEach((ring, i) => {
      ring.material.uniforms.uTime.value = t;
      const mesh = groupRefs.current[i];
      if (mesh) {
        mesh.rotation.z += delta * 0.06 * ring.spec.direction;
      }
    });
  });

  return (
    <group>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            groupRefs.current[i] = mesh;
          }}
          geometry={ring.geometry}
          material={ring.material}
          rotation={ring.spec.tilt}
          frustumCulled={false}
        />
      ))}
    </group>
  );
}

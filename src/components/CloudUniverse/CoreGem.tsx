import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

export interface CoreGemProps {
  reducedMotion?: boolean;
}

const RIM_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/**
 * Violet-only fresnel shell. The rim is tight (pow 3.0) so the edge reads
 * as a crisp illuminated contour, never a halo. Dim core keeps the body dark.
 */
const RIM_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColorDeep;
  uniform vec3 uColorRim;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 3.0);
    vec3 col = mix(uColorDeep, uColorRim, fresnel) * uIntensity;
    float alpha = mix(0.12, 1.0, fresnel);
    gl_FragColor = vec4(col, alpha);
  }
`;

/** Designed frozen frame for reduced-motion users. */
const STATIC_ROTATION = new THREE.Euler(0.35, -0.5, 0.08);

/**
 * Violet Core — the single focal object of the rebuilt scene.
 * Distorted dark-amethyst body (liquid, alive) + crisp violet fresnel rim
 * shell + one small HDR lavender nucleus that the bloom pass catches.
 * Everything else in the scene is staged to support this object.
 */
export function CoreGem({ reducedMotion = false }: CoreGemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColorDeep: { value: new THREE.Color('#1e0a44') },
          uColorRim: { value: new THREE.Color('#a78bfa') },
          uIntensity: { value: 1.8 },
        },
        vertexShader: RIM_VERTEX_SHADER,
        fragmentShader: RIM_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      rimMaterial.dispose();
    };
  }, [rimMaterial]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (reducedMotion) {
      group.rotation.copy(STATIC_ROTATION);
      group.scale.setScalar(1);
      return;
    }
    const t = state.clock.elapsedTime;
    group.rotation.y += delta * 0.18;
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      0.22 + Math.sin(t * 0.25) * 0.08,
      2,
      delta,
    );
    group.scale.setScalar(1 + Math.sin(t * 0.9) * 0.02);
    const body = bodyRef.current;
    if (body) {
      body.rotation.z = Math.sin(t * 0.18) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dark amethyst body — faceted jewel, slow liquid distortion */}
      <mesh ref={bodyRef}>
        <icosahedronGeometry args={[1.0, 8]} />
        <MeshDistortMaterial
          color="#241040"
          emissive="#5b21b6"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.65}
          flatShading
          distort={0.32}
          speed={1.4}
        />
      </mesh>
      {/* Crisp fresnel rim shell — the illuminated contour */}
      <mesh material={rimMaterial} scale={1.025}>
        <icosahedronGeometry args={[1.0, 8]} />
      </mesh>
      {/* Surface glints — a few small HDR accents the bloom pass catches */}
      <mesh position={[0.58, 0.72, 0.42]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={[2.4, 2.0, 3.2]} toneMapped={false} />
      </mesh>
      <mesh position={[-0.7, -0.3, 0.62]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color={[1.8, 1.2, 3.0]} toneMapped={false} />
      </mesh>
      <mesh position={[0.1, -0.85, 0.5]}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial color={[1.6, 2.6, 1.4]} toneMapped={false} />
      </mesh>
    </group>
  );
}

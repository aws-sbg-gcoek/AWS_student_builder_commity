import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { CoreGem } from './CoreGem';
import { Starfield } from './Starfield';
import { OrbitRings } from './OrbitRings';
import { ScrollRig } from './ScrollRig';
import { useWebGL } from './useWebGL';

export interface CloudUniverseSceneProps {
  reducedMotion?: boolean;
}

/**
 * Violet Core — single-scene rebuild. One focal object (distorted amethyst
 * core + fresnel rim + HDR nucleus), two thin orbit rings, one sparse
 * violet-led starfield. Restrained post: bloom catches only true highlights,
 * vignette frames the composition into the black page.
 */
export default function Scene({ reducedMotion = false }: CloudUniverseSceneProps) {
  const { prefersReducedMotion } = useWebGL();
  const frozen = reducedMotion || prefersReducedMotion;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.55, 7.2], fov: 42, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.05} color="#d9ccff" />
      <pointLight position={[-4, 2, 4]} color="#7c3aed" intensity={26} distance={24} />
      <pointLight position={[3, -2, 3]} color="#a78bfa" intensity={10} distance={16} />

      <CoreGem reducedMotion={frozen} />
      <OrbitRings reducedMotion={frozen} />
      <Starfield reducedMotion={frozen} />
      <ScrollRig reducedMotion={frozen} />

      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.85}
          luminanceSmoothing={0.3}
          intensity={0.5}
          radius={0.7}
        />
        <Vignette offset={0.32} darkness={0.62} />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}

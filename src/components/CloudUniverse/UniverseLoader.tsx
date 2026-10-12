import { Suspense, lazy, type ReactNode } from "react";
import { useWebGL } from "./useWebGL";

const Scene = lazy(() => import("../CloudUniverse/Scene"));

export interface UniverseLoaderProps {
  fallback: ReactNode;
}

/**
 * Lazy-gates the R3F universe. Renders `fallback` while loading, when WebGL is
 * unsupported, the user prefers reduced motion, or the device is mobile.
 * Otherwise suspense-loads the default-exported Scene canvas.
 */
export default function UniverseLoader({ fallback }: UniverseLoaderProps) {
  const { supported, prefersReducedMotion, isMobile } = useWebGL();

  if (!supported || prefersReducedMotion || isMobile) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <Scene />
    </Suspense>
  );
}

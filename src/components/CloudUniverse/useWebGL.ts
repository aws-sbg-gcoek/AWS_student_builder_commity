import { useEffect, useState } from "react";

export interface WebGLCapabilities {
  supported: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (canvas.getContext("experimental-webgl") as any);
    return gl !== null && gl !== undefined;
  } catch {
    return false;
  }
}

function checkReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function checkIsMobile(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const narrow = window.innerWidth < 640;
  const hasTouch =
    "ontouchstart" in window ||
    (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
  const touchAndSmall = hasTouch && window.innerWidth < 768;
  return narrow || touchAndSmall;
}

/**
 * Detects WebGL availability, reduced-motion preference, and mobile form-factor.
 * No dependencies beyond React.
 */
export function useWebGL(): WebGLCapabilities {
  const [supported, setSupported] = useState<boolean>(() => checkWebGLSupport());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    checkReducedMotion(),
  );
  const [isMobile, setIsMobile] = useState<boolean>(() => checkIsMobile());

  useEffect(() => {
    setSupported(checkWebGLSupport());
    setPrefersReducedMotion(checkReducedMotion());
    setIsMobile(checkIsMobile());

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 639px)");

    const handleReducedChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    const handleMobileChange = () => {
      setIsMobile(checkIsMobile());
    };
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    if (typeof reducedQuery.addEventListener === "function") {
      reducedQuery.addEventListener("change", handleReducedChange);
    } else {
      reducedQuery.addListener(handleReducedChange);
    }
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", handleMobileChange);
    } else {
      mobileQuery.addListener(handleMobileChange);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (typeof reducedQuery.removeEventListener === "function") {
        reducedQuery.removeEventListener("change", handleReducedChange);
      } else {
        reducedQuery.removeListener(handleReducedChange);
      }
      if (typeof mobileQuery.removeEventListener === "function") {
        mobileQuery.removeEventListener("change", handleMobileChange);
      } else {
        mobileQuery.removeListener(handleMobileChange);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { supported, prefersReducedMotion, isMobile };
}

export default useWebGL;

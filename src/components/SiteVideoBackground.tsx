import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { useWebGL } from './CloudUniverse/useWebGL';

const STREAM_URL =
  'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8';

/**
 * SiteVideoBackground — fixed full-viewport Mux HLS stream behind the site.
 *
 * Scroll behavior: the layer is `position: fixed`, so page content scrolls
 * naturally above it on every route — no scroll listeners, no layout shift.
 *
 * Skill-derived guardrails (premium-3d-website / review-animations):
 * - Trusted HTTPS source only (stream.mux.com).
 * - No autoplay motion for `prefers-reduced-motion` (static gradient instead).
 * - No streaming on mobile / data-saver (bandwidth + battery).
 * - Poster-like gradient always painted behind the video: never a black flash.
 * - Pauses when the tab is hidden; fades in only once frames flow.
 * - Purely decorative: aria-hidden, pointer-events-none, z-index -1.
 */
export function SiteVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const { prefersReducedMotion, isMobile } = useWebGL();

  useEffect(() => {
    const connection =
      typeof navigator !== 'undefined'
        ? (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        : undefined;
    if (prefersReducedMotion || isMobile || connection?.saveData) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let hls: Hls | null = null;
    let disposed = false;
    const tryPlay = () => {
      if (!disposed) {
        video.play().catch(() => {
          /* autoplay blocked — stay on the gradient poster */
        });
      }
    };

    // Prefer MSE/hls.js wherever available (all desktop browsers); native
    // HLS only where MSE is absent (iOS Safari). Note: some Chromium builds
    // report "maybe" for the HLS MIME without being able to play it, so the
    // native branch must come second.
    if (Hls.isSupported()) {
      hls = new Hls({
        // Generous forward buffer: scroll-time main-thread contention must
        // never starve the decoder into an underrun mid-scroll.
        maxBufferLength: 60,
        maxMaxBufferLength: 180,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // It's a 0.34-opacity backdrop: 720p is plenty. Capping the top
        // rendition roughly halves decode + bandwidth cost.
        if (hls) {
          const capIndex = hls.levels.reduce(
            (best, level, i) =>
              typeof level.height === 'number' && level.height <= 720 ? i : best,
            -1,
          );
          if (capIndex >= 0) {
            hls.autoLevelCapping = capIndex;
          }
        }
        // Don't start at first frame with a thin buffer — a scroll burst in
        // the first seconds would underrun it. Wait for 8s buffered (or a
        // 6s timeout fallback), then play into a healthy cushion.
        let started = false;
        const startPlayback = () => {
          if (!started && !disposed) {
            started = true;
            tryPlay();
          }
        };
        hls?.on(Hls.Events.FRAG_BUFFERED, () => {
          try {
            const ahead = video.buffered.length
              ? video.buffered.end(video.buffered.length - 1) - video.currentTime
              : 0;
            if (ahead >= 8) {
              startPlayback();
            }
          } catch {
            /* workers warming up — keep buffering */
          }
        });
        window.setTimeout(startPlayback, 6000);
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal && !disposed) {
          setReady(false);
          hls?.destroy();
          hls = null;
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // No MSE (iOS Safari) — native HLS.
      video.src = STREAM_URL;
      video.addEventListener('loadedmetadata', tryPlay, { once: true });
    }

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      hls?.destroy();
    };
  }, [prefersReducedMotion, isMobile]);

  return (
    <div aria-hidden="true" className="site-video-bg">
      <div className="site-video-bg-fallback" />
      <video
        ref={videoRef}
        className={`site-video-bg-video${ready ? ' is-ready' : ''}`}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        disablePictureInPicture
        onPlaying={() => setReady(true)}
        onError={() => setReady(false)}
      />
      <div className="site-video-bg-scrim" />
    </div>
  );
}

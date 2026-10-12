import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FlaskConical, Rocket, Award, Users } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    id: 'workshops',
    index: '01',
    title: 'Hands-on Workshops',
    desc: 'Weekly peer-led labs on Lambda, S3, Amplify and GenAI.',
    Icon: FlaskConical,
  },
  {
    id: 'projects',
    index: '02',
    title: 'Real Projects',
    desc: 'Ship serverless builds you can show off from Day 1.',
    Icon: Rocket,
  },
  {
    id: 'certifications',
    index: '03',
    title: 'Cloud Certifications',
    desc: 'Guided prep paths with free vouchers and study squads.',
    Icon: Award,
  },
  {
    id: 'community',
    index: '04',
    title: 'Peer Community',
    desc: 'Find your people across every branch, seniors to freshers.',
    Icon: Users,
  },
];

// Measured fingertip fractions (alpha-cluster scan of the SVG assets):
// human tip at the right canvas edge, robot tip at the left canvas edge.
const TIP_H = { fx: 1.0, fy: 0.135 };
const TIP_R = { fx: 0.0, fy: 0.164 };
// Proportional overlap (scales with rendered height H) compensates for
// transparent padding inside the PNG canvases. Fixed px caused touching
// on wide screens where H — and the padding — grows. 0.04 × H leaves a
// clean ~25-30px daylight gap at all sizes, glow bridging the touch.
const TOUCH_OVERLAP_FRACTION = 0.04; // × H, applied both sides

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLImageElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(false);
  const ready = loaded >= 2 && !failed;
  const markLoaded = () => setLoaded((c) => c + 1);
  const markFailed = () => setFailed(true);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (!ready) return;

    const stage = stageRef.current;
    const human = humanRef.current;
    const robot = robotRef.current;
    const glow = glowRef.current;
    if (!stage || !human || !robot || !glow) return;

    // Full layout pass: sizes, vertical tip alignment, glow anchor.
    // Re-runs on every ScrollTrigger refresh (resize/orientation/font shifts).
    const layout = () => {
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      if (sw === 0 || sh === 0) return { meetH: 0, meetR: 0, startH: 0, startR: 0 };
      const H = Math.max(150, Math.min(sw * 0.3, sh * 0.55));
      gsap.set([human, robot], { height: H, width: 'auto' });
      const Wh = human.offsetWidth;
      const Wr = robot.offsetWidth;
      const cx = sw / 2;
      const tipY = sh * 0.42;
      gsap.set(human, { y: tipY - TIP_H.fy * H, top: 0, left: 0 });
      gsap.set(robot, { y: tipY - TIP_R.fy * H, top: 0, left: 0 });
      gsap.set(glow, { left: cx, top: tipY, xPercent: -50, yPercent: -50 });
      const overlap = H * TOUCH_OVERLAP_FRACTION;
      const meetH = cx - TIP_H.fx * Wh + overlap;
      const meetR = cx - TIP_R.fx * Wr - overlap;
      return {
        meetH,
        meetR,
        startH: -Wh * 0.66,
        startR: sw - Wr * 0.34,
      };
    };

    let pos = layout();
    const onRefreshInit = () => {
      pos = layout();
    };
    ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

    const mm = gsap.matchMedia();

    // Desktop / laptop: pinned scrub — hands glide in and fingertips meet.
    // Tuned for speed + low jank: short pin distance, snappy scrub, GPU transforms only.
    mm.add('(min-width: 640px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set([human, robot, glow], { force3D: true });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 88px',
          end: '+=120%',
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(human, { x: () => pos.startH }, { x: () => pos.meetH, ease: 'none' }, 0)
        .fromTo(robot, { x: () => pos.startR }, { x: () => pos.meetR, ease: 'none' }, 0)
        .fromTo(
          glow,
          { opacity: 0.15, scale: 0.55 },
          { opacity: 1, scale: 1.18, ease: 'none' },
          0,
        );
      return () => undefined;
    });

    // Mobile / reduced-motion: calm static meeting pose, no pin, no scrub.
    mm.add('(max-width: 639px), (prefers-reduced-motion: reduce)', () => {
      gsap.set(human, { x: pos.meetH });
      gsap.set(robot, { x: pos.meetR });
      gsap.set(glow, { opacity: 0.9, scale: 1 });
      return () => undefined;
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('load', onLoad);
      ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      mm.revert();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      aria-label="The builder journey"
      className="relative overflow-hidden border-b border-purple-900/30 bg-transparent py-20 sm:py-28"
    >
      {/* ambient grid + top glow */}
      <div className="bg-hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse, rgba(149,83,230,0.5) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* headline */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-3 py-1 font-mono text-xs text-purple-300">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#6feb2c] shadow-[0_0_8px_#6feb2c]" />
            <span>THE BUILDER JOURNEY</span>
          </div>
          <h2 className="font-clash mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            One Community. Every Skill{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
              That Matters.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* scroll-driven hands stage — pinned on desktop, static meeting pose otherwise */}
      <div ref={stageRef} className="relative mt-6 w-full overflow-hidden">
        <div className="relative h-[62vh] max-h-[620px] min-h-[380px] w-full sm:h-[72vh]">
          {!failed ? (
            <>
              <img
                ref={humanRef}
                src="/images/hand-human.svg"
                alt="Human hand reaching right"
                onLoad={markLoaded}
                onError={markFailed}
                className="pointer-events-none absolute select-none will-change-transform"
                style={{ transform: 'translateZ(0)' }}
                decoding="async"
                draggable={false}
              />
              <img
                ref={robotRef}
                src="/images/hand-robot.svg"
                alt="Robotic hand reaching left"
                onLoad={markLoaded}
                onError={markFailed}
                className="pointer-events-none absolute select-none will-change-transform"
                style={{ transform: 'translateZ(0)' }}
                decoding="async"
                draggable={false}
              />
              {/* fingertip energy bloom — scrub-driven, peaks at the touch */}
              <div ref={glowRef} className="pointer-events-none absolute will-change-transform" aria-hidden="true">
                <div
                  className="h-40 w-40 rounded-full blur-[48px] sm:h-60 sm:w-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(196,141,255,0.9) 0%, rgba(149,83,230,0.45) 45%, transparent 70%)',
                    transform: 'translateZ(0)',
                  }}
                />
              </div>
            </>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <div
                className="absolute left-[16%] top-1/3 h-40 w-40 rounded-full opacity-70 blur-[60px] sm:h-56 sm:w-56"
                style={{ background: 'radial-gradient(circle, rgba(149,83,230,0.7) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute right-[16%] top-1/3 h-40 w-40 rounded-full opacity-70 blur-[60px] sm:h-56 sm:w-56"
                style={{ background: 'radial-gradient(circle, rgba(111,235,44,0.3) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* edge melt: top/bottom fades + radial vignette into page black */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #000 0%, transparent 14%, transparent 80%, #000 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 75% 85% at 50% 45%, transparent 60%, #000 100%)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* journey timeline */}
        <div className="relative mx-auto mt-4 max-w-5xl">
          {/* connector line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/10 lg:block" aria-hidden="true" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-gradient-to-r from-[#AC69FF] via-[#9553e6] to-[#6feb2c] lg:block"
            aria-hidden="true"
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/40 bg-[#141414] shadow-[0_0_25px_rgba(149,83,230,0.35)]">
                  <step.Icon className="h-6 w-6 text-[#AC69FF]" />
                </div>
                <div className="font-mono text-[11px] tracking-widest text-[#6feb2c]">
                  {step.index}
                </div>
                <h3 className="font-clash mt-1 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mx-auto mt-1 max-w-[220px] text-xs leading-relaxed text-zinc-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * UniverseFallback — static poster for the scroll-driven "Cloud Universe" section.
 *
 * Shown when WebGL is unavailable, on mobile, or when the user prefers
 * reduced motion. Must look premium with ZERO WebGL: layered CSS aurora
 * (Kodr purple/lime radial glows + grid + watermark), the talking-point
 * copy (kept verbatim from App.tsx `interactive-section`), and a Join CTA
 * that is a plain anchor scrolling to #join (no modal wiring here — the
 * frontend agent owns the interactive R3F stage and modal).
 *
 * Props: none.
 */
export default function UniverseFallback() {
  return (
    <div
      role="img"
      aria-label="Cloud Universe — Architect. Build. Deploy. Production Cloud Skills."
      className="universe-fallback relative overflow-hidden rounded-3xl border border-purple-500/25 bg-black"
    >
      {/* ── Layer 1: deep-space base + Kodr purple/lime aurora glows ── */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="universe-aurora-a absolute -top-1/4 -left-1/4 h-[130%] w-[90%]"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 40% 40%, rgba(149, 83, 230, 0.5) 0%, rgba(114, 0, 255, 0.22) 45%, transparent 70%)',
          }}
        />
        <div
          className="universe-aurora-b absolute -bottom-1/3 -right-1/4 h-[130%] w-[90%]"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 60% 60%, rgba(111, 235, 44, 0.16) 0%, rgba(149, 83, 230, 0.28) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(172, 105, 255, 0.22) 0%, rgba(114, 0, 255, 0.1) 40%, transparent 65%)',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* ── Layer 2: fine Kodr-purple grid (shared hero recipe) ── */}
      <div aria-hidden="true" className="bg-hero-grid absolute inset-0 opacity-80" />

      {/* ── Layer 3: twinkling star dust (pure CSS dots) ── */}
      <div aria-hidden="true" className="absolute inset-0">
        <span className="universe-star absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white/80" />
        <span
          className="universe-star absolute left-[24%] top-[68%] h-1.5 w-1.5 rounded-full bg-white/60"
          style={{ animationDelay: '-1.4s' }}
        />
        <span
          className="universe-star absolute left-[46%] top-[12%] h-1 w-1 rounded-full bg-white/70"
          style={{ animationDelay: '-2.6s' }}
        />
        <span
          className="universe-star absolute left-[63%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/80"
          style={{ animationDelay: '-0.8s' }}
        />
        <span
          className="universe-star absolute left-[78%] top-[62%] h-1 w-1 rounded-full bg-white/70"
          style={{ animationDelay: '-3.4s' }}
        />
        <span
          className="universe-star absolute left-[88%] top-[24%] h-1.5 w-1.5 rounded-full bg-white/60"
          style={{ animationDelay: '-2s' }}
        />
        <span
          className="universe-star absolute left-[36%] top-[84%] h-1 w-1 rounded-full bg-white/60"
          style={{ animationDelay: '-4.1s' }}
        />
        <span
          className="universe-star absolute left-[70%] top-[82%] h-1 w-1 rounded-full bg-white/70"
          style={{ animationDelay: '-1.1s' }}
        />
      </div>

      {/* ── Layer 4: giant watermark ── */}
      <div
        aria-hidden="true"
        className="watermark-outline pointer-events-none absolute inset-x-0 bottom-2 select-none text-center font-clash text-[18vw] font-semibold leading-none tracking-tight sm:text-[9rem] lg:text-[11rem]"
      >
        UNIVERSE
      </div>

      {/* ── Layer 5: film grain ── */}
      <div aria-hidden="true" className="universe-grain absolute inset-0" />

      {/* ── Content: talking points (copy verbatim from App.tsx interactive-section) ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-14 text-center sm:px-10 sm:py-20">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-900/30 px-3 py-1 font-mono text-xs text-purple-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#6feb2c]" />
          <span>AWS STUDENT BUILDER ARCHITECTURE</span>
        </div>

        <h2 className="font-clash text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Architect. Build. Deploy.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
            Production Cloud Skills.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-300">
          Join our college developer community to master modern serverless architectures,
          microservices, containerization, and AWS Bedrock GenAI models. Every workshop
          includes hands-on labs and project reviews.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <div className="stat-card-image gradient-border p-4">
            <div className="font-mono text-2xl font-black text-[#6feb2c]">01</div>
            <div className="mt-1 text-sm font-bold text-white">Full-Stack Cloud</div>
            <div className="mt-1 text-xs text-zinc-400">
              React, Node.js, AWS Lambda &amp; S3 pipelines
            </div>
          </div>
          <div className="stat-card-image gradient-border p-4">
            <div className="font-mono text-2xl font-black text-purple-400">02</div>
            <div className="mt-1 text-sm font-bold text-white">Free AWS Credits</div>
            <div className="mt-1 text-xs text-zinc-400">
              Sponsored accounts, sandbox labs &amp; certifications
            </div>
          </div>
          <div className="stat-card-image gradient-border p-4">
            <div className="font-mono text-2xl font-black text-purple-300">03</div>
            <div className="mt-1 text-sm font-bold text-white">GenAI on Bedrock</div>
            <div className="mt-1 text-xs text-zinc-400">
              Serverless microservices, containers &amp; hands-on labs
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#join"
            className="purple-glow-btn button-bordercolor inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-white sm:text-sm"
          >
            <span>Join The Builder Club</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="mt-6 font-mono text-[11px] tracking-wide text-zinc-500">
          Static poster — interactive 3D disabled on this device
        </p>
      </div>
    </div>
  );
}

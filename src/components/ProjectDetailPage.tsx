import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Github, ExternalLink, User, CheckCircle2, Cloud, Terminal, Code, Activity, Database, Server } from 'lucide-react';
import { projectsData } from '../data/projects';
import { SpotlightFooter } from './SpotlightFooter';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigateProjects: () => void;
  onJoinClick: () => void;
}

export function ProjectDetailPage({ projectId, onNavigateProjects, onJoinClick }: ProjectDetailPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  
  const project = projectsData.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#07020E] text-white flex flex-col items-center justify-center pt-24">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <button
          onClick={onNavigateProjects}
          className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#07020E] text-white flex flex-col font-sans relative selection:bg-purple-600 selection:text-white pt-24 overflow-x-hidden">
      {/* ─── Background Watermarks & Checks Overlay ─── */}
      <div className="fixed inset-0 pointer-events-none bg-hero-grid opacity-35 z-0" />

      {/* Floating typography */}
      <div
        aria-hidden="true"
        className="fixed top-[30%] right-[-5%] text-[15vw] font-black tracking-widest text-transparent watermark-outline pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.04] leading-none animate-float-slow"
      >
        {project.category.toUpperCase()}
      </div>

      <div className="relative z-10 flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        
        {/* HEADER SECTION */}
        <div className="pt-6 pb-10 border-b border-purple-500/20 mb-10">
          <button
            onClick={onNavigateProjects}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Creator Image (if available) */}
            {project.creatorImage && (
              <div className="flex-shrink-0">
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-[#120826] border-2 border-purple-500/30 rounded-lg overflow-hidden relative shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-end">
                  {/* Accent bottom border line */}
                  <div className="absolute bottom-0 left-0 w-full h-1.5 z-10" style={{ backgroundColor: project.color }} />
                  <img
                    src={project.creatorImage}
                    alt={project.creator}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            )}

            <div className="flex-grow flex flex-col items-start pt-2">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4" style={{ color: project.color }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: project.color }}>
                  {project.role}
                </span>
              </div>
              
              <div className="text-zinc-400 font-mono text-sm mb-2 uppercase tracking-wide">
                {project.creator}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                {project.title}
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-400 font-medium italic mb-8 border-l-2 pl-4" style={{ borderColor: project.color }}>
                {project.tagline}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-lg text-black text-sm font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,153,0,0.4)]"
                    style={{ backgroundColor: project.color }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-lg bg-[#180a32]/90 border border-purple-500/35 text-white hover:border-purple-400 hover:bg-purple-900/40 text-sm font-bold flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* MAIN CONTENT (2/3 width) */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: project.color }} />
                About the Project
              </h2>
              <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/10 text-zinc-300 leading-relaxed text-base">
                {project.description}
              </div>
            </section>

            {project.id === 'devinsight-guardian' && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: project.color }} />
                  How It Works
                </h2>
                <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/10 text-zinc-300 leading-relaxed text-base">
                  Guardian observes GitHub activity, analyzes 30 days of patterns, computes productivity and burnout metrics, applies agent memory, generates personalized coaching insights, and delivers the results through a morning email.
                </div>
              </section>
            )}

            {project.id === 'fraudlens-ai' && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: project.color }} />
                  How It Works
                </h2>
                <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/10 text-zinc-300 leading-relaxed text-base space-y-4">
                  <p>The platform analyzes multiple forms of evidence and connects their findings to support investigators through a unified workflow:</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-purple-300 bg-black/20 p-4 rounded-xl border border-white/5">
                    <span>Evidence</span> <span className="text-zinc-600">→</span>
                    <span>OCR + Vision</span> <span className="text-zinc-600">→</span>
                    <span>Transaction Analysis</span> <span className="text-zinc-600">→</span>
                    <span>ML / Anomaly Detection</span> <span className="text-zinc-600">→</span>
                    <span>Evidence Fusion</span> <span className="text-zinc-600">→</span>
                    <span>AI Investigation</span> <span className="text-zinc-600">→</span>
                    <span>Human Review</span>
                  </div>
                </div>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: project.color }} />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                      <span className="text-zinc-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.id === 'fraudlens-ai' && (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: project.color }} />
                    DevOps + MLOps
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/10 text-zinc-300">
                      <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Server className="w-4 h-4 text-blue-400" /> DevOps Pipeline</h3>
                      <div className="flex flex-col gap-2 text-sm font-mono text-blue-200 bg-black/20 p-3 rounded-xl border border-white/5">
                        <span>GitHub</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span>Docker</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span>Amazon ECR</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span>AWS Elastic Beanstalk</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span className="text-green-400">Production</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/10 text-zinc-300">
                      <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-green-400" /> MLOps Workflow</h3>
                      <div className="flex flex-col gap-2 text-sm font-mono text-green-200 bg-black/20 p-3 rounded-xl border border-white/5">
                        <span>Data</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span>Preprocessing</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span>ML Models</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span>Inference</span> <span className="text-zinc-600 ml-2">↓</span>
                        <span className="text-red-400">Fraud / Anomaly Analysis</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-2 font-bold">Models Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {['XGBoost', 'Isolation Forest', 'Decision Tree', 'SVM'].map((m) => (
                            <span key={m} className="text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded border border-white/10">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: project.color }} />
                    Forensic Analysis
                  </h2>
                  <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/10">
                    <div className="flex flex-wrap gap-3">
                      {['Forensic Viewer', 'OCR Bounding Boxes', 'Heatmap / Tamper Indicators', 'Edge Analysis', 'Contrast Analysis', 'Layout Analysis'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-zinc-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm">
                          <Database className="w-4 h-4" style={{ color: project.color }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* SIDEBAR (1/3 width) */}
          <div className="space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/20 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="text-sm text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.awsServices && project.awsServices.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/20 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-[#FF9900]" />
                  {project.id === 'fraudlens-ai' ? 'AWS / Cloud' : 'AWS Services'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.awsServices.map((service, idx) => (
                    <span key={idx} className="text-sm text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-[#120826]/80 border border-purple-500/20 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-[1px]" style={{ backgroundColor: project.color }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: project.color }}>
                  CREATOR
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Built by
              </h3>
              <div className="flex items-center gap-4">
                {project.creatorImage ? (
                  <img src={project.creatorImage} alt={project.creator} className="w-12 h-12 rounded bg-[#120826] border border-white/10 object-cover object-top" />
                ) : (
                  <div className="w-12 h-12 rounded bg-gradient-to-tr from-purple-600 to-[#4EF35E] p-0.5 flex items-center justify-center">
                    <div className="w-full h-full rounded bg-[#120826] flex items-center justify-center text-lg font-bold text-white">
                      {project.creator.charAt(0)}
                    </div>
                  </div>
                )}
                <div>
                  <div className="font-bold text-white text-sm">{project.creator}</div>
                  <div className="text-xs text-zinc-500 font-mono mt-0.5 uppercase tracking-wide">{project.role}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <SpotlightFooter onJoinClick={onJoinClick} />
    </div>
  );
}

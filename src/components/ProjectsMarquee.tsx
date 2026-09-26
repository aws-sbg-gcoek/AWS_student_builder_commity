import React, { useState } from 'react';
import { 
  Eye, Heart, Github, ExternalLink, Sparkles, Code2, 
  Terminal, Layers, ArrowUpRight, X, Check, Flame, ChevronRight, Pause,
  Maximize2, Cpu, CheckCircle2, ShieldCheck
} from 'lucide-react';

export interface ProjectCard {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  image: string;
  version: string;
  views: number;
  initialLikes: number;
  techStack: string[];
  description: string;
  architectureDetails: string[];
  githubUrl: string;
  liveDemoUrl: string;
  contributors: { name: string; role: string }[];
}

const PROJECTS_DATA: ProjectCard[] = [
  {
    id: 'aethernet-ai-ops',
    title: 'AetherNet AI: Enterprise Bedrock LLMOps Platform',
    category: 'GenAI & Cloud Architecture',
    badge: 'AWS Bedrock Flagship',
    badgeColor: 'bg-purple-900/60 text-purple-300 border-purple-500/40',
    image: '/images/project_bedrock.jpg',
    version: 'v2.1 Production',
    views: 4820,
    initialLikes: 892,
    techStack: ['Amazon Bedrock', 'AWS Lambda', 'OpenSearch', 'Next.js 15'],
    description: 'An enterprise-grade LLM inference observability platform. Monitors latency, token throughput, and multi-agent RAG reasoning chains across Anthropic Claude and Amazon Titan models.',
    architectureDetails: [
      'Serverless ingestion pipeline processing 10,000+ token telemetry events/sec with AWS Kinesis',
      'Vector semantic search and hybrid caching layer backed by Amazon OpenSearch Serverless',
      'Dynamic fallback routing with AWS Lambda to optimize token billing by 42%'
    ],
    githubUrl: 'https://github.com/AWSCloudClubGCOE',
    liveDemoUrl: 'https://github.com/AWSCloudClubGCOE',
    contributors: [
      { name: 'Aditya Patil', role: 'Solutions Architect' },
      { name: 'Neha Deshmukh', role: 'AI Systems Lead' }
    ]
  },
  {
    id: 'campustwin-iot-core',
    title: 'CampusTwin: 3D Holographic IoT Smart Energy Grid',
    category: 'AWS IoT & Digital Twin',
    badge: 'IoT Hackathon Winner',
    badgeColor: 'bg-emerald-900/60 text-[#4EF35E] border-emerald-500/40',
    image: '/images/project_iot.jpg',
    version: 'v3.0 Live Telemetry',
    views: 6240,
    initialLikes: 1240,
    techStack: ['AWS IoT Core', 'Amazon Timestream', 'Grafana', 'MQTT'],
    description: 'A real-time 3D digital twin of our college campus. Collects telemetry from 4,800+ edge sensors to predict lab energy surges, HVAC load, and optimize solar battery distribution.',
    architectureDetails: [
      'Microcontroller sensor telemetry ingested via AWS IoT Core through secure MQTT over TLS',
      'Time-series sensor telemetry indexed in Amazon Timestream with millisecond analytical queries',
      'Automated load shedding triggers via AWS Step Functions during peak campus energy demand'
    ],
    githubUrl: 'https://github.com/AWSCloudClubGCOE',
    liveDemoUrl: 'https://github.com/AWSCloudClubGCOE',
    contributors: [
      { name: 'Vikas Patil', role: 'IoT & Firmware Lead' },
      { name: 'Rohan Kulkarni', role: 'Cloud Lead' }
    ]
  },
  {
    id: 'cloudforge-iac-engine',
    title: 'CloudForge: Automated Architecture-to-CDK Synthesizer',
    category: 'DevOps & Automation',
    badge: 'Open Source Engine',
    badgeColor: 'bg-sky-900/60 text-sky-300 border-sky-500/40',
    image: '/images/aws_hackathon.jpg',
    version: 'v1.4 Verified',
    views: 3410,
    initialLikes: 645,
    techStack: ['AWS CDK', 'TypeScript', 'Docker', 'Amazon ECS'],
    description: 'A developer tool that compiles interactive architecture diagrams directly into production-ready AWS Cloud Development Kit (CDK) and CloudFormation stacks with security guardrails.',
    architectureDetails: [
      'Automated compliance auditing using AWS Config rules and cdk-nag security policies',
      'One-click ephemeral review environments deployed through AWS CodeBuild and Fargate',
      'Synthesizes over 30+ AWS resources including VPCs, IAM roles, and RDS clusters in seconds'
    ],
    githubUrl: 'https://github.com/AWSCloudClubGCOE',
    liveDemoUrl: 'https://github.com/AWSCloudClubGCOE',
    contributors: [
      { name: 'Gaurav Shinde', role: 'DevOps Architect' },
      { name: 'Pooja Jadhav', role: 'Full-Stack Developer' }
    ]
  },
  {
    id: 'kachestore-serverless',
    title: 'KacheStore: Sub-Millisecond Multi-Region Event Cache',
    category: 'Serverless Systems',
    badge: 'Production Deployed',
    badgeColor: 'bg-amber-900/60 text-[#FF9900] border-amber-500/40',
    image: '/images/aws_keynote.jpg',
    version: 'v2.0 Low Latency',
    views: 5120,
    initialLikes: 915,
    techStack: ['DynamoDB Streams', 'ElastiCache', 'Go', 'API Gateway'],
    description: 'Ultra-low latency serverless cache developed to sustain sudden traffic spikes during collegiate hackathon registrations and student voting systems without downtime.',
    architectureDetails: [
      'Global active-active data replication with Amazon DynamoDB Global Tables and Go microservices',
      'Redis cluster automated scaling with sub-5 millisecond p99 latency during 15k concurrent registrations',
      'Zero cold-start overhead utilizing optimized Go runtimes on AWS Lambda'
    ],
    githubUrl: 'https://github.com/AWSCloudClubGCOE',
    liveDemoUrl: 'https://github.com/AWSCloudClubGCOE',
    contributors: [
      { name: 'Tanmay More', role: 'Backend Engineer' },
      { name: 'Snehal Pawar', role: 'System Architect' }
    ]
  },
  {
    id: 'skillbadge-verification',
    title: 'SkillBadge: Cryptographic AWS Club Certificate Registry',
    category: 'EdTech & Cloud Verification',
    badge: '1,200+ Verified Badges',
    badgeColor: 'bg-purple-900/60 text-purple-200 border-purple-500/40',
    image: '/images/aws_swags.jpg',
    version: 'v1.8 Audited',
    views: 7530,
    initialLikes: 1530,
    techStack: ['AWS Lambda', 'Amazon S3', 'DynamoDB', 'Node.js'],
    description: 'Tamper-proof verifiable digital certification and badge distribution system. Allows students to showcase verifiable proof of AWS bootcamp completion directly to recruiters.',
    architectureDetails: [
      'Cryptographically signed credentials stored immutably on Amazon S3 with CloudFront CDN distribution',
      'Automated certificate generation workers running on AWS Lambda with PDF rendering engines',
      'QR code instant LinkedIn & resume verification API resolving in under 120ms'
    ],
    githubUrl: 'https://github.com/AWSCloudClubGCOE',
    liveDemoUrl: 'https://github.com/AWSCloudClubGCOE',
    contributors: [
      { name: 'Akshay Salunkhe', role: 'Cloud Lead' },
      { name: 'Pranali Joshi', role: 'Frontend Architect' }
    ]
  }
];

export function ProjectsMarquee() {
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    PROJECTS_DATA.forEach(p => { counts[p.id] = p.initialLikes; });
    return counts;
  });

  const toggleLike = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setLikedProjects(prev => {
      const isLiked = !prev[projectId];
      setLikeCounts(c => ({
        ...c,
        [projectId]: c[projectId] + (isLiked ? 1 : -1)
      }));
      return { ...prev, [projectId]: isLiked };
    });
  };

  // Duplicate cards for seamless infinite marquee loop
  const duplicatedProjects = [...PROJECTS_DATA, ...PROJECTS_DATA];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#07020E] border-b border-purple-900/30">
      
      {/* Background Lighting & Atmosphere */}
      <div className="absolute top-[20%] right-[15%] w-[550px] h-[550px] bg-purple-900/15 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-900/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />

      {/* ── Section Title & Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <Code2 className="w-3.5 h-3.5 text-[#4EF35E]" />
          <span>PRODUCTION CLOUD PROJECTS & ARCHITECTURES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
          Projects Built by{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-[#4EF35E]">
            Our Builders
          </span>
        </h2>

        <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Real cloud architectures and application screenshots engineered by our college builders. Hover over any project to pause the scroll and click to inspect the high-resolution architecture diagrams and live code.
        </p>

        {/* Hover hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-zinc-500">
          <Pause className="w-3 h-3 text-[#4EF35E]" />
          <span>Hover over carousel to pause • Click image to inspect full architecture</span>
        </div>
      </div>

      {/* ── INFINITE HORIZONTAL MARQUEE CAROUSEL TRACK ── */}
      <div className="relative w-full overflow-hidden mask-fade-edges py-4">
        
        {/* Left & Right Subtle Fade Overlay Gradients for smooth edge transparency */}
        <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#07020E] via-[#07020E]/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#07020E] via-[#07020E]/70 to-transparent z-20 pointer-events-none" />

        {/* Continuous Infinite Track */}
        <div className="projects-marquee-track gap-6 sm:gap-8 px-4">
          {duplicatedProjects.map((project, index) => {
            const isLiked = !!likedProjects[project.id];
            const currentLikes = likeCounts[project.id] ?? project.initialLikes;

            return (
              <div
                key={`${project.id}-${index}`}
                onClick={() => setSelectedProject(project)}
                className="w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0 rounded-2xl sm:rounded-3xl bg-[#120826]/90 border border-purple-500/25 hover:border-purple-400 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl p-3.5 sm:p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(147,51,234,0.35)] cursor-pointer group flex flex-col justify-between"
              >
                {/* ── Card Project Screenshot Showcase (Realistic Window Frame) ── */}
                <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden mb-4 border border-white/10 bg-black/60 shadow-inner group/img">
                  
                  {/* Subtle top window header dots for realistic software feel */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black/50 backdrop-blur-md px-3 flex items-center justify-between z-10 border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 truncate max-w-[140px]">
                      {project.id}.aws.cloud
                    </span>
                  </div>

                  {/* Clean Realistic Project Screenshot */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover pt-5 group-hover/img:scale-106 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover/img:from-black/60 transition-colors" />

                  {/* Top Status Badge */}
                  <div className="absolute top-8 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md shadow-sm ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                  </div>

                  {/* Version tag (Bottom Left) */}
                  <span className="absolute bottom-2.5 left-3 text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/80 text-[#4EF35E] border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#4EF35E]" />
                    {project.version}
                  </span>

                  {/* Enlarge Hint (Bottom Right) */}
                  <span className="absolute bottom-2.5 right-3 text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-200 border border-purple-500/30 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" /> Inspect
                  </span>
                </div>

                {/* ── Card Body: Title, Category & Description ── */}
                <div className="flex-1">
                  <div className="text-[11px] font-mono text-purple-400 font-semibold mb-1">
                    {project.category}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-2 group-hover:text-purple-200 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c0e3a] text-purple-200 border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Card Footer: Views, Interactive Like Counter & Details CTA ── */}
                <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-3">
                    {/* Views counter */}
                    <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-300">
                      <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      {project.views.toLocaleString()}
                    </span>

                    {/* Interactive Like button */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(e, project.id)}
                      className={`flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                      <span>{currentLikes}</span>
                    </button>
                  </div>

                  {/* View Details hint */}
                  <span className="text-[11px] font-semibold text-purple-300 group-hover:text-white flex items-center gap-1 transition-colors">
                    Architecture <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* ─── INTERACTIVE HIGH-RES PROJECT ARCHITECTURE & DETAILS MODAL ─── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0d041d] border border-purple-500/40 shadow-2xl p-6 sm:p-8 text-white">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold border ${selectedProject.badgeColor}`}>
                  {selectedProject.badge}
                </span>
                <span className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-[#4EF35E] bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {selectedProject.version}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {selectedProject.views} views
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {selectedProject.title}
              </h3>
            </div>

            {/* High-Resolution Project Showcase Image Frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-purple-500/30 shadow-2xl bg-black mb-8 group">
              {/* Window bar */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-black/70 backdrop-blur-md px-4 flex items-center justify-between z-10 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-zinc-400 ml-2">https://{selectedProject.id}.aws.cloud</span>
                </div>
                <span className="text-[11px] font-mono text-[#4EF35E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4EF35E] animate-ping" />
                  Live AWS Production
                </span>
              </div>

              {/* Realistic Screenshot */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover pt-7"
              />

              {/* Bottom image overlay bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-wrap items-center justify-between text-xs text-zinc-300">
                <span className="font-mono text-purple-200">System Architecture: High-Availability Cloud Deployment</span>
                <span className="text-[#4EF35E] font-mono font-semibold">100% Deployed on AWS</span>
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left 2 Cols: Description, Architecture Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2 font-bold">
                    Project Architecture & Abstract
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-3 font-bold">
                    Engineering Takeaways & System Design
                  </h4>
                  <div className="space-y-2.5">
                    {selectedProject.architectureDetails.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-[#4EF35E] flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2 font-bold">
                    Cloud Services & Technologies Deployed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-purple-950/60 text-purple-200 border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Contributors & Action Buttons */}
              <div className="space-y-6">
                
                {/* Contributors */}
                <div className="p-4 rounded-2xl bg-[#170a30] border border-purple-500/20">
                  <div className="text-[10px] font-mono text-zinc-400 mb-3">STUDENT BUILDERS / CONTRIBUTORS</div>
                  <div className="space-y-2.5">
                    {selectedProject.contributors.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-purple-700/50 flex items-center justify-center font-bold text-xs text-white">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{c.name}</div>
                          <div className="text-[10px] text-purple-300">{c.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="space-y-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-full bg-[#1e0e3d] hover:bg-[#281352] border border-purple-500/40 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Source Repository</span>
                  </a>

                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="white-pill-btn w-full py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  >
                    <span>Launch Live Interactive App</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

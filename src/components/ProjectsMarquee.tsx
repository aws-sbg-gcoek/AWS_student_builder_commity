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
    id: 'fraudlens-ai',
    title: 'FraudLens AI: AI-Powered Financial Evidence Forensics',
    category: 'AI + Digital Forensics',
    badge: 'AI Forensics Platform',
    badgeColor: 'bg-blue-900/60 text-blue-300 border-blue-500/40',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop',
    version: 'v1.0 Live Demo',
    views: 5820,
    initialLikes: 1120,
    techStack: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS CloudFront', 'Elastic Beanstalk', 'Amazon S3'],
    description: 'A multimodal fraud investigation platform that combines financial evidence analysis, OCR, computer vision, machine learning, anomaly detection, and AI-assisted investigation in a unified forensic workspace.',
    architectureDetails: [
      'Multimodal evidence processing combining OCR document intelligence and computer vision',
      'ML anomaly detection pipeline with XGBoost and Scikit-learn for fraud pattern identification',
      'Deployed on AWS Elastic Beanstalk with Amazon CloudFront CDN and Amazon S3 storage'
    ],
    githubUrl: 'https://github.com/pathananas2007/fraudlens-ai',
    liveDemoUrl: 'https://d21zw6n2b48e0s.cloudfront.net/',
    contributors: [
      { name: 'Anas Pathan', role: 'Project Creator' }
    ]
  },
  {
    id: 'devinsight-guardian',
    title: 'DevInsight Guardian: Autonomous Serverless AI Manager',
    category: 'AI + Serverless',
    badge: 'AWS SAM & Lambda',
    badgeColor: 'bg-amber-900/60 text-[#FF9900] border-amber-500/40',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    version: 'v1.0 Production',
    views: 6420,
    initialLikes: 1350,
    techStack: ['AWS Lambda', 'AWS SAM', 'TypeScript', 'EventBridge', 'Amazon SES', 'CloudWatch'],
    description: 'An autonomous serverless AI engineering manager that watches GitHub activity, analyzes engineering patterns, and delivers a personalized morning brief with prioritized recommendations.',
    architectureDetails: [
      '8-stage agentic pipeline running on AWS Lambda scheduled via EventBridge',
      'Automated daily morning briefs delivered via Amazon SES with priority recommendations',
      'Fault-tolerant processing with SQS dead-letter queues and CloudWatch monitoring'
    ],
    githubUrl: 'https://github.com/ShardulOnGit/DevInsight',
    liveDemoUrl: 'https://dev-insight-shardul-kolekar.vercel.app/',
    contributors: [
      { name: 'Shardul Kolekar', role: 'Project Creator' }
    ]
  },
  {
    id: 'iot-health-monitoring',
    title: 'IoT Health Monitoring Dashboard',
    category: 'IoT + Analytics',
    badge: 'AWS IoT Core',
    badgeColor: 'bg-cyan-900/60 text-[#38BDF8] border-cyan-500/40',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
    version: 'v1.2 Open Source',
    views: 3890,
    initialLikes: 740,
    techStack: ['AWS IoT Core', 'AWS Amplify', 'React', 'Amazon Timestream'],
    description: 'Real-time dashboard for monitoring patient vitals collected from simulated IoT devices. Uses MQTT for data ingestion and React for visualization.',
    architectureDetails: [
      'Real-time MQTT telemetry ingestion via AWS IoT Core',
      'Time-series storage and fast analytical queries with Amazon Timestream',
      'Frontend web dashboard hosted on AWS Amplify'
    ],
    githubUrl: 'https://github.com/aws-samples',
    liveDemoUrl: 'https://github.com/aws-samples',
    contributors: [
      { name: 'AWS Student Builder Community', role: 'Open Source' }
    ]
  },
  {
    id: 'cloud-attendance-system',
    title: 'Cloud Attendance System: Facial Recognition Log',
    category: 'AI + Vision',
    badge: 'Amazon Rekognition',
    badgeColor: 'bg-purple-900/60 text-purple-300 border-purple-500/40',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop',
    version: 'v1.0 Verified',
    views: 4210,
    initialLikes: 890,
    techStack: ['Amazon Rekognition', 'AWS Lambda', 'Amazon S3', 'Amazon DynamoDB'],
    description: 'An automated attendance tracking system using facial recognition. Students scan their faces at the entrance, and attendance is logged in a database.',
    architectureDetails: [
      'Facial matching against image vault using Amazon Rekognition',
      'Event-driven facial verification trigger via S3 upload to Lambda',
      'Sub-second log creation in DynamoDB database'
    ],
    githubUrl: 'https://github.com/aws-samples',
    liveDemoUrl: 'https://github.com/aws-samples',
    contributors: [
      { name: 'AWS Student Builder Community', role: 'Open Source' }
    ]
  },
  {
    id: 'automated-data-pipeline',
    title: 'Serverless ETL & Data Analytics Pipeline',
    category: 'Data Engineering',
    badge: 'AWS Glue & Athena',
    badgeColor: 'bg-emerald-900/60 text-[#4EF35E] border-emerald-500/40',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    version: 'v2.0 Production',
    views: 3560,
    initialLikes: 680,
    techStack: ['AWS Glue', 'Amazon Athena', 'Amazon S3', 'AWS Step Functions'],
    description: 'A serverless ETL pipeline that extracts data from external APIs, transforms it using Python, and loads it into a data warehouse for analysis.',
    architectureDetails: [
      'Serverless orchestration of data jobs using AWS Step Functions',
      'Automated data crawling and cataloging with AWS Glue',
      'Interactive SQL analytics over S3 data lake using Amazon Athena'
    ],
    githubUrl: 'https://github.com/aws-samples',
    liveDemoUrl: 'https://github.com/aws-samples',
    contributors: [
      { name: 'AWS Student Builder Community', role: 'Open Source' }
    ]
  },
  {
    id: 'containerized-microservices',
    title: 'Containerized Microservices Platform',
    category: 'Cloud Architecture',
    badge: 'Amazon ECS & Docker',
    badgeColor: 'bg-rose-900/60 text-rose-300 border-rose-500/40',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2000&auto=format&fit=crop',
    version: 'v1.5 Containerized',
    views: 4980,
    initialLikes: 980,
    techStack: ['Amazon ECS', 'AWS Fargate', 'Docker', 'Application Load Balancer'],
    description: 'An e-commerce backend broken down into microservices, containerized with Docker, and orchestrated using Amazon ECS and Fargate.',
    architectureDetails: [
      'Container orchestration with Amazon ECS on AWS Fargate serverless compute',
      'Dynamic traffic routing using Application Load Balancer',
      'Automated container image storage in Amazon ECR'
    ],
    githubUrl: 'https://github.com/aws-samples',
    liveDemoUrl: 'https://github.com/aws-samples',
    contributors: [
      { name: 'AWS Student Builder Community', role: 'Open Source' }
    ]
  }
];

interface ProjectsMarqueeProps {
  onViewAllProjects?: () => void;
}

export function ProjectsMarquee({ onViewAllProjects }: ProjectsMarqueeProps = {}) {
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

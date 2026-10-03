import React, { useState } from 'react';
import {
  Sparkles,
  Cloud,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { SpotlightFooter } from './SpotlightFooter';

interface JoinUsPageProps {
  onNavigateHome: () => void;
}

export function JoinUsPage({ onNavigateHome }: JoinUsPageProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const googleFormUrl = 'https://forms.gle/KaSxQhoMMXv8hBsq9';

  const reloadIframe = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  const whyJoinPoints = [
    {
      icon: <Cloud className="w-6 h-6 text-[#FF9900]" />,
      title: 'Hands-On AWS Cloud Labs',
      description:
        'Access sandbox environments and work directly with real AWS services including EC2, S3, Lambda, DynamoDB, and Amazon Bedrock AI.',
      gradient: 'from-[#FF9900]/20 to-purple-600/10',
      border: 'border-[#FF9900]/30',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#4EF35E]" />,
      title: 'Build Portfolio-Ready Projects',
      description:
        'Collaborate on production-grade open-source software, cloud microservices, and AI-powered applications to boost your resume.',
      gradient: 'from-[#4EF35E]/20 to-emerald-600/10',
      border: 'border-[#4EF35E]/30',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: 'Peer Mentorship & Community',
      description:
        'Connect with AWS Community Builders, certified senior students, and industry professionals eager to mentor you.',
      gradient: 'from-purple-500/20 to-indigo-600/10',
      border: 'border-purple-500/30',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'Certification Vouchers & Career Growth',
      description:
        'Get guided roadmaps for AWS Certified Cloud Practitioner / Solutions Architect, discount vouchers, and internship referrals.',
      gradient: 'from-amber-500/20 to-orange-600/10',
      border: 'border-amber-500/30',
    },
  ];

  const whatYouWillLearn = [
    {
      title: 'Cloud Architecture & DevOps',
      skills: ['AWS Core Services (EC2, S3, VPC)', 'Docker & Kubernetes Containers', 'CI/CD Pipelines & CloudFormation'],
      icon: <Cpu className="w-5 h-5 text-[#FF9900]" />,
    },
    {
      title: 'Serverless & Microservices',
      skills: ['AWS Lambda & Event-Driven Architecture', 'API Gateway & GraphQL APIs', 'DynamoDB & NoSQL Data Design'],
      icon: <Terminal className="w-5 h-5 text-[#4EF35E]" />,
    },
    {
      title: 'AI & Generative AI on AWS',
      skills: ['Amazon Bedrock LLM Integration', 'Claude, Titan & Llama Prompting', 'SageMaker AI Machine Learning'],
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Modern Web & Security',
      skills: ['Full-Stack Integration (React/Next.js)', 'AWS IAM Security & Policy Design', 'Cloud Cost & Performance Optimization'],
      icon: <ShieldCheck className="w-5 h-5 text-sky-400" />,
    },
  ];

  const studentPerks = [
    '🎓 100% Free Membership (No Subscription or hidden fees)',
    '⚡ Free AWS Cloud Credits & Lab Access',
    '📜 Official Certificates of Active Club Participation',
    '🎁 Exclusive AWS Builder Swag, T-Shirts & Stickers',
    '🚀 Direct access to hackathons and AWS Cloud Days',
    '💬 Private Discord/WhatsApp Builder Squad channels',
  ];

  const faqs = [
    {
      q: 'Who can join the AWS Student Builder Group?',
      a: 'Any currently enrolled student at Government College of Engineering Karad (GCOEK) from any branch and year can join!',
    },
    {
      q: 'Do I need prior cloud or programming experience?',
      a: 'Not at all! We welcome complete beginners. We conduct zero-to-hero workshops designed for first-timers as well as advanced labs for experienced devs.',
    },
    {
      q: 'Is there any fee to join?',
      a: 'No! Membership is 100% free forever for all GCOEK students.',
    },
    {
      q: 'What if the Google Form does not load inside the page?',
      a: 'You can use the "Open Form in New Tab" button located directly above the form container to fill out the form directly on Google Forms.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07020E] text-white flex flex-col pt-24 font-sans relative selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-800/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[70%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Hero Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#180d2f]/90 border border-purple-500/35 shadow-[0_0_24px_rgba(168,85,247,0.3)] mb-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4EF35E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4EF35E]" />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF9900]">
            MEMBERSHIP REGISTRATION 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
          Join <span className="text-[#FF9900]">AWS</span> Student Builder Group
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed font-normal">
          Become part of GCOEK's premier cloud & technology community. Learn hands-on cloud computing, build real projects, and launch your career.
        </p>
      </div>

      {/* Main Split Section: Form on Right, Details on Left */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ── LEFT COLUMN: Why Join Us & What You Will Learn (7 cols on desktop) ── */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-10">
            
            {/* Why Join Us Card Group */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#4EF35E]">
                <Sparkles className="w-4 h-4" />
                <span>WHY JOIN US?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Accelerate Your Tech Journey with AWS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {whyJoinPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${item.gradient} bg-[#120826]/90 border ${item.border} backdrop-blur-xl shadow-lg hover:border-purple-400/50 transition-all duration-300 group`}
                  >
                    <div className="p-2.5 rounded-xl bg-purple-950/60 w-fit border border-purple-500/20 mb-3 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-purple-200/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Will Learn */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0722]/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#FF9900]">
                <BookOpen className="w-4 h-4" />
                <span>CURRICULUM & SKILLS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                What You Will Master
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whatYouWillLearn.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#160b33]/80 border border-purple-500/20 space-y-2 hover:bg-[#1c0e40] transition-colors"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-white">
                      {cat.icon}
                      <span>{cat.title}</span>
                    </div>
                    <ul className="space-y-1 pt-1">
                      {cat.skills.map((s, sIdx) => (
                        <li key={sIdx} className="text-xs text-purple-200/70 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4EF35E] flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Member Perks & Benefits */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#13072b] to-indigo-950/40 border border-purple-500/30 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-purple-300">
                <Award className="w-4 h-4 text-purple-400" />
                <span>EXCLUSIVE MEMBER PERKS</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                What Every Member Receives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studentPerks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-purple-100/90 bg-purple-900/20 p-2.5 rounded-xl border border-purple-500/15">
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Embedded Google Form (6 cols on desktop) ── */}
          <div className="lg:col-span-6 xl:col-span-6 sticky top-24">
            
            <div className="rounded-3xl bg-[#0e0620] border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden">
              
              {/* Form Container Top Toolbar */}
              <div className="bg-[#170c35] px-5 py-4 border-b border-purple-500/30 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-purple-200 font-semibold tracking-wide">
                    Google Form Registration
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={reloadIframe}
                    title="Reload Form"
                    className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 hover:text-white text-xs flex items-center gap-1 border border-purple-500/30 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Form Iframe Body */}
              <div className="relative w-full bg-white min-h-[720px] sm:min-h-[780px] flex flex-col">
                
                {!iframeLoaded && (
                  <div className="absolute inset-0 bg-[#0c051d] flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
                    <p className="text-sm font-semibold text-purple-200">
                      Loading AWS Membership Form...
                    </p>
                    <p className="text-xs text-purple-400/70 mt-1 max-w-xs">
                      If form does not load due to network rules, click "Open in New Tab" above.
                    </p>
                  </div>
                )}

                <iframe
                  key={iframeKey}
                  src={googleFormUrl}
                  title="AWS Student Builder Group Registration Form"
                  className="w-full flex-1 min-h-[720px] sm:min-h-[780px] border-0"
                  onLoad={() => setIframeLoaded(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Bottom Footer Note in Form Container */}
              <div className="bg-[#120729] px-5 py-3 border-t border-purple-500/30 flex items-center justify-between text-xs text-purple-300/80">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4EF35E]" />
                  <span>Official GCOEK Registration Form</span>
                </span>
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-200 underline font-mono text-[11px]"
                >
                  forms.gle/KaSxQhoMMXv8hBsq9
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* FAQs Section */}
        <div className="mt-20 pt-10 border-t border-purple-900/40">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-mono text-purple-300 font-semibold uppercase mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#FF9900]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Got Questions? We've Got Answers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#120728]/80 border border-purple-500/20 backdrop-blur-md space-y-2"
              >
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <span className="text-[#FF9900] font-mono">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <SpotlightFooter />
    </div>
  );
}

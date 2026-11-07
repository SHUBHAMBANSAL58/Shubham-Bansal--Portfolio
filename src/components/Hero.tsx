import React, { useState, useEffect } from 'react';
import { ArrowRight, FileDown, Mail, Github, Linkedin, Award, ExternalLink, Code2, Sparkles, MapPin, Search, UserCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeCanvas } from './ThreeCanvas';

interface HeroProps {
  onOpenResume: () => void;
  onOpenCommandCenter?: () => void;
  onOpenRecruiterView?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenCommandCenter,
  onOpenRecruiterView
}) => {
  const roles = [
    'Aspiring Full Stack Developer',
    'AI Enthusiast',
    'Computer Science Undergrad',
    'Problem Solver & Builder'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Interactive 3D Three.js particle constellation canvas in background */}
      <ThreeCanvas />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Split Grid: Left = Typographic hierarchy, Right = Visual showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Content (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline & Location Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-cyan-700 dark:text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40">
                {PERSONAL_INFO.tagline}
              </span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-violet-300 dark:to-cyan-400 bg-clip-text text-transparent">Shubham Bansal</span>.
              </h1>

              {/* Dynamic Animated Role */}
              <div className="h-8 sm:h-9 flex items-center">
                <p className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-lg">{'>'}</span>
                  <span className="text-slate-800 dark:text-slate-100 transition-opacity duration-300">
                    {roles[currentRoleIndex]}
                  </span>
                </p>
              </div>
            </div>

            {/* Intro Copy */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl text-pretty font-normal">
              {PERSONAL_INFO.bio}
            </p>

            {/* Three Primary CTA Buttons + Recruiter Quick View */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="theme-btn-primary px-6 py-3 text-sm font-semibold rounded-lg gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="theme-btn-secondary px-5 py-3 text-sm font-semibold rounded-lg gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="theme-btn-ghost px-5 py-3 text-sm font-semibold rounded-lg gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>Let's Connect</span>
              </a>

              {onOpenRecruiterView && (
                <button
                  type="button"
                  onClick={onOpenRecruiterView}
                  className="theme-btn-cyan px-4 py-3 text-xs font-semibold rounded-lg gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-cyan-700 dark:text-cyan-400" />
                  <span>Recruiter Quick View</span>
                </button>
              )}
            </div>

            {/* Social Links Row */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub profile of Shubham Bansal"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">GitHub</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn profile of Shubham Bansal"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={PERSONAL_INFO.googleSkills}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label="Google Skills Profile of Shubham Bansal"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Google Skills</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                aria-label="Email Shubham Bansal"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase (col-span-5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-xl shadow-slate-200/50 dark:shadow-indigo-950/30 group">
              {/* Image Frame with Fallback Container */}
              <img
                src={PERSONAL_INFO.heroImage}
                alt="Shubham Bansal developer workspace with neural visualization and code"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Bottom Card Overlay with Verified Highlights */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl theme-card-surface backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Engineering Focus</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">Full Stack & AI</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-mono font-medium">
                  <span>React.js</span>
                  <span aria-hidden="true">·</span>
                  <span>Node.js</span>
                  <span aria-hidden="true">·</span>
                  <span>MongoDB</span>
                  <span aria-hidden="true">·</span>
                  <span>Python</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Stats Strip Below Split */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl theme-card-surface backdrop-blur-sm">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

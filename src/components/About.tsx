import React, { useMemo } from 'react';
import { Terminal, Brain, Compass, Cpu, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ReadingTimeBadge } from './ReadingTimeBadge';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Terminal,
      title: 'Full Stack Engineering',
      description: 'Building end-to-end web architectures, connecting reactive interfaces with RESTful server backends, database layers, and authentication systems.'
    },
    {
      icon: Brain,
      title: 'AI Exploration & Tools',
      description: 'Investigating practical applications of generative AI, prompt engineering, and intelligent recommendations to build smart career and workflow tools.'
    },
    {
      icon: Cpu,
      title: 'Foundations & Problem Solving',
      description: 'Strengthening knowledge in Data Structures, Algorithms, Operating Systems, and clean software engineering principles through regular practice.'
    },
    {
      icon: Compass,
      title: 'Collaborative Leadership',
      description: 'Demonstrated experience as Co-Leader in 5-member team engineering projects, campus ambassadorship, and active peer development.'
    }
  ];

  const highlights = [
    '2nd Year Computer Science Engineering undergrad at IMS Engineering College (AKTU)',
    'Practical hands-on experience across multiple internships (CodSoft, CodeAlpha, Thiranex)',
    'Verified certifications from IBM SkillsBuild, Google Skills, be10x, and Unstop',
    'Actively seeking software engineering and full stack developer internship opportunities'
  ];

  const aboutCorpus = useMemo(() => [
    ...PERSONAL_INFO.aboutDetailed,
    ...highlights,
    ...pillars.map((p) => `${p.title}. ${p.description}`)
  ], [highlights, pillars]);

  return (
    <section id="about" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
              About Me
            </span>
            <ReadingTimeBadge content={aboutCorpus} defaultWpm={200} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Driven by curiosity, focused on building practical software.
          </h2>
        </div>

        {/* 2-Column Story & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Highlights (col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {PERSONAL_INFO.aboutDetailed.map((paragraph, idx) => (
                <p key={idx} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Key Takeaways */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Core Profile Highlights
              </h3>
              <ul className="space-y-2.5">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: 4 Strategic Focus Pillars (col-span-6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl theme-card-surface flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

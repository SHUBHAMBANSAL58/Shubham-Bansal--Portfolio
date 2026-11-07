import React, { useMemo } from 'react';
import { JOURNEY_MILESTONES } from '../data/portfolioData';
import { Award, Briefcase, GraduationCap, Compass } from 'lucide-react';
import { ReadingTimeBadge } from './ReadingTimeBadge';

export const DeveloperJourney: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return GraduationCap;
      case 'Internship':
        return Briefcase;
      case 'Project':
        return Award;
      default:
        return Compass;
    }
  };

  const journeyCorpus = useMemo(() => {
    return JOURNEY_MILESTONES.flatMap((m) => [
      m.title,
      m.organization,
      m.description,
      ...m.badges
    ]);
  }, []);

  return (
    <section id="journey" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold block">
            Milestones & Progression
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Developer Journey Timeline
            </h2>
            <ReadingTimeBadge content={journeyCorpus} defaultWpm={200} />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A chronological timeline of academic achievements, production internships, campus leadership, and full-stack software milestones.
          </p>
        </div>

        {/* Timeline Line & Milestone Blocks */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {JOURNEY_MILESTONES.map((milestone, idx) => {
            const Icon = getIcon(milestone.category);
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-white dark:bg-[#030712] border-2 border-indigo-600 dark:border-indigo-500/80 group-hover:border-cyan-500 dark:group-hover:border-cyan-400 flex items-center justify-center transition-colors shadow-sm dark:shadow-lg">
                  <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors" />
                </div>

                {/* Milestone Content Card */}
                <div className="p-6 rounded-2xl theme-card-surface space-y-3 max-w-3xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded border border-indigo-200 dark:border-indigo-800/50 w-fit">
                      {milestone.year}
                    </span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                      {milestone.organization}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors">
                    {milestone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Highlights / Badges (Unboxed metadata per Zero-Pill rule) */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                    {milestone.badges.map((badge, bIdx) => (
                      <React.Fragment key={badge}>
                        {bIdx > 0 && <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>}
                        <span className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">{badge}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

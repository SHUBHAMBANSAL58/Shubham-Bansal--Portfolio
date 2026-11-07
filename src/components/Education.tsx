import React from 'react';
import { EDUCATION } from '../data/portfolioData';
import { GraduationCap, Calendar, CheckCircle2, Award } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Education & Academic Foundations
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Computer science coursework, engineering fundamentals, and verified secondary academic milestones.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="space-y-6">
          {EDUCATION.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl theme-card-surface"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-300 font-medium pl-11">
                    {item.institution} {item.affiliation ? `· ${item.affiliation}` : ''}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 sm:text-right pl-11 sm:pl-0">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-500" />
                    <span>{item.period}</span>
                  </div>
                  {item.score && (
                    <div className="flex items-center gap-1 text-cyan-800 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-200 dark:border-cyan-800/40">
                      <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{item.score}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Highlights */}
              <div className="pt-4 space-y-3">
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                  Status: <span className="text-slate-900 dark:text-slate-200 font-medium">{item.status}</span>
                </div>
                <ul className="space-y-2">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

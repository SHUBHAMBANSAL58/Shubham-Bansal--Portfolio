import React, { useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { CheckCircle2, ChevronRight, Building2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((e) => e.id === activeExpId) || EXPERIENCES[0];

  return (
    <section id="experience" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
            Work History & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Internships & Professional Experience
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Real-world software engineering internships, collaborative development sprints, and campus outreach leadership.
          </p>
        </div>

        {/* Desktop Interactive Layout: Left Organizations List, Right Detailed Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Organizations Column (col-span-4) */}
          <div className="lg:col-span-4 space-y-2.5">
            {EXPERIENCES.map((exp) => {
              const isSelected = exp.id === activeExpId;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExpId(exp.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-indigo-500/60 shadow-md shadow-indigo-100 dark:shadow-indigo-950/40'
                      : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/80 hover:bg-white dark:hover:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                        {exp.organization}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {exp.role}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-0.5">
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'text-indigo-600 dark:text-indigo-400 translate-x-1' : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Experience Detail View (col-span-8) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl theme-card-surface backdrop-blur-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800/80">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {activeExp.organization}
                  </h3>
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                  {activeExp.role}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Verified Status:</span>
                <span>{activeExp.verifiedStatus}</span>
              </div>
            </div>

            {/* Overview */}
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeExp.description}
            </p>

            {/* Key Responsibilities */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-slate-400 font-semibold">
                Key Responsibilities & Deliverables
              </h4>
              <ul className="space-y-2.5">
                {activeExp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used (Unboxed text with separators per Zero-Pill rule) */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-medium">
                Technologies & Tools Applied:
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                {activeExp.technologies.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    {idx > 0 && <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>}
                    <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{tech}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

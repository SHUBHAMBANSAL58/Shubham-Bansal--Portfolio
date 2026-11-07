import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types/portfolio';
import { Award, ExternalLink, ShieldCheck, CheckCircle2, X } from 'lucide-react';

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certificates" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
            Verified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Certifications & Industry Badges
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Authenticated professional certifications from IBM, Google Skills, be10x, and Unstop in AI, cloud computing, and security.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl theme-card-surface flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
                      aria-label={`Verify ${cert.title} on ${cert.issuer}`}
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    {cert.issuer}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills gained (Unboxed text with separators per Zero-Pill rule) */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Validated Competencies:
                  </span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                    {cert.skillsGained.map((skill, idx) => (
                      <React.Fragment key={skill}>
                        {idx > 0 && <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>}
                        <span>{skill}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Achievement</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Detail Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#090d1c] border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
            <button
              type="button"
              onClick={() => setActiveCert(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Close certificate dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">{activeCert.issuer}</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeCert.title}</h3>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeCert.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-700 dark:text-slate-400 uppercase tracking-wider font-semibold">
                Competencies Gained:
              </span>
              <ul className="space-y-1.5">
                {activeCert.skillsGained.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {activeCert.verificationUrl ? (
                <a
                  href={activeCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow cursor-pointer"
                >
                  <span>Open Verification Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Issued by {activeCert.issuer}</span>
              )}
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

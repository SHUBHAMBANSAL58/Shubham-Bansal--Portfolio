import React, { useEffect, useState } from 'react';
import { X, FileDown, Mail, Check, Copy, ExternalLink, Award } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES } from '../data/portfolioData';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({
  isOpen,
  onClose,
  onOpenResume
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#090d1c] border border-slate-200 dark:border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close recruiter quick view"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>30-Second Candidate Dossier</span>
          </div>
          <h2 id="recruiter-modal-title" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {PERSONAL_INFO.name} — Recruiter Quick View
          </h2>
          <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium">
            {PERSONAL_INFO.role} · IMS Engineering College, AKTU (2025–2029)
          </p>
        </div>

        {/* Executive Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 font-mono text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Primary Focus</span>
            <span className="font-bold text-slate-900 dark:text-white">Full Stack & AI</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Current Degree</span>
            <span className="font-bold text-slate-900 dark:text-white">B.Tech CSE (2nd Yr)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Internships</span>
            <span className="font-bold text-slate-900 dark:text-white">3 Verified Roles</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Availability</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">Internships Ready</span>
          </div>
        </div>

        {/* Core Stack Snapshot */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
            Key Technical Proficiencies
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-slate-500 font-mono">Frontend:</span>
              <span className="text-slate-900 dark:text-white font-medium">React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-slate-500 font-mono">Backend:</span>
              <span className="text-slate-900 dark:text-white font-medium">Node.js, Express.js, RESTful API Design</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-slate-500 font-mono">Databases:</span>
              <span className="text-slate-900 dark:text-white font-medium">MongoDB, SQLite, SQL Foundations</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-slate-500 font-mono">Languages & Tools:</span>
              <span className="text-slate-900 dark:text-white font-medium">Python, Git, GitHub, VS Code</span>
            </div>
          </div>
        </div>

        {/* Verified Internships Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
            Verified Internship Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between items-baseline font-bold text-slate-900 dark:text-white">
                  <span>{exp.organization}</span>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">Verified</span>
                </div>
                <div className="text-indigo-600 dark:text-indigo-300 font-medium">{exp.role}</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top 2 Featured Projects */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
            Key Software Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {PROJECTS.slice(0, 2).map((proj) => (
              <div key={proj.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>{proj.title}</span>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 inline-flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {proj.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Actions Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Shubham</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenResume();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Full CV & PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

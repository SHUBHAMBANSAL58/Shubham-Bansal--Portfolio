import React, { useEffect } from 'react';
import { X, FileDown, Printer, MapPin, GraduationCap, Briefcase, Award, Code2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#090d1c] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
        {/* Top Action Bar */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 id="modal-resume-title" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Shubham Bansal — Curriculum Vitae</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Verified resume document & credentials
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Shubham_Bansal_Resume.pdf"
              download="Shubham_Bansal_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-slate-50 dark:bg-[#0b1022] text-slate-800 dark:text-slate-200">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shubham Bansal
            </h1>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {PERSONAL_INFO.role}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                {PERSONAL_INFO.location}
              </span>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-800 dark:text-slate-300 hover:underline">
                {PERSONAL_INFO.email}
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                LinkedIn Profile
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-700 dark:text-cyan-400 hover:underline">
                GitHub: SHUBHAMBANSAL58
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">{edu.degree}</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{edu.period}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300">
                    <span>{edu.institution} {edu.affiliation ? `(${edu.affiliation})` : ''}</span>
                    {edu.score && <span className="font-mono font-semibold text-cyan-700 dark:text-cyan-400">Score: {edu.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Internship & Leadership Experience</span>
            </h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">{exp.role} — <span className="text-indigo-600 dark:text-indigo-300">{exp.organization}</span></span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Key Software Projects</span>
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">{proj.title} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({proj.category})</span></span>
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:underline">
                      GitHub
                    </a>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{proj.description}</p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Tech: {proj.technologies.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Certifications & Verified Credentials</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">{cert.title}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

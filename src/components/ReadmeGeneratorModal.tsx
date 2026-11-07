import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { generateReadmeFromProject, generateProjectReadme } from '../utils/readmeGenerator';
import { AnalyticsEvents } from '../utils/firebaseAnalytics';

interface ReadmeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string | null;
}

export const ReadmeGeneratorModal: React.FC<ReadmeGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialProjectId,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || PROJECTS[0].id
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('My Awesome Engineering Project');
  const [customTagline, setCustomTagline] = useState<string>('High-Performance Full-Stack Web Platform');
  const [customDesc, setCustomDesc] = useState<string>('A modern, scalable web service engineered with production-ready standards.');
  const [customTech, setCustomTech] = useState<string>('React, TypeScript, Node.js, Express, PostgreSQL, Tailwind CSS');

  if (!isOpen) return null;

  const currentProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const generatedMarkdown = customMode
    ? generateProjectReadme({
        projectTitle: customTitle,
        tagline: customTagline,
        description: customDesc,
        technologies: customTech.split(',').map((t) => t.trim()).filter(Boolean),
        features: [
          'Modular Component Architecture',
          'Type-Safe REST API Endpoints',
          'Responsive Cross-Platform UI Design',
          'Automated CI/CD & Production Build Pipeline',
        ],
        problem: 'Engineering teams often need clear architectural specifications and standardized documentation.',
        solution: 'Built with layered separation of concerns and end-to-end data flow validation.',
      })
    : generateReadmeFromProject(currentProject);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    AnalyticsEvents.trackReadmeGenerated(customMode ? customTitle : currentProject.title);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(customMode ? customTitle : currentProject.title).toLowerCase().replace(/[^a-z0-9]/g, '-')}-README.md`;
    link.click();
    URL.revokeObjectURL(url);
    AnalyticsEvents.trackReadmeGenerated(customMode ? customTitle : currentProject.title);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Professional README.md Generator"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>Professional README.md Generator</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700/60 text-indigo-700 dark:text-indigo-300">
                  Markdown v2.0
                </span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Generate production-ready GitHub documentation with badges, stack specs, and setup instructions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close README generator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Selector & Mode Switch */}
        <div className="px-6 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold mr-1">
              Select Project Template:
            </span>
            {PROJECTS.map((p) => {
              const isSelected = !customMode && selectedProjectId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setCustomMode(false);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm font-semibold'
                      : 'bg-white dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setCustomMode(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                customMode
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm font-semibold'
                  : 'bg-white dark:bg-slate-950/60 text-cyan-800 dark:text-cyan-400 hover:text-cyan-950 dark:hover:text-white border-cyan-200 dark:border-cyan-800/60'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Custom Project</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Custom Edit Inputs if in Custom Mode */}
        {customMode && (
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">Project Title</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">Tagline / Subtitle</label>
              <input
                type="text"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 mb-1">Technologies (comma-separated)</label>
              <input
                type="text"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
            </div>
          </div>
        )}

        {/* Markdown Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100/60 dark:bg-slate-950/40">
          <pre className="text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap select-all leading-relaxed bg-white dark:bg-[#060914] p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-inner">
            {generatedMarkdown}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Ready to place in repository root as README.md</span>
          </span>
          <span className="text-[11px] text-slate-500">
            {generatedMarkdown.length} characters
          </span>
        </div>
      </div>
    </div>
  );
};

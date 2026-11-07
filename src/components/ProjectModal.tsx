import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Layers, Sparkles, AlertCircle, ArrowUpRight, Calendar, Eye } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectStackMetrics } from './ProjectStackMetrics';
import { getPrimaryTechBadge } from '../utils/projectBadges';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenArchitectureExplorer?: (projectId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenArchitectureExplorer
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'challenges' | 'roadmap'>('overview');
  const [cachedProject, setCachedProject] = useState<Project | null>(project);

  useEffect(() => {
    if (project) {
      setCachedProject(project);
      setActiveTab('overview');
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  const displayProject = project || cachedProject;

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && displayProject && (
        <motion.div
          key="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          style={{ zIndex: 70 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="project-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18, ease: 'easeIn' } }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#090d1c] border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="space-y-0.5 pr-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-cyan-700 dark:text-cyan-400">
                  <span className="font-semibold">{displayProject.category}</span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-800 dark:text-cyan-300">
                    <Eye className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span>Live Verified Dossier</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="text-slate-500 dark:text-slate-400">Case Study</span>

                  {(displayProject.dateCompleted || displayProject.timeline) && (
                    <>
                      <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70"
                        title={displayProject.timeline ? `Timeline: ${displayProject.timeline}` : `Date Completed: ${displayProject.dateCompleted}`}
                      >
                        <Calendar className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        <span>{displayProject.timeline || displayProject.dateCompleted}</span>
                      </span>
                    </>
                  )}
                </div>
                <h2 id="modal-project-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {displayProject.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {onOpenArchitectureExplorer && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenArchitectureExplorer(displayProject.id);
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-800 dark:text-cyan-300 hover:text-cyan-950 dark:hover:text-white bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                    title="Launch interactive 4-tier system architecture explorer"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Architecture Explorer</span>
                  </button>
                )}
                <a
                  href={displayProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={`View Repository: ${displayProject.title}`}
                  aria-label={`View ${displayProject.title} repository on GitHub`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300" />
                  <span>View Repository</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-950/40 text-xs font-medium shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`pb-2.5 transition-colors relative cursor-pointer ${
                  activeTab === 'overview' ? 'text-indigo-600 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Overview & Features
                {activeTab === 'overview' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`pb-2.5 transition-colors relative cursor-pointer ${
                  activeTab === 'architecture' ? 'text-indigo-600 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Architecture Diagram
                {activeTab === 'architecture' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('challenges')}
                className={`pb-2.5 transition-colors relative cursor-pointer ${
                  activeTab === 'challenges' ? 'text-indigo-600 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Challenges & Solutions
                {activeTab === 'challenges' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('roadmap')}
                className={`pb-2.5 transition-colors relative cursor-pointer ${
                  activeTab === 'roadmap' ? 'text-indigo-600 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Future Improvements
                {activeTab === 'roadmap' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                    <img
                      src={displayProject.image}
                      alt={displayProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Problem & Role Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Problem Solved</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{displayProject.caseStudy.problem}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 uppercase font-semibold">My Role & Contribution</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{displayProject.caseStudy.role}</p>
                    </div>
                  </div>

                  {/* Executive Description */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
                      Detailed Case Overview
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {displayProject.caseStudy.overview}
                    </p>
                  </div>

                  {/* Implemented Features */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
                      Key Implemented Capabilities
                    </h3>
                    <ul className="space-y-2">
                      {displayProject.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Technologies & Full Stack */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        Primary Stack:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(displayProject.primaryTechnologies || displayProject.technologies.slice(0, 3))
                          .map(getPrimaryTechBadge)
                          .map((tech) => (
                            <span
                              key={tech.id}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg border ${tech.badgeStyle}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${tech.dotColor}`} />
                              {tech.icon}
                              <span>{tech.label}</span>
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                        Full Tech Stack:
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-200">
                        {displayProject.technologies.map((tech, idx) => (
                          <React.Fragment key={tech}>
                            {idx > 0 && <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>}
                            <span className="text-indigo-700 dark:text-indigo-300 font-medium">{tech}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Technical Metrics & Stack Weight Profile */}
                  <ProjectStackMetrics metrics={displayProject.stackMetrics} projectTitle={displayProject.title} />
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  {/* Architecture Explorer CTA Banner */}
                  {onOpenArchitectureExplorer && (
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-cyan-50 via-indigo-50 to-purple-50 dark:from-cyan-950/40 dark:via-indigo-950/40 dark:to-purple-950/30 border border-cyan-200 dark:border-cyan-800/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          <span className="text-xs font-mono font-semibold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                            Interactive 4-Tier Visualizer
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-700/60 rounded">
                            Full Stack Trace
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300">
                          Explore live frontend, API gateway, backend logic, and database persistence with end-to-end request tracing.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenArchitectureExplorer(displayProject.id);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                      >
                        <Layers className="w-4 h-4 text-cyan-200" />
                        <span>Launch 4-Tier Explorer</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
                      System Architecture Flow
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Layer-by-layer architectural breakdown illustrating request routing, state management, controller logic, and persistence.
                    </p>
                  </div>

                  {/* Architecture Nodes Flow */}
                  <div className="space-y-4">
                    {displayProject.caseStudy.architecture.map((node, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">Layer {idx + 1}:</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{node.layer}</span>
                          </div>
                          <p className="text-xs text-slate-700 dark:text-slate-300">{node.description}</p>
                        </div>

                        <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-indigo-700 dark:text-indigo-300 shrink-0 w-fit">
                          {node.component}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'challenges' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
                      Engineering Obstacles & Implemented Solutions
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Authentic problem-solving scenarios encountered and resolved during development.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {displayProject.caseStudy.challenges.map((c, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Challenge #{idx + 1}
                          </span>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.challenge}</p>
                        </div>

                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
                          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Engineering Solution
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{c.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'roadmap' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold">
                      Future Roadmap & Scalability Improvements
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Planned architectural iterations, integration expansion, and production optimizations.
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {displayProject.caseStudy.futureImprovements.map((imp, idx) => (
                      <li key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-4">
                <a
                  href={displayProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  <span>Explore Code on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                {onOpenArchitectureExplorer && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenArchitectureExplorer(displayProject.id);
                    }}
                    className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Open 4-Tier Explorer</span>
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-300 dark:border-slate-800 cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

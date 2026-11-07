import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_ARCHITECTURES } from '../data/projectArchitectures';
import {
  X,
  Layers,
  Globe,
  Network,
  Cpu,
  Database,
  ArrowRight,
  ShieldCheck,
  Code2,
  ExternalLink,
  Github,
  CheckCircle2,
  Workflow,
  Info
} from 'lucide-react';

interface ArchitectureExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string | null;
}

export const ArchitectureExplorerModal: React.FC<ArchitectureExplorerModalProps> = ({
  isOpen,
  onClose,
  initialProjectId
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || PROJECT_ARCHITECTURES[0].projectId
  );
  const [activeTab, setActiveTab] = useState<'diagram' | 'dataflow'>('diagram');
  const [selectedTierKey, setSelectedTierKey] = useState<'frontend' | 'api' | 'backend' | 'database'>('frontend');
  const [activeDataFlowStep, setActiveDataFlowStep] = useState<number>(1);

  // Sync initialProjectId when opened
  useEffect(() => {
    if (initialProjectId) {
      const match = PROJECT_ARCHITECTURES.find((p) => p.projectId === initialProjectId);
      if (match) {
        setSelectedProjectId(match.projectId);
      }
    }
  }, [initialProjectId]);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const currentProject =
    PROJECT_ARCHITECTURES.find((p) => p.projectId === selectedProjectId) ||
    PROJECT_ARCHITECTURES[0];

  const tiers = [
    {
      key: 'frontend' as const,
      tier: currentProject.tiers.frontend,
      icon: Globe,
      color: 'text-cyan-700 dark:text-cyan-400',
      borderColor: 'border-cyan-300 dark:border-cyan-500/30',
      activeBorder: 'border-cyan-500 dark:border-cyan-400 ring-2 ring-cyan-500/20',
      bgColor: 'bg-cyan-50/70 dark:bg-cyan-950/20',
      accentBg: 'bg-cyan-100 dark:bg-cyan-500/10'
    },
    {
      key: 'api' as const,
      tier: currentProject.tiers.api,
      icon: Network,
      color: 'text-indigo-700 dark:text-indigo-400',
      borderColor: 'border-indigo-300 dark:border-indigo-500/30',
      activeBorder: 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20',
      bgColor: 'bg-indigo-50/70 dark:bg-indigo-950/20',
      accentBg: 'bg-indigo-100 dark:bg-indigo-500/10'
    },
    {
      key: 'backend' as const,
      tier: currentProject.tiers.backend,
      icon: Cpu,
      color: 'text-purple-700 dark:text-purple-400',
      borderColor: 'border-purple-300 dark:border-purple-500/30',
      activeBorder: 'border-purple-500 dark:border-purple-400 ring-2 ring-purple-500/20',
      bgColor: 'bg-purple-50/70 dark:bg-purple-950/20',
      accentBg: 'bg-purple-100 dark:bg-purple-500/10'
    },
    {
      key: 'database' as const,
      tier: currentProject.tiers.database,
      icon: Database,
      color: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-300 dark:border-emerald-500/30',
      activeBorder: 'border-emerald-500 dark:border-emerald-400 ring-2 ring-emerald-500/20',
      bgColor: 'bg-emerald-50/70 dark:bg-emerald-950/20',
      accentBg: 'bg-emerald-100 dark:bg-emerald-500/10'
    }
  ];

  const activeTierConfig = tiers.find((t) => t.key === selectedTierKey) || tiers[0];
  const activeStep =
    currentProject.dataFlowSteps.find((s) => s.step === activeDataFlowStep) ||
    currentProject.dataFlowSteps[0];

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="arch-explorer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="architecture-explorer-title"
          style={{ zIndex: 70 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="arch-explorer-container"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.18, ease: 'easeIn' } }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header Bar */}
            <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                  System Architecture Explorer
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 rounded">
                  4-Tier Stack
                </span>
              </div>
              <h2 id="architecture-explorer-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Tech Stack Architecture Diagram
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-[11px] font-mono text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">ESC</kbd> to close
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close architecture explorer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="p-3 sm:px-6 bg-slate-100/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 shrink-0 hidden lg:inline">
              Select Project:
            </span>
            {PROJECT_ARCHITECTURES.map((p) => {
              const isSelected = p.projectId === selectedProjectId;
              return (
                <button
                  key={p.projectId}
                  type="button"
                  onClick={() => {
                    setSelectedProjectId(p.projectId);
                    setActiveDataFlowStep(1);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 border border-indigo-400/40'
                      : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{p.projectTitle}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {p.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Diagram vs Flow */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900/90 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('diagram')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'diagram'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Stack Diagram</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dataflow')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dataflow'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Data Flow Trace</span>
            </button>
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
          {/* Active Project Dossier Strip */}
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{currentProject.category}</span>
                <span aria-hidden="true" className="text-slate-400 dark:text-slate-700">·</span>
                <span className="text-slate-600 dark:text-slate-400">{currentProject.architecturePattern}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentProject.projectTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {currentProject.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span className="text-slate-500">DB: </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{currentProject.databaseEngine}</span>
              </div>

              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-500 dark:text-slate-400" />
              </a>
            </div>
          </div>

          {activeTab === 'diagram' ? (
            /* ==============================================================
               DIAGRAM VIEW: 4 Core Tiers with Interactive Deep-Dive Inspector
               ============================================================== */
            <div className="space-y-6">
              {/* Visual Pipeline Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {tiers.map((t, idx) => {
                  const Icon = t.icon;
                  const isSelected = selectedTierKey === t.key;

                  return (
                    <div
                      key={t.key}
                      onClick={() => setSelectedTierKey(t.key)}
                      className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between relative group ${
                        t.bgColor
                      } ${isSelected ? t.activeBorder : `${t.borderColor} hover:border-slate-400 dark:hover:border-slate-600`}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.accentBg} ${t.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                            Tier {idx + 1}
                          </span>
                        </div>

                        <div>
                          <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${t.color}`}>
                            {t.tier.name}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                            {t.tier.title}
                          </h4>
                        </div>

                        {/* Technology List (Unboxed dot separated per zero-pill) */}
                        <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800/80">
                          {t.tier.technologies.slice(0, 3).map((tech, tIdx) => (
                            <span key={tech}>
                              {tIdx > 0 && <span className="mx-1 text-slate-400 dark:text-slate-600">·</span>}
                              <span className="text-slate-800 dark:text-slate-300">{tech}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                          {isSelected ? 'Inspecting Tier' : 'Click to inspect'}
                        </span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? `${t.color} translate-x-1` : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Data Flow Directional Indicators */}
              <div className="hidden md:flex items-center justify-around px-8 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span>Client Request</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Routing & Auth</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Queries & Commits</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Deep-Dive Tier Inspector Card */}
              <div className={`rounded-xl border p-5 sm:p-6 transition-all bg-slate-50/90 dark:bg-slate-950/90 ${activeTierConfig.borderColor}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTierConfig.accentBg} ${activeTierConfig.color}`}>
                      <activeTierConfig.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${activeTierConfig.color}`}>
                          Tier Focus: {activeTierConfig.tier.name} Layer
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {activeTierConfig.tier.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {activeTierConfig.tier.protocolsOrFormats.map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-0.5 text-[11px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
                  {/* Left Column: Description & Security/Optimization (7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                        Layer Role & Architecture
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                        {activeTierConfig.tier.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-700 dark:text-indigo-300 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Security & Performance Rationale:</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {activeTierConfig.tier.securityOrOptimization}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                        Technologies Deployed
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-200 mt-1">
                        {activeTierConfig.tier.technologies.map((t, idx) => (
                          <span key={t}>
                            {idx > 0 && <span className="text-slate-400 dark:text-slate-600 mr-2">·</span>}
                            <span className="text-slate-900 dark:text-white font-medium">{t}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key Components & Handlers (5 cols) */}
                  <div className="lg:col-span-5 space-y-3 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Key Architectural Components</span>
                    </span>
                    <ul className="space-y-2">
                      {activeTierConfig.tier.keyComponents.map((comp, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${activeTierConfig.color}`} />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ==============================================================
               DATA FLOW TRACE VIEW: End-to-End Request/Response Lifecycle
               ============================================================== */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                    End-to-End Request & Response Pipeline
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Step-by-step trace showing how user interactions travel through each architectural tier.
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-slate-500">
                  <span>Step {activeStep.step} of {currentProject.dataFlowSteps.length}</span>
                </div>
              </div>

              {/* Step Navigation Pill Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {currentProject.dataFlowSteps.map((s) => {
                  const isActive = s.step === activeDataFlowStep;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setActiveDataFlowStep(s.step)}
                      className={`p-2.5 rounded-lg text-left transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-400 dark:border-indigo-500 text-indigo-900 dark:text-white shadow-xs'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono font-bold ${
                          isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          0{s.step}
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />}
                      </div>
                      <span className="text-[11px] font-semibold block truncate mt-1">
                        {s.source.split(' ')[0]} → {s.target.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Card */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-600/20 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-mono font-bold text-xs">
                      {activeStep.step}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      <span className="text-cyan-700 dark:text-cyan-400 font-mono">{activeStep.source}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <span className="text-purple-700 dark:text-purple-400 font-mono">{activeStep.target}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-mono bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 rounded border border-slate-200 dark:border-slate-800">
                    {activeStep.payloadType}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Action Executed
                    </span>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mt-1 leading-relaxed">
                      {activeStep.action}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Architectural Handling Rationale
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      {activeStep.description}
                    </p>
                  </div>
                </div>

                {/* Stepper Controls */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveDataFlowStep((prev) => Math.max(1, prev - 1))}
                    disabled={activeDataFlowStep === 1}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-800 transition-colors cursor-pointer"
                  >
                    Previous Step
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveDataFlowStep((prev) =>
                        Math.min(currentProject.dataFlowSteps.length, prev + 1)
                      )
                    }
                    disabled={activeDataFlowStep === currentProject.dataFlowSteps.length}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors cursor-pointer"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">
              Architecture represents real implementation in Shubham's GitHub repositories.
            </span>
            <span className="sm:hidden">Verified architecture blueprints.</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-800 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Inspect Source</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Done Exploring
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

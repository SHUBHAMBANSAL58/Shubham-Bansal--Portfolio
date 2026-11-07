import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectPreviewSnippet } from '../types/portfolio';
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Layout,
  Layers,
  ArrowUpRight,
  Github,
  Calendar,
  Copy,
  Check,
  Terminal,
  Maximize2
} from 'lucide-react';
import { PrimaryTechConfig } from '../utils/projectBadges';
import { playProjectCardClickSound } from '../utils/soundEffects';

interface ProjectPreviewCarouselProps {
  project: Project;
  onInspect: () => void;
  primaryBadges: PrimaryTechConfig[];
  selectedTech: string;
  onToggleTech: (techKey: string) => void;
}

export const ProjectPreviewCarousel: React.FC<ProjectPreviewCarouselProps> = ({
  project,
  onInspect,
  primaryBadges,
  selectedTech,
  onToggleTech
}) => {
  const snippets: ProjectPreviewSnippet[] =
    project.previewSnippets && project.previewSnippets.length > 0
      ? project.previewSnippets
      : [
          {
            id: 'default-ui',
            title: project.title,
            subtitle: project.tagline,
            type: 'ui_screenshot',
            badge: 'UI View',
            image: project.image
          }
        ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const activeSnippet = snippets[currentIndex] || snippets[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    playProjectCardClickSound();
    setCurrentIndex((prev) => (prev === 0 ? snippets.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    playProjectCardClickSound();
    setCurrentIndex((prev) => (prev === snippets.length - 1 ? 0 : prev + 1));
  };

  const handleSelectTab = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index !== currentIndex) {
      playProjectCardClickSound();
      setCurrentIndex(index);
    }
  };

  const handleCopyCode = (e: React.MouseEvent, code?: string) => {
    e.stopPropagation();
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev === 0 ? snippets.length - 1 : prev - 1));
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev === snippets.length - 1 ? 0 : prev + 1));
    }
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'code_snippet':
        return <Code2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />;
      case 'architecture_diagram':
        return <Layers className="w-3 h-3 text-purple-600 dark:text-purple-400" />;
      case 'ui_screenshot':
      default:
        return <Layout className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <div
      className="group/carousel relative aspect-video rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-950 shadow-inner select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Interactive preview carousel for ${project.title}`}
    >
      {/* Slide Content Renderers */}
      <div className="relative w-full h-full">
        {/* Type 1: UI Screenshot */}
        {activeSnippet.type === 'ui_screenshot' && (
          <div
            onClick={() => {
              playProjectCardClickSound();
              onInspect();
            }}
            className="cursor-pointer w-full h-full relative"
            title={`Click to inspect case study of ${project.title}`}
          >
            <img
              src={activeSnippet.image || project.image}
              alt={`Preview of ${project.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover/carousel:scale-[1.03] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover/carousel:opacity-30 transition-opacity" />

            {/* Hover Overlay Prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold shadow-xl border border-indigo-400/40 transform group-hover/carousel:scale-105 transition-transform duration-300">
                <span>Inspect Full Case Study & Architecture</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        )}

        {/* Type 2: Code Snippet Frame */}
        {activeSnippet.type === 'code_snippet' && (
          <div
            onClick={() => {
              playProjectCardClickSound();
              onInspect();
            }}
            className="cursor-pointer w-full h-full flex flex-col bg-slate-50 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-black text-slate-800 dark:text-slate-200 p-4 font-mono text-xs overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 pl-2">
                  <Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-semibold text-slate-800 dark:text-slate-300">{activeSnippet.title}</span>
                  <span className="text-slate-400 dark:text-slate-600">·</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{activeSnippet.codeLanguage || 'TypeScript'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleCopyCode(e, activeSnippet.codeSnippet)}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-300 dark:border-slate-700"
                title="Copy code snippet to clipboard"
                aria-label="Copy code snippet"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
              <pre className="text-slate-800 dark:text-slate-300 font-mono whitespace-pre-wrap select-text">
                {activeSnippet.codeSnippet?.split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="w-6 shrink-0 text-slate-400 dark:text-slate-600 text-right pr-2.5 select-none text-[10px]">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        line.trim().startsWith('//')
                          ? 'text-slate-500 italic'
                          : line.includes('import') || line.includes('export') || line.includes('const') || line.includes('return')
                          ? 'text-cyan-700 dark:text-cyan-300 font-semibold'
                          : line.includes('function') || line.includes('class')
                          ? 'text-purple-700 dark:text-purple-300 font-semibold'
                          : 'text-slate-800 dark:text-slate-200'
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>

            {/* Footer with Subtitle */}
            <div className="pt-2 mt-auto border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 shrink-0">
              <span className="truncate pr-2">{activeSnippet.subtitle}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold shrink-0">Click to expand case study ↗</span>
            </div>
          </div>
        )}

        {/* Type 3: Architecture Diagram Frame */}
        {activeSnippet.type === 'architecture_diagram' && (
          <div
            onClick={() => {
              playProjectCardClickSound();
              onInspect();
            }}
            className="cursor-pointer w-full h-full flex flex-col bg-slate-50 dark:bg-gradient-to-br dark:from-indigo-950/30 dark:via-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200 p-4 font-mono overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-indigo-900/40 shrink-0">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">{activeSnippet.title}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 font-semibold">
                Architecture Blueprint
              </span>
            </div>

            {/* Visual Schematic Diagram */}
            <div className="flex-1 flex flex-col justify-center items-center py-2 px-3 bg-white dark:bg-slate-950/80 rounded-lg border border-slate-200 dark:border-slate-800/90 text-[11px] leading-relaxed shadow-inner">
              <pre className="text-indigo-900 dark:text-indigo-200 font-mono text-center sm:text-left whitespace-pre select-text overflow-x-auto max-w-full">
                {activeSnippet.codeSnippet}
              </pre>
            </div>

            {/* Subtitle */}
            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 shrink-0">
              <span className="truncate pr-2">{activeSnippet.subtitle}</span>
              <span className="text-cyan-700 dark:text-cyan-400 font-semibold shrink-0">Explore Layer Details ↗</span>
            </div>
          </div>
        )}
      </div>

      {/* Top Left: Primary Tech Stack Interactive Badges */}
      <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-1.5 max-w-[70%]">
        {primaryBadges.map((tech) => {
          const isSelected = selectedTech.toLowerCase() === tech.filterKey.toLowerCase();
          return (
            <button
              key={tech.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleTech(tech.filterKey);
              }}
              title={`Click to filter by ${tech.label}`}
              aria-label={`Filter projects by ${tech.label}`}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg backdrop-blur-md transition-all duration-200 border shadow-sm cursor-pointer ${
                isSelected ? tech.overlayActiveStyle : tech.overlayBadgeStyle
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${tech.dotColor} ${
                  isSelected ? 'animate-pulse' : ''
                }`}
              />
              {tech.icon}
              <span>{tech.label}</span>
            </button>
          );
        })}
      </div>

      {/* Top Right: View Repository Icon Button */}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        title={`View Repository: ${project.title}`}
        aria-label={`View Repository for ${project.title}`}
        className="absolute top-3 right-3 z-30 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-700/80 hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-md backdrop-blur-sm group/repobtn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <Github className="w-4 h-4 group-hover/repobtn:scale-110 transition-transform text-slate-700 dark:text-slate-300 group-hover/repobtn:text-slate-900 dark:group-hover/repobtn:text-white" />
      </a>

      {/* Bottom Right: Timeline / Date Completed Badge */}
      {(project.dateCompleted || project.timeline) && (
        <div
          className="absolute bottom-3 right-3 z-30 hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 shadow-md pointer-events-none"
          title={`Completed: ${project.dateCompleted || project.timeline}`}
        >
          <Calendar className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>{project.dateCompleted || project.timeline}</span>
        </div>
      )}

      {/* Carousel Navigation Chevron Arrows (Visible when snippets > 1) */}
      {snippets.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous preview slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-slate-950/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700/80 flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-110 shadow-lg cursor-pointer backdrop-blur-sm focus-visible:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next preview slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-slate-950/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700/80 flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-110 shadow-lg cursor-pointer backdrop-blur-sm focus-visible:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Center: Slide Switcher Tabs (UI View, Code, Architecture) */}
      {snippets.length > 1 && (
        <div className="absolute bottom-3 left-3 sm:left-1/2 sm:-translate-x-1/2 z-30 flex items-center gap-1 p-1 rounded-xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-slate-200 dark:border-slate-800/90 shadow-lg">
          {snippets.map((snip, sIdx) => {
            const isActive = sIdx === currentIndex;
            return (
              <button
                key={snip.id || sIdx}
                type="button"
                onClick={(e) => handleSelectTab(e, sIdx)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs shadow-indigo-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
                aria-label={`Switch to ${snip.badge || snip.title}`}
              >
                {getTabIcon(snip.type)}
                <span>{snip.badge || `Slide ${sIdx + 1}`}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

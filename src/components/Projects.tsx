import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { ArchitectureExplorerModal } from './ArchitectureExplorerModal';
import { ProjectStackMetrics } from './ProjectStackMetrics';
import { ProjectPreviewCarousel } from './ProjectPreviewCarousel';
import { ScrollLinkedProjectCard } from './ScrollLinkedProjectCard';
import {
  Github,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Server,
  Database,
  Code2,
  Terminal,
  Filter,
  X,
  RotateCcw,
  Target,
  Lightbulb,
  Globe,
  Wrench,
  Calendar,
  Volume2,
  VolumeX,
  Eye,
  Tag,
  FileText
} from 'lucide-react';
import { filterProjects } from '../utils/validation';
import { getPrimaryTechBadge } from '../utils/projectBadges';
import {
  playProjectCardHoverSound,
  playProjectCardClickSound,
  isSoundEnabled,
  setSoundEnabled
} from '../utils/soundEffects';
import {
  incrementProjectView,
  subscribeToProjectViews,
  INITIAL_PROJECT_VIEWS
} from '../utils/projectViewCounter';
import { AnalyticsEvents } from '../utils/firebaseAnalytics';

interface ProjectsProps {
  externalSelectedProjectId?: string | null;
  onClearExternalSelectedProject?: () => void;
  externalOpenArchitecture?: boolean;
  onClearExternalOpenArchitecture?: () => void;
  onOpenReadmeGenerator?: (projectId?: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  externalSelectedProjectId,
  onClearExternalSelectedProject,
  externalOpenArchitecture,
  onClearExternalOpenArchitecture,
  onOpenReadmeGenerator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projectViews, setProjectViews] = useState<Record<string, number>>(INITIAL_PROJECT_VIEWS);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [selectedArchitectureProjectId, setSelectedArchitectureProjectId] = useState<string | null>(null);
  const [soundActive, setSoundActive] = useState<boolean>(() => isSoundEnabled());

  // Real-time Firestore subscription to live project view counters
  useEffect(() => {
    const unsubscribe = subscribeToProjectViews((updatedViews) => {
      setProjectViews((prev) => ({ ...prev, ...updatedViews }));
    });
    return () => unsubscribe();
  }, []);

  const toggleAudioFx = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) {
      playProjectCardClickSound();
    }
  };

  useEffect(() => {
    if (externalSelectedProjectId) {
      const match = PROJECTS.find((p) => p.id === externalSelectedProjectId);
      if (match) {
        setActiveModalProject(match);
        incrementProjectView(match.id, match.title);
      }
    }
  }, [externalSelectedProjectId]);

  useEffect(() => {
    if (externalOpenArchitecture) {
      setIsArchitectureModalOpen(true);
      onClearExternalOpenArchitecture?.();
    }
  }, [externalOpenArchitecture, onClearExternalOpenArchitecture]);

  const handleCloseModal = () => {
    setActiveModalProject(null);
    onClearExternalSelectedProject?.();
  };

  const handleOpenArchitecture = (projectId?: string) => {
    if (projectId) {
      setSelectedArchitectureProjectId(projectId);
      const match = PROJECTS.find((p) => p.id === projectId);
      incrementProjectView(projectId, match?.title);
    }
    setIsArchitectureModalOpen(true);
  };

  const handleInspectProject = (project: Project) => {
    playProjectCardClickSound();
    setActiveModalProject(project);
    incrementProjectView(project.id, project.title);
  };

  const handleToggleTech = (techKey: string) => {
    if (selectedTech.toLowerCase() === techKey.toLowerCase()) {
      setSelectedTech('All');
    } else {
      setSelectedTech(techKey);
    }
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const exists = prev.includes(tag);
      const next = exists ? prev.filter((t) => t !== tag) : [...prev, tag];
      AnalyticsEvents.trackTagFilterToggled(tag, !exists);
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedTech('All');
    setSelectedTags([]);
  };

  const availableTags = [
    'React',
    'Firebase',
    'AI',
    'Node.js',
    'MongoDB',
    'SQLite',
    'Express.js',
    'Tailwind CSS'
  ];

  // Primary Category Type Filters (Web, AI/ML, Tools)
  const categoryFilters = [
    { id: 'All', label: 'All Projects', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'Web', label: 'Web', icon: <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> },
    { id: 'AI/ML', label: 'AI/ML', icon: <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> },
    { id: 'Tools', label: 'Tools', icon: <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> }
  ];

  // Quick primary tech options for user filtration
  const primaryTechOptions = [
    { label: 'All Stacks', key: 'All', icon: <Layers className="w-3 h-3" /> },
    { label: 'React', key: 'React', icon: <Code2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> },
    { label: 'Node.js', key: 'Node', icon: <Server className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> },
    { label: 'AI / ML', key: 'AI', icon: <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" /> },
    { label: 'MongoDB', key: 'MongoDB', icon: <Database className="w-3 h-3 text-teal-600 dark:text-teal-400" /> },
    { label: 'SQLite', key: 'SQLite', icon: <Database className="w-3 h-3 text-amber-600 dark:text-amber-400" /> },
    { label: 'JavaScript', key: 'JavaScript', icon: <Terminal className="w-3 h-3 text-yellow-600 dark:text-yellow-400" /> }
  ];

  const filtered = filterProjects(PROJECTS, selectedCategory, selectedTech, selectedTags);

  return (
    <section id="projects" className="py-24 border-t border-slate-200 dark:border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-semibold">
                Featured Engineering
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Selected Software Projects
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Verified software products, AI platforms, and full-stack solutions built with modern production standards.
              </p>
            </div>

            {/* Action buttons: Scroll Dynamics badge, Architecture Explorer & Audio FX Toggle */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                title="Scroll-linked entrance physics smoothly scales & shifts opacity as each card enters the focal viewport"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Scroll Entrance: Reactive</span>
              </div>

              <button
                type="button"
                onClick={toggleAudioFx}
                title={soundActive ? 'Mute interactive card hover sound effects' : 'Enable interactive card hover sound effects'}
                aria-label={soundActive ? 'Mute card hover sound effects' : 'Enable card hover sound effects'}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-xl transition-all border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  soundActive
                    ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                }`}
              >
                {soundActive ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="hidden sm:inline text-[11px] font-medium">Sound: On</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="hidden sm:inline text-[11px] font-medium">Sound: Off</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleOpenArchitecture()}
                className="theme-btn-cyan inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Architecture Explorer</span>
              </button>
            </div>
          </div>

          {/* Category Filter by Type (Web, AI/ML, Tools) Above Project List */}
          <div className="theme-card-surface p-4 rounded-2xl space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-400 font-semibold flex items-center gap-1.5 mr-1">
                  <Filter className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Category Filter:</span>
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {categoryFilters.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    const count = filterProjects(PROJECTS, cat.id, 'All').length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-xl transition-all border cursor-pointer ${
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-400/40 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800/90'
                        }`}
                      >
                        {cat.icon}
                        <span>{cat.label}</span>
                        <span
                          className={`px-1.5 py-0.2 text-[10px] rounded-md font-mono ${
                            isActive
                              ? 'bg-indigo-700 text-indigo-100'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Filter Clear & Count */}
              {(selectedCategory !== 'All' || selectedTech !== 'All' || selectedTags.length > 0) && (
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-300">
                    Showing {filtered.length} of {PROJECTS.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-lg transition-colors cursor-pointer"
                    title="Reset all filters"
                  >
                    <RotateCcw className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sub-filter by Primary Tech Stack */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/70 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-wider font-semibold mr-1">
                Tech Stack:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {primaryTechOptions.map((opt) => {
                  const isSelected =
                    opt.key === 'All'
                      ? selectedTech === 'All'
                      : selectedTech.toLowerCase() === opt.key.toLowerCase();
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedTech(opt.key)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-cyan-300 border-indigo-300 dark:border-cyan-500/60 shadow-xs font-semibold'
                          : 'bg-white dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-300 dark:border-slate-800/80'
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tag-Based Filter System (e.g., 'React', 'Firebase', 'AI') */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 mr-1">
                  <Tag className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                  <span>Filter by Tags:</span>
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleToggleTag(tag)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-400/80 shadow-xs font-semibold ring-1 ring-cyan-400/30'
                            : 'bg-white dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border-slate-300 dark:border-slate-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-600 dark:bg-cyan-400 animate-pulse' : 'bg-slate-400 dark:bg-slate-600'}`} />
                        <span>{tag}</span>
                        {isSelected && <X className="w-3 h-3 text-cyan-600 dark:text-cyan-400 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  Clear tags ({selectedTags.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State when filters yield no results */}
        {filtered.length === 0 && (
          <div className="text-center py-16 px-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-4 shadow-sm">
            <Filter className="w-8 h-8 mx-auto text-indigo-500/60" />
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">No projects found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No projects match the selected category &quot;{selectedCategory}&quot; and tech filter &quot;{selectedTech}&quot;.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* Projects List with Alternating High-Fidelity Cards */}
        <div className="space-y-16">
          {filtered.map((project, index) => {
            const isReversed = index % 2 === 1;

            // Get primary tech configurations
            const primaryList = project.primaryTechnologies || project.technologies.slice(0, 3);
            const primaryBadges = primaryList.map(getPrimaryTechBadge);

            return (
              <ScrollLinkedProjectCard
                key={project.id}
                index={index}
                className="scroll-mt-28"
              >
                <div
                  id={`project-card-${project.id}`}
                  onMouseEnter={() => playProjectCardHoverSound()}
                  className="theme-card-surface group/card relative rounded-2xl hover:border-indigo-400/60 hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden will-change-transform"
                >
                {/* Subtle ambient border glow aura that blooms on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[1.5px] rounded-2xl bg-gradient-to-r from-indigo-500/35 via-cyan-400/25 to-purple-500/35 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-[3px]"
                />
                {/* Secondary crisp border glow line */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/40 via-cyan-400/25 to-purple-500/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-[0.5px]"
                />
                {/* Specular top-edge radiant light beam */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                />
                {/* Subtle specular bottom-edge rim light */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                />

                <div className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Visual Preview Side with Interactive Carousel (col-span-7) */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <ProjectPreviewCarousel
                      project={project}
                      onInspect={() => handleInspectProject(project)}
                      primaryBadges={primaryBadges}
                      selectedTech={selectedTech}
                      onToggleTech={handleToggleTech}
                    />
                  </div>

                  {/* Informational Side (col-span-5) */}
                  <div className={`lg:col-span-5 space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Header row with category, date completed/timeline, live Firestore view counter, and View Repository */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{project.category}</span>
                        <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                        <div
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/80 shadow-2xs"
                          title="Real-time verified project views recorded in Firestore"
                        >
                          <Eye className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                          <span>{projectViews[project.id] ?? (INITIAL_PROJECT_VIEWS[project.id] || 100)} views</span>
                        </div>
                        {(project.dateCompleted || project.timeline) && (
                          <>
                            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                            <span
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 shadow-2xs"
                              title={project.timeline ? `Timeline: ${project.timeline}` : `Date Completed: ${project.dateCompleted}`}
                            >
                              <Calendar className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
                              <span>{project.dateCompleted || project.timeline}</span>
                            </span>
                          </>
                        )}
                      </div>

                      {/* View Repository Icon Button */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={`View Repository: ${project.title}`}
                        aria-label={`View Repository for ${project.title}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                      >
                        <Github className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-[11px] font-semibold hidden sm:inline">View Repository</span>
                      </a>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Primary Technology Visual Badges (Clickable quick filter) */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                        Primary Stack:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {primaryBadges.map((tech) => {
                          const isSelected = selectedTech.toLowerCase() === tech.filterKey.toLowerCase();
                          return (
                            <button
                              key={tech.id}
                              type="button"
                              onClick={() => handleToggleTech(tech.filterKey)}
                              title={`Click to filter by ${tech.label}`}
                              aria-label={`Filter projects by ${tech.label}`}
                              className={`group/badge inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg border transition-all duration-200 cursor-pointer ${
                                isSelected ? tech.activeStyle : tech.badgeStyle
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${tech.dotColor} ${
                                  isSelected ? 'animate-pulse' : ''
                                }`}
                              />
                              {tech.icon}
                              <span>{tech.label}</span>
                              {isSelected && (
                                <X className="w-3 h-3 ml-0.5 text-slate-400 group-hover/badge:text-white" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                        Core Capabilities
                      </span>
                      <ul className="space-y-1.5">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Engineering Insights Drawer (Revealed on Card Hover) */}
                    <div className="space-y-1.5 pt-1">
                      {/* Interactive Reveal Header / Status Bar */}
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 group-hover/card:border-indigo-500/40 transition-colors">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300">
                          <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <span>Problem Solved & Key Challenge</span>
                        </div>
                        <span className="text-[10px] font-mono transition-colors">
                          <span className="text-slate-500 dark:text-slate-400 group-hover/card:hidden">Hover to expand ▾</span>
                          <span className="hidden group-hover/card:inline text-cyan-700 dark:text-cyan-300 font-semibold">Architecture Insight ▴</span>
                        </span>
                      </div>

                      {/* Expandable Content Container with Smooth Height Transition */}
                      <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-all duration-500 ease-out">
                        <div className="overflow-hidden">
                          <div className="pt-1">
                            <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-950/85 dark:to-slate-900/70 border border-indigo-200 dark:border-indigo-500/35 space-y-3 shadow-md dark:shadow-xl dark:shadow-black/50 backdrop-blur-md">
                              {/* Problem Solved Block */}
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-700 dark:text-amber-300 font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                                  <span className="uppercase tracking-wider">Problem Solved</span>
                                </div>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2.5 border-l-2 border-amber-500/40">
                                  {project.caseStudy.problem}
                                </p>
                              </div>

                              {/* Key Challenge & Resolution Block */}
                              {project.caseStudy.challenges?.[0] && (
                                <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-800 dark:text-cyan-300 font-semibold">
                                    <Lightbulb className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                                    <span className="uppercase tracking-wider">Key Engineering Challenge</span>
                                  </div>
                                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-2.5 border-l-2 border-cyan-500/40">
                                    <span className="text-slate-900 dark:text-white font-medium">{project.caseStudy.challenges[0].challenge}</span>
                                    <span className="block mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                                      <strong className="text-indigo-700 dark:text-indigo-300">Solution: </strong>
                                      {project.caseStudy.challenges[0].solution}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technologies (Unboxed text with separators per Zero-Pill rule) */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                        Full Tech Stack:
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                        {project.technologies.map((tech, tIdx) => (
                          <React.Fragment key={tech}>
                            {tIdx > 0 && <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>}
                            <span className="hover:text-indigo-600 dark:hover:text-white transition-colors">{tech}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Technical Metrics & Stack Weight Profile */}
                    <ProjectStackMetrics metrics={project.stackMetrics} projectTitle={project.title} />

                    {/* Action Links */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={`View Repository: ${project.title}`}
                        aria-label={`View Repository for ${project.title}`}
                        className="theme-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-xs"
                      >
                        <Github className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>View Repository</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          playProjectCardClickSound();
                          handleOpenArchitecture(project.id);
                        }}
                        className="theme-btn-cyan inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Tech Architecture</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInspectProject(project)}
                        className="theme-btn-ghost inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer shadow-2xs"
                      >
                        <span>Full Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playProjectCardClickSound();
                          onOpenReadmeGenerator?.(project.id);
                        }}
                        className="theme-btn-secondary inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer shadow-2xs"
                        title={`Generate README.md for ${project.title}`}
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>README.md</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </ScrollLinkedProjectCard>
          );
        })}
        </div>
      </div>

      {/* Lightbox / Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={handleCloseModal}
        onOpenArchitectureExplorer={(projId) => {
          handleCloseModal();
          handleOpenArchitecture(projId);
        }}
      />

      {/* Architecture Explorer Modal */}
      <ArchitectureExplorerModal
        isOpen={isArchitectureModalOpen}
        onClose={() => {
          setIsArchitectureModalOpen(false);
          setSelectedArchitectureProjectId(null);
        }}
        initialProjectId={selectedArchitectureProjectId}
      />
    </section>
  );
};

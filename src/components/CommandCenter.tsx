import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ArrowRight, FileDown, UserCheck, Sparkles, Github, Mail, Layers, X, Code2, FileText } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenRecruiterView: () => void;
  onOpenAIAssistant: () => void;
  onOpenArchitectureExplorer?: (projectId?: string) => void;
  onOpenReadmeGenerator?: (projectId?: string) => void;
  onSelectProject: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Actions' | 'Skills';
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenRecruiterView,
  onOpenAIAssistant,
  onOpenArchitectureExplorer,
  onOpenReadmeGenerator,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems: CommandItem[] = useMemo(() => [
    // Quick Actions
    {
      id: 'action-resume',
      category: 'Actions',
      title: 'Download Resume (PDF)',
      subtitle: 'Open Curriculum Vitae dossier and download PDF',
      icon: FileDown,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'action-architecture',
      category: 'Actions',
      title: 'Architecture Explorer',
      subtitle: 'Interactive 4-tier visual diagrams (Frontend / API / Backend / Database)',
      icon: Layers,
      action: () => {
        onClose();
        onOpenArchitectureExplorer?.();
      }
    },
    {
      id: 'action-readme',
      category: 'Actions',
      title: 'Generate Project README.md',
      subtitle: 'Generate professional GitHub documentation with badges & architecture specs',
      icon: FileText,
      action: () => {
        onClose();
        onOpenReadmeGenerator?.();
      }
    },
    {
      id: 'action-recruiter',
      category: 'Actions',
      title: 'Recruiter Quick View',
      subtitle: '30-second candidate executive summary & highlights',
      icon: UserCheck,
      action: () => {
        onClose();
        onOpenRecruiterView();
      }
    },
    {
      id: 'action-ai',
      category: 'Actions',
      title: 'Ask AI Portfolio Assistant',
      subtitle: 'Ask verified questions about Shubham\'s background and stack',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenAIAssistant();
      }
    },
    {
      id: 'action-email',
      category: 'Actions',
      title: 'Copy Email Address',
      subtitle: PERSONAL_INFO.email,
      icon: Mail,
      action: () => {
        try {
          if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(PERSONAL_INFO.email).catch(() => {});
          }
        } catch {
          // Non-blocking clipboard fallback
        }
        onClose();
      }
    },
    {
      id: 'action-github',
      category: 'Actions',
      title: 'Visit GitHub Profile',
      subtitle: 'github.com/SHUBHAMBANSAL58',
      icon: Github,
      action: () => {
        try {
          const a = document.createElement('a');
          a.href = PERSONAL_INFO.github;
          a.target = '_blank';
          a.rel = 'noreferrer noopener';
          a.click();
        } catch {
          window.location.href = PERSONAL_INFO.github;
        }
        onClose();
      }
    },

    // Navigation sections
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Home / Hero',
      subtitle: 'Top hero section and dynamic intro',
      icon: ArrowRight,
      action: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About Me',
      subtitle: 'Personal journey, education, and development focus',
      icon: ArrowRight,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Technical Skills',
      subtitle: 'Frontend, Backend, Databases, and Tools',
      icon: ArrowRight,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Experience & Internships',
      subtitle: 'CodSoft, CodeAlpha, Thiranex, and MyGov India',
      icon: ArrowRight,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Featured Projects',
      subtitle: 'SkillSync AI, Kanban PM Tool, E-commerce Store, HRMS',
      icon: ArrowRight,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-journey',
      category: 'Navigation',
      title: 'Developer Journey Timeline',
      subtitle: 'Progression from academic milestones to live software products',
      icon: ArrowRight,
      action: () => {
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-certificates',
      category: 'Navigation',
      title: 'Certifications & Badges',
      subtitle: 'IBM SkillsBuild, Google Skills, be10x, and Unstop',
      icon: ArrowRight,
      action: () => {
        document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact Form',
      subtitle: 'Send direct inquiries and collaboration messages',
      icon: ArrowRight,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },

    // Projects Direct Launch
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      category: 'Projects' as const,
      title: proj.title,
      subtitle: `${proj.category} · ${proj.technologies.slice(0, 3).join(', ')}`,
      icon: Code2,
      action: () => {
        onClose();
        onSelectProject(proj.id);
      }
    }))
  ], [onClose, onOpenResume, onOpenRecruiterView, onOpenAIAssistant, onOpenArchitectureExplorer, onOpenReadmeGenerator, onSelectProject]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Command Centre"
      className="fixed inset-0 z-[70] flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#090d1c] border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, or section to navigate..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close command center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No matching commands or projects found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-900 dark:text-white border border-indigo-200 dark:border-indigo-500/40'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold truncate">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">↵</kbd> to select</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

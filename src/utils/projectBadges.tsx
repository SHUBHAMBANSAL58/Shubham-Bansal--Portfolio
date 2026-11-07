import React from 'react';
import {
  Sparkles,
  Server,
  Database,
  Code2,
  Terminal,
  Layers
} from 'lucide-react';

export interface PrimaryTechConfig {
  id: string;
  label: string;
  filterKey: string;
  icon: React.ReactNode;
  dotColor: string;
  badgeStyle: string;
  activeStyle: string;
  overlayBadgeStyle: string;
  overlayActiveStyle: string;
}

export type PrimaryTechBadgeConfig = PrimaryTechConfig;

export const getPrimaryTechBadge = (tech: string): PrimaryTechConfig => {
  const norm = tech.trim().toLowerCase();
  if (norm.includes('ai') || norm.includes('ml')) {
    return {
      id: 'ai-ml',
      label: 'AI / ML',
      filterKey: 'AI',
      icon: <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400 shrink-0" />,
      dotColor: 'bg-purple-500 dark:bg-purple-400',
      badgeStyle: 'border-purple-200 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:border-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/60 shadow-xs',
      activeStyle: 'border-purple-500 dark:border-purple-400 bg-purple-600 dark:bg-purple-900/80 text-white dark:text-purple-100 ring-2 ring-purple-400/50 shadow-sm',
      overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-purple-300 dark:border-purple-500/50 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white',
      overlayActiveStyle: 'bg-purple-600 dark:bg-purple-900/90 border-purple-400 text-white dark:text-purple-100 ring-2 ring-purple-400/60'
    };
  }
  if (norm.includes('react')) {
    return {
      id: 'react',
      label: 'React',
      filterKey: 'React',
      icon: <Code2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />,
      dotColor: 'bg-cyan-500 dark:bg-cyan-400',
      badgeStyle: 'border-cyan-200 dark:border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 hover:border-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 shadow-xs',
      activeStyle: 'border-cyan-500 dark:border-cyan-400 bg-cyan-600 dark:bg-cyan-900/80 text-white dark:text-cyan-100 ring-2 ring-cyan-400/50 shadow-sm',
      overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-cyan-300 dark:border-cyan-500/50 text-cyan-800 dark:text-cyan-300 hover:text-cyan-950 dark:hover:text-white',
      overlayActiveStyle: 'bg-cyan-600 dark:bg-cyan-900/90 border-cyan-400 text-white dark:text-cyan-100 ring-2 ring-cyan-400/60'
    };
  }
  if (norm.includes('node')) {
    return {
      id: 'node',
      label: 'Node.js',
      filterKey: 'Node',
      icon: <Server className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      dotColor: 'bg-emerald-500 dark:bg-emerald-400',
      badgeStyle: 'border-emerald-200 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:border-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 shadow-xs',
      activeStyle: 'border-emerald-500 dark:border-emerald-400 bg-emerald-600 dark:bg-emerald-900/80 text-white dark:text-emerald-100 ring-2 ring-emerald-400/50 shadow-sm',
      overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white',
      overlayActiveStyle: 'bg-emerald-600 dark:bg-emerald-900/90 border-emerald-400 text-white dark:text-emerald-100 ring-2 ring-emerald-400/60'
    };
  }
  if (norm.includes('mongo')) {
    return {
      id: 'mongodb',
      label: 'MongoDB',
      filterKey: 'MongoDB',
      icon: <Database className="w-3 h-3 text-teal-600 dark:text-teal-400 shrink-0" />,
      dotColor: 'bg-teal-500 dark:bg-teal-400',
      badgeStyle: 'border-teal-200 dark:border-teal-500/40 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 hover:border-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/60 shadow-xs',
      activeStyle: 'border-teal-500 dark:border-teal-400 bg-teal-600 dark:bg-teal-900/80 text-white dark:text-teal-100 ring-2 ring-teal-400/50 shadow-sm',
      overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-teal-300 dark:border-teal-500/50 text-teal-800 dark:text-teal-300 hover:text-teal-950 dark:hover:text-white',
      overlayActiveStyle: 'bg-teal-600 dark:bg-teal-900/90 border-teal-400 text-white dark:text-teal-100 ring-2 ring-teal-400/60'
    };
  }
  if (norm.includes('sqlite') || norm.includes('sql')) {
    return {
      id: 'sqlite',
      label: norm.includes('sqlite') ? 'SQLite' : 'SQL / DB',
      filterKey: norm.includes('sqlite') ? 'SQLite' : 'SQL',
      icon: <Database className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />,
      dotColor: 'bg-amber-500 dark:bg-amber-400',
      badgeStyle: 'border-amber-200 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:border-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 shadow-xs',
      activeStyle: 'border-amber-500 dark:border-amber-400 bg-amber-600 dark:bg-amber-900/80 text-white dark:text-amber-100 ring-2 ring-amber-400/50 shadow-sm',
      overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-amber-300 dark:border-amber-500/50 text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-white',
      overlayActiveStyle: 'bg-amber-600 dark:bg-amber-900/90 border-amber-400 text-white dark:text-amber-100 ring-2 ring-amber-400/60'
    };
  }
  if (norm.includes('javascript') || norm.includes('js')) {
    return {
      id: 'javascript',
      label: 'JavaScript',
      filterKey: 'JavaScript',
      icon: <Terminal className="w-3 h-3 text-yellow-600 dark:text-yellow-400 shrink-0" />,
      dotColor: 'bg-yellow-500 dark:bg-yellow-400',
      badgeStyle: 'border-yellow-200 dark:border-yellow-500/40 bg-yellow-50 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 hover:border-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/60 shadow-xs',
      activeStyle: 'border-yellow-500 dark:border-yellow-400 bg-yellow-600 dark:bg-yellow-900/80 text-white dark:text-yellow-100 ring-2 ring-yellow-400/50 shadow-sm',
      overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-yellow-300 dark:border-yellow-500/50 text-yellow-800 dark:text-yellow-300 hover:text-yellow-950 dark:hover:text-white',
      overlayActiveStyle: 'bg-yellow-600 dark:bg-yellow-900/90 border-yellow-400 text-white dark:text-yellow-100 ring-2 ring-yellow-400/60'
    };
  }
  return {
    id: norm.replace(/\s+/g, '-'),
    label: tech,
    filterKey: tech,
    icon: <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />,
    dotColor: 'bg-indigo-500 dark:bg-indigo-400',
    badgeStyle: 'border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-slate-900 dark:hover:text-white',
    activeStyle: 'border-indigo-500 dark:border-indigo-400 bg-indigo-600 dark:bg-indigo-900/80 text-white dark:text-indigo-100 ring-2 ring-indigo-400/40',
    overlayBadgeStyle: 'bg-white/90 dark:bg-slate-950/85 hover:bg-white dark:hover:bg-slate-900 border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-indigo-400',
    overlayActiveStyle: 'bg-indigo-600 dark:bg-indigo-900 border-indigo-400 text-white dark:text-indigo-100 ring-2 ring-indigo-400/50'
  };
};

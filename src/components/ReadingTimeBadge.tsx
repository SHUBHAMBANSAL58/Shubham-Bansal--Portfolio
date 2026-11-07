import React, { useState, useMemo } from 'react';
import { Clock, ChevronDown, Check } from 'lucide-react';
import { calculateReadingTime } from '../utils/readingTime';

interface ReadingTimeBadgeProps {
  content: string | string[];
  defaultWpm?: number;
  className?: string;
}

export const ReadingTimeBadge: React.FC<ReadingTimeBadgeProps> = ({
  content,
  defaultWpm = 200,
  className = ''
}) => {
  const [wpm, setWpm] = useState<number>(defaultWpm);
  const [showWpmMenu, setShowWpmMenu] = useState<boolean>(false);

  const stats = useMemo(() => {
    return calculateReadingTime(content, wpm);
  }, [content, wpm]);

  const wpmOptions = [
    { label: 'Deep Read', rate: 150 },
    { label: 'Average (Default)', rate: 200 },
    { label: 'Fast Skim', rate: 250 }
  ];

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setShowWpmMenu((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/70 hover:border-indigo-300 dark:hover:border-indigo-600/80 text-indigo-700 dark:text-indigo-300 backdrop-blur-md shadow-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 select-none"
        title={`Estimated reading time based on ${stats.wordCount} words at ${wpm} WPM. Click to adjust reading speed.`}
        aria-label={`Estimated Reading Time: ${stats.formatted} at ${wpm} words per minute`}
        aria-expanded={showWpmMenu}
      >
        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">Estimated Reading Time:</span>
        <span className="font-semibold text-slate-900 dark:text-white">{stats.formatted}</span>
        <span className="text-slate-400 dark:text-slate-500">·</span>
        <span className="text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-semibold">{wpm} WPM</span>
        <ChevronDown className="w-3 h-3 text-slate-600 dark:text-slate-300 ml-0.5" />
      </button>

      {/* Speed Adjustment Popover */}
      {showWpmMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowWpmMenu(false)}
          />
          <div className="absolute top-full left-0 mt-1.5 z-50 w-48 p-1.5 rounded-xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-indigo-800/80 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 mb-1">
              Reading Speed (WPM)
            </div>
            {wpmOptions.map((opt) => (
              <button
                key={opt.rate}
                type="button"
                onClick={() => {
                  setWpm(opt.rate);
                  setShowWpmMenu(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  wpm === opt.rate
                    ? 'bg-indigo-50 dark:bg-indigo-600/30 text-indigo-700 dark:text-cyan-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{opt.label}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{opt.rate} WPM</span>
                  {wpm === opt.rate && <Check className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
                </span>
              </button>
            ))}
            <div className="mt-1 pt-1 border-t border-slate-200 dark:border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              Total words: ~{stats.wordCount}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

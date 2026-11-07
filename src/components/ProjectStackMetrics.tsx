import React, { useState } from 'react';
import { ProjectStackMetrics as IProjectStackMetrics, StackWeightSegment } from '../types/portfolio';
import { Layers, Network, HardDrive, Gauge, ChevronDown, ChevronUp, Cpu, Info } from 'lucide-react';

interface ProjectStackMetricsProps {
  metrics?: IProjectStackMetrics;
  projectTitle: string;
}

export const ProjectStackMetrics: React.FC<ProjectStackMetricsProps> = ({ metrics, projectTitle }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeSegment, setActiveSegment] = useState<StackWeightSegment | null>(null);

  if (!metrics) {
    return null;
  }

  const { stackDistribution, architecturePattern, apiSurface, bundleOrFootprint, latencyBenchmark, runtimeTier } = metrics;

  // Tier color styling
  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'AI-Augmented':
        return 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800/80';
      case 'Balanced Full-Stack':
        return 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-800/80';
      case 'Lightweight':
        return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800/80';
      case 'Enterprise Scalable':
        return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800/80';
      default:
        return 'text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/70 border-cyan-200 dark:border-cyan-800/80';
    }
  };

  return (
    <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
      {/* Header Row: Label & Tier Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono text-[11px] uppercase tracking-wider font-semibold">
          <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>Technical Stack Weight & Profile</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded border shadow-2xs ${getTierBadgeStyle(
              runtimeTier
            )}`}
          >
            {runtimeTier}
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-0.5 cursor-pointer"
            title={isExpanded ? 'Collapse layer breakdown' : 'Expand layer breakdown'}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Visual Stack Weight Multi-Segment Bar */}
      <div className="space-y-1.5">
        <div
          className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex cursor-pointer shadow-inner"
          role="progressbar"
          aria-label={`Stack distribution for ${projectTitle}`}
        >
          {stackDistribution.map((seg, idx) => (
            <div
              key={idx}
              style={{ width: `${seg.percentage}%` }}
              onMouseEnter={() => setActiveSegment(seg)}
              onMouseLeave={() => setActiveSegment(null)}
              className={`${seg.color} h-full transition-all duration-200 hover:brightness-125 relative group`}
              title={`${seg.label}: ${seg.percentage}% — ${seg.detail}`}
            />
          ))}
        </div>

        {/* Dynamic Hover Segment Detail or Default Legend */}
        {activeSegment ? (
          <div className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5 animate-fadeIn">
            <Info className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-white">{activeSegment.label} ({activeSegment.percentage}%):</span>
            <span className="text-slate-700 dark:text-slate-300 truncate">{activeSegment.detail}</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {stackDistribution.map((seg, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={() => setActiveSegment(seg)}
                onClick={() => setActiveSegment((prev) => (prev?.label === seg.label ? null : seg))}
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors group text-left cursor-pointer"
              >
                <span className={`w-2 h-2 rounded-full ${seg.color} shrink-0 group-hover:scale-110 transition-transform`} />
                <span>
                  {seg.label}{' '}
                  <span className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {seg.percentage}%
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4-Pillar At-a-Glance Telemetry Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {/* Architecture */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
            <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="uppercase tracking-wider truncate">Arch Pattern</span>
          </div>
          <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate font-mono" title={architecturePattern}>
            {architecturePattern}
          </p>
        </div>

        {/* API Surface */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
            <Network className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="uppercase tracking-wider truncate">API Surface</span>
          </div>
          <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate font-mono" title={apiSurface}>
            {apiSurface}
          </p>
        </div>

        {/* Footprint / Bundle */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
            <HardDrive className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="uppercase tracking-wider truncate">Footprint</span>
          </div>
          <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate font-mono" title={bundleOrFootprint}>
            {bundleOrFootprint}
          </p>
        </div>

        {/* Latency Benchmark */}
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-colors">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-0.5">
            <Gauge className="w-3 h-3 text-purple-600 dark:text-purple-400 shrink-0" />
            <span className="uppercase tracking-wider truncate">Benchmark</span>
          </div>
          <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate font-mono" title={latencyBenchmark}>
            {latencyBenchmark}
          </p>
        </div>
      </div>

      {/* Expanded Breakdown Accordion Panel */}
      {isExpanded && (
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/80 pb-1.5">
            <span className="uppercase tracking-wider text-cyan-700 dark:text-cyan-300 font-semibold">Layer Breakdown Specification</span>
            <span>Target: High Reliability</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {stackDistribution.map((seg, idx) => (
              <div key={idx} className="flex items-start gap-2 p-1.5 rounded bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/60">
                <span className={`w-2.5 h-2.5 rounded-sm ${seg.color} mt-0.5 shrink-0`} />
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-200 text-[11px] font-mono">{seg.label}</span>
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">{seg.percentage}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate font-sans">{seg.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

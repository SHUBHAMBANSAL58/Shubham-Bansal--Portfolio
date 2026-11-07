import React, { useState, useEffect, useRef } from 'react';
import { calculateScrollProgress, getScrollGradient } from '../utils/scrollProgress';

interface ScrollProgressBarProps {
  className?: string;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;

      const newProgress = calculateScrollProgress(scrollY, scrollHeight, innerHeight);
      setProgress(newProgress);

      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    const handleScroll = () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const gradientConfig = getScrollGradient(progress);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Portfolio scroll progress"
      className={`fixed top-0 left-0 right-0 z-[60] h-[3px] bg-slate-950/40 pointer-events-none select-none ${className}`}
    >
      {/* Active colored progress fill with dynamic gradient and ambient glow */}
      <div
        className="relative h-full transition-[width] duration-75 ease-out will-change-[width]"
        style={{
          width: `${progress}%`,
          background: gradientConfig.gradient,
          boxShadow: `0 0 10px ${gradientConfig.glowColor}, 0 0 4px ${gradientConfig.glowColor}`
        }}
      >
        {/* Leading particle / glowing head */}
        {progress > 0 && (
          <div
            aria-hidden="true"
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white transition-colors duration-300 pointer-events-none"
            style={{
              boxShadow: `0 0 8px #ffffff, 0 0 14px ${gradientConfig.particleColor}`
            }}
          />
        )}
      </div>

      {/* Floating micro-pill indicator (appears while scrolling or at completion) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-2 right-4 transition-all duration-300 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border shadow-lg ${
          isScrolling || progress >= 99
            ? 'opacity-90 translate-y-0'
            : 'opacity-0 -translate-y-1'
        }`}
        style={{
          backgroundColor: 'rgba(3, 7, 18, 0.85)',
          borderColor: gradientConfig.glowColor,
          color: gradientConfig.particleColor,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.6), 0 0 12px ${gradientConfig.glowColor}`
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: gradientConfig.particleColor }}
        />
        <span>{Math.round(progress)}%</span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-300 hidden sm:inline">{gradientConfig.stageName}</span>
      </div>
    </div>
  );
};

/**
 * Utility functions for calculating scroll progress and color-changing gradient schemes.
 */

export interface ScrollGradientConfig {
  gradient: string;
  glowColor: string;
  particleColor: string;
  stageName: string;
}

/**
 * Calculates scroll percentage from 0 to 100 based on scroll position and viewport dimensions.
 */
export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  innerHeight: number
): number {
  if (typeof scrollY !== 'number' || isNaN(scrollY) || scrollY < 0) {
    scrollY = 0;
  }
  const maxScroll = scrollHeight - innerHeight;
  if (maxScroll <= 0) {
    return 0;
  }
  const progress = (scrollY / maxScroll) * 100;
  return Math.min(100, Math.max(0, Math.round(progress * 10) / 10));
}

/**
 * Returns dynamic color-changing gradient, glow color, and stage metadata based on current scroll progress.
 * Smoothly shifts from Electric Cyan -> Indigo -> Purple/Fuchsia -> Emerald as the user travels through the portfolio.
 */
export function getScrollGradient(progress: number): ScrollGradientConfig {
  const clamped = Math.min(100, Math.max(0, progress));

  if (clamped < 25) {
    // Stage 1: Welcome & About (Cyan to Sky/Blue)
    return {
      gradient: 'linear-gradient(90deg, #06b6d4 0%, #0ea5e9 50%, #38bdf8 100%)',
      glowColor: 'rgba(6, 182, 212, 0.65)',
      particleColor: '#67e8f9',
      stageName: 'Introduction & About'
    };
  }

  if (clamped < 50) {
    // Stage 2: Skills & Experience (Sky to Indigo/Violet)
    return {
      gradient: 'linear-gradient(90deg, #0ea5e9 0%, #6366f1 50%, #818cf8 100%)',
      glowColor: 'rgba(99, 102, 241, 0.65)',
      particleColor: '#a5b4fc',
      stageName: 'Skills & Experience'
    };
  }

  if (clamped < 75) {
    // Stage 3: Featured Projects & Journey (Indigo to Purple/Fuchsia)
    return {
      gradient: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #c084fc 100%)',
      glowColor: 'rgba(168, 85, 247, 0.65)',
      particleColor: '#e9d5ff',
      stageName: 'Engineering Projects & Journey'
    };
  }

  // Stage 4: Certifications, Education & Contact (Fuchsia to Emerald/Teal completion)
  return {
    gradient: 'linear-gradient(90deg, #a855f7 0%, #ec4899 40%, #10b981 100%)',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    particleColor: '#6ee7b7',
    stageName: 'Credentials & Contact'
  };
}

export interface CardTransformConfig {
  minOpacity?: number;
  minScale?: number;
  maxOffset?: number;
  reduceMotion?: boolean;
}

export interface CardTransformResult {
  opacity: number;
  scale: number;
  y: number;
}

/**
 * Computes smooth scroll-linked card entrance transformations (opacity, scale, and y translation).
 * Uses a cubic ease-out curve for fluid, responsive deceleration into the viewport focal area.
 */
export function computeScrollLinkedCardTransform(
  progress: number,
  config: CardTransformConfig = {}
): CardTransformResult {
  if (config.reduceMotion) {
    return { opacity: 1, scale: 1, y: 0 };
  }
  const { minOpacity = 0.6, minScale = 0.95, maxOffset = 32 } = config;
  const clampedProgress = Math.min(1, Math.max(0, isNaN(progress) ? 0 : progress));

  // Cubic ease-out: 1 - (1 - t)^3
  const eased = 1 - Math.pow(1 - clampedProgress, 3);

  const opacity = Math.round((minOpacity + (1 - minOpacity) * eased) * 1000) / 1000;
  const scale = Math.round((minScale + (1 - minScale) * eased) * 1000) / 1000;
  const y = Math.round(maxOffset * (1 - eased) * 10) / 10;

  return { opacity, scale, y };
}


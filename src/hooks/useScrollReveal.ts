import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export interface ScrollRevealOptions {
  /** Distance in pixels to slide up from (default: 24) */
  distance?: number;
  /** Duration in seconds of the reveal animation (default: 0.6) */
  duration?: number;
  /** Delay in seconds before starting the reveal (default: 0) */
  delay?: number;
  /** Portion of element that needs to be visible (0 to 1, default: 0.15) */
  amount?: number | 'some' | 'all';
  /** Whether the animation should trigger only once (default: true) */
  once?: boolean;
}

export function getScrollRevealConfig(
  options: ScrollRevealOptions = {},
  shouldReduceMotion = false
) {
  const {
    distance = 24,
    duration = 0.6,
    delay = 0,
    amount = 0.15,
    once = true
  } = options;

  const initialY = shouldReduceMotion ? 0 : distance;

  return {
    distance,
    duration: shouldReduceMotion ? 0.2 : duration,
    delay,
    amount,
    once,
    initial: {
      opacity: 0,
      y: initialY
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: initialY
    },
    transition: {
      duration: shouldReduceMotion ? 0.2 : duration,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  };
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion();
  const config = getScrollRevealConfig(options, Boolean(shouldReduceMotion));

  const isInView = useInView(ref, {
    amount: config.amount,
    once: config.once
  });

  const motionProps = {
    ref,
    initial: config.initial,
    animate: isInView ? config.animate : config.exit,
    transition: config.transition
  };

  const variants = {
    hidden: config.initial,
    visible: {
      ...config.animate,
      transition: config.transition
    }
  };

  return {
    ref,
    isInView,
    motionProps,
    variants,
    shouldReduceMotion: Boolean(shouldReduceMotion)
  };
}

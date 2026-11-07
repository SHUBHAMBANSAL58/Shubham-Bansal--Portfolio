import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export interface ScrollLinkedProjectCardProps {
  children: React.ReactNode;
  id?: string;
  index?: number;
  className?: string;
}

/**
 * ScrollLinkedProjectCard
 * 
 * Binds each project card's entrance animation directly to viewport scroll progress.
 * As the card crosses into the viewport from the bottom edge towards the reading focal plane,
 * its opacity and scale subtly transition with spring-damped physics.
 */
export const ScrollLinkedProjectCard: React.FC<ScrollLinkedProjectCardProps> = ({
  children,
  id,
  index = 0,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll offset:
  // "start end": top of card touches bottom of viewport (scrollYProgress = 0)
  // "start 65%": top of card reaches 65% from top of viewport (scrollYProgress = 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 65%']
  });

  // Spring smoothing to prevent jerky or step-wise scroll movements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.3,
    restDelta: 0.001
  });

  // Subtle opacity shift: 0.6 -> 1.0
  const opacity = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.6, 1]
  );

  // Subtle scale shift: 0.95 -> 1.0
  const scale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.95, 1]
  );

  // Subtle vertical travel: 32px -> 0px
  const y = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [32, 0]
  );

  return (
    <motion.div
      ref={containerRef}
      id={id}
      style={{
        opacity,
        scale,
        y
      }}
      className={`relative will-change-transform ${className}`}
      data-testid="scroll-linked-project-card"
      data-card-index={index}
    >
      {children}
    </motion.div>
  );
};

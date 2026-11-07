import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useScrollReveal, ScrollRevealOptions } from '../hooks/useScrollReveal';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  options?: ScrollRevealOptions;
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  options,
  children,
  className = '',
  as = 'div',
  ...rest
}) => {
  const { motionProps } = useScrollReveal<HTMLDivElement>(options);

  if (as === 'section') {
    return (
      <motion.section
        {...(motionProps as unknown as HTMLMotionProps<'section'>)}
        className={className}
        {...rest}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.div
      {...motionProps}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

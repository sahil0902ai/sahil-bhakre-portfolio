import type { Variants } from 'framer-motion';

export const springPreset = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1,
} as const;

export const easePreset = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  initial: {
    y: 8,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.28,
      ease: easePreset,
    },
  },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const cardHover = {
  hover: {
    y: -3,
    scale: 1.002,
    transition: springPreset,
  },
};

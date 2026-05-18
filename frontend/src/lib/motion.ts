import type { Variants } from 'framer-motion'

export const EASE = 'easeInOut' as const

export const DURATIONS = {
  fast: 0.18,
  base: 0.4,
  slow: 0.6,
} as const

export const STAGGER = 0.12

export const VIEWPORT_AMOUNT = 0.25

export function makeStaggerItemVariants(reduced: boolean | null, y = 14): Variants {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
    visible: reduced
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: DURATIONS.base, ease: EASE } },
  }
}

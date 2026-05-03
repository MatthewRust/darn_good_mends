import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DURATIONS, EASE, VIEWPORT_AMOUNT } from '../../lib/motion'

type FadeUpProps = {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  mode?: 'mount' | 'inView'
  viewportAmount?: number
  className?: string
  style?: CSSProperties
}

export default function FadeUp({
  children,
  delay = 0,
  y = 14,
  duration = DURATIONS.slow,
  mode = 'inView',
  viewportAmount = VIEWPORT_AMOUNT,
  className,
  style,
}: FadeUpProps) {
  const reduced = useReducedMotion()
  const initial = reduced ? { opacity: 0 } : { opacity: 0, y }
  const target = reduced ? { opacity: 1 } : { opacity: 1, y: 0 }
  const transition = { duration, delay, ease: EASE }

  if (mode === 'mount') {
    return (
      <motion.div
        className={className}
        style={style}
        initial={initial}
        animate={target}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, amount: viewportAmount }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

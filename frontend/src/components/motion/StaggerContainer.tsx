import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { STAGGER, VIEWPORT_AMOUNT } from '../../lib/motion'

type StaggerContainerProps = {
  children: ReactNode
  stagger?: number
  delay?: number
  className?: string
  style?: CSSProperties
  viewportAmount?: number
  mode?: 'mount' | 'inView'
}

export default function StaggerContainer({
  children,
  stagger = STAGGER,
  delay = 0,
  className,
  style,
  viewportAmount = VIEWPORT_AMOUNT,
  mode = 'inView',
}: StaggerContainerProps) {
  const reduced = useReducedMotion()

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      {...(mode === 'mount'
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount: viewportAmount } })}
    >
      {children}
    </motion.div>
  )
}

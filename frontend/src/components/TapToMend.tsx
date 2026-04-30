import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StitchedFrame from './StitchedFrame'
import tap1 from '../assets/tap-to-mend/tap1.png'
import tap2 from '../assets/tap-to-mend/tap2.png'
import tap3 from '../assets/tap-to-mend/tap3.png'
import tap4 from '../assets/tap-to-mend/tap4.png'
import tap5 from '../assets/tap-to-mend/tap5.png'

const FRAMES = [tap1, tap2, tap3, tap4, tap5]

type TapToMendProps = {
  tilt?: number
  className?: string
}

export default function TapToMend({ tilt = 0, className = '' }: TapToMendProps) {
  const [index, setIndex] = useState(0)
  const [touched, setTouched] = useState(false)

  const advance = () => {
    setTouched(true)
    setIndex((i) => (i + 1) % FRAMES.length)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      advance()
    }
  }

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <StitchedFrame variant="photo" tilt={tilt}>
        <div
          role="button"
          tabIndex={0}
          aria-label="Tap to advance the mending"
          onClick={advance}
          onKeyDown={onKey}
          className="relative h-[260px] w-[200px] cursor-pointer select-none overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#7a0000]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={index}
              src={FRAMES[index]}
              alt={`Mending step ${index + 1} of ${FRAMES.length}`}
              className="absolute inset-0 h-full w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </StitchedFrame>
      <motion.span
        className="font-hand text-[#7a0000]"
        style={{ fontSize: '1.25rem' }}
        animate={{ opacity: touched ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        click to mend
      </motion.span>
    </div>
  )
}

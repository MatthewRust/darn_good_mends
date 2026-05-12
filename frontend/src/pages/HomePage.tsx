import { motion, useReducedMotion, type Variants } from 'framer-motion'
import StitchedFrame from '../components/StitchedFrame'
import TapToMend from '../components/TapToMend'
import FadeUp from '../components/motion/FadeUp'
import { BookAMendButton } from '../App'
import { EASE } from '../lib/motion'
import inside1 from '../assets/home/inside1.jpeg'
import outside from '../assets/home/outside.jpeg'
import squirel from '../assets/home/squirel.png'
import r1 from '../assets/home/r1.jpeg'
import r2 from '../assets/home/r2.jpeg'
import r3 from '../assets/home/r3.jpeg'
import r4 from '../assets/home/r4.jpeg'
import r5 from '../assets/home/r5.jpeg'
import r6 from '../assets/home/r6.jpeg'
import n1 from '../assets/home/n1.png'

function HandArrow({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 60"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path
        d="M5 50 C 25 45, 35 25, 60 18"
        fill="none"
        stroke="#7a0000"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 3"
      />
      <path
        d="M58 12 L 64 18 L 56 24"
        fill="none"
        stroke="#7a0000"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HomePage() {
  const reduced = useReducedMotion()

  const pileContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.14 } },
  }

  const pileItem: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.45 } },
      }
    : {
        hidden: { opacity: 0, y: -16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
      }

  return (
    <main className="relative mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-10">

      {/* Section 1 — full-width centered banner */}
      <section className="mt-4 flex flex-col items-center text-center">
        <FadeUp mode="mount">
          <h1
            className="font-hand text-[#7a0000]"
            style={{ fontSize: 'clamp(2.4rem, 10vw, 5.6rem)', lineHeight: 0.95 }}
          >
            darn good mends
          </h1>
        </FadeUp>
        <FadeUp mode="mount" delay={0.12}>
          <p
            className="font-hand mt-4 text-[#7a0000]"
            style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2rem)', lineHeight: 1.15 }}
          >
            breathing new life into old garments
          </p>
        </FadeUp>
        <FadeUp mode="mount" delay={0.24}>
          <p
            className="font-body mt-3 max-w-2xl text-[#3b2a18]"
            style={{ fontSize: '1rem', lineHeight: 1.5 }}
          >
            bespoke clothes mending &amp; hand embroidery from my studio in east london
          </p>
        </FadeUp>
      </section>

      {/* Section 2 — photo pile + outside-door portrait, then group of 2 */}
      <section className="mt-20">
        {/* Photo pile */}
        <div className="mb-14 flex flex-col items-center">
          <motion.div
            className="relative"
            style={{ width: 510, height: 300 }}
            variants={pileContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* r1 — back */}
            <motion.div className="absolute" style={{ top: 20, left: 0, zIndex: 1 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={-10}>
                <img src={r1} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
            {/* r2 */}
            <motion.div className="absolute" style={{ top: 12, left: 105, zIndex: 2 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={6}>
                <img src={r2} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
            {/* r3 */}
            <motion.div className="absolute" style={{ top: 24, left: 210, zIndex: 3 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={-4}>
                <img src={r3} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
            {/* inside1 — front */}
            <motion.div className="absolute" style={{ top: 0, left: 315, zIndex: 4 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={2}>
                <img src={inside1} alt="Studio interior" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
          </motion.div>
        </div>

        {/* Outside-door portrait with "me in the studio" caption */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
          <FadeUp delay={0.2} className="flex flex-col items-center gap-1 order-2 sm:order-1">
            <HandArrow className="h-10 w-16" />
            <span className="font-hand text-[#7a0000]" style={{ fontSize: '1.3rem' }}>
              me in the studio
            </span>
          </FadeUp>
          <FadeUp className="order-1 sm:order-2">
            <StitchedFrame variant="photo" tilt={2}>
              <img
                src={outside}
                alt="Me in the studio"
                className="block h-[300px] w-[260px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
        </div>

        {/* Group of 2 — r4 and r5 */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <FadeUp>
            <StitchedFrame variant="photo" tilt={-5}>
              <img
                src={r4}
                alt="Mended garment detail"
                className="block h-[200px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
          <FadeUp delay={0.12}>
            <StitchedFrame variant="photo" tilt={-3}>
              <img
                src={r5}
                alt="Embroidery close-up"
                className="block h-[200px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
        </div>
        <FadeUp className="mt-10 flex justify-center">
          <StitchedFrame variant="paper" tilt={1} className="max-w-3xl">
            <p
              className="font-body text-center text-[#3b2a18]"
              style={{ fontSize: '1rem', lineHeight: 1.5 }}
            >
              every garment carries a story. each mend i make is a small act of care, a stitch
              between what was and what could be again.
            </p>
          </StitchedFrame>
        </FadeUp>
      </section>

      {/* Section 3 — centered full-width copy + squirrel */}
      <section className="mt-24 flex flex-col items-center gap-8">
        <FadeUp className="w-full max-w-3xl">
          <StitchedFrame variant="paper" tilt={-2}>
            <p
              className="font-body text-center text-[#3b2a18]"
              style={{ fontSize: '1rem', lineHeight: 1.5 }}
            >
              i work with natural threads and salvaged trims. nothing flashy, just slow,
              considered repair.
            </p>
          </StitchedFrame>
        </FadeUp>
        <FadeUp className="w-full max-w-3xl" delay={0.12}>
          <StitchedFrame variant="paper" tilt={1.5}>
            <p
              className="font-body text-center text-[#3b2a18]"
              style={{ fontSize: '1rem', lineHeight: 1.5 }}
            >
              collection in person or post — turnaround is usually one to two weeks depending on
              the piece.
            </p>
          </StitchedFrame>
        </FadeUp>
        <FadeUp className="mt-4 flex justify-center" delay={0.24}>
          <img
            src={squirel}
            alt="Embroidered squirrel motif on clothes"
            className="block h-auto w-full max-w-xs object-contain"
            draggable={false}
          />
        </FadeUp>
      </section>

      {/* Section 4 — CTA + still deciding text */}
      <section className="mt-20 flex flex-col items-center gap-6">
        <FadeUp>
          <BookAMendButton className="h-20" />
        </FadeUp>
        <FadeUp delay={0.12}>
          <p
            className="font-body max-w-xl text-center text-[#3b2a18]"
            style={{ fontSize: '0.95rem', lineHeight: 1.5 }}
          >
            <span className="font-hand text-[#7a0000]" style={{ fontSize: '1.2rem' }}>
              still deciding —
            </span>{' '}
            have a look at the gallery above, or send a photo of the piece you're thinking about.
            i'll let you know if it's a good fit.
          </p>
        </FadeUp>
      </section>

      {/* Section 5 — gallery row 2 with tap-to-mend interactive */}
      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-center gap-10">
          <FadeUp>
            <StitchedFrame variant="photo" tilt={-4}>
              <img
                src={r6}
                alt="Repair detail"
                className="block h-[220px] w-[180px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
          <FadeUp delay={0.12}>
            <TapToMend tilt={1.5} />
          </FadeUp>
          <FadeUp delay={0.24}>
            <StitchedFrame variant="photo" tilt={3}>
              <img
                src={n1}
                alt="Studio piece"
                className="block h-[220px] w-[180px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

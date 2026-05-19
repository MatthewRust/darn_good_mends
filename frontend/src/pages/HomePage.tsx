import { motion, useReducedMotion, type Variants } from 'framer-motion'
import StitchedFrame from '../components/StitchedFrame'
import TapToMend from '../components/TapToMend'
import FadeUp from '../components/motion/FadeUp'
import { BookAMendButton } from '../App'
import { EASE } from '../lib/motion'
import inside1 from '../assets/home/inside1.jpeg'
import outside from '../assets/home/outside.jpeg'
import r1 from '../assets/home/r1.jpeg'
import r2 from '../assets/home/r2.jpeg'
import r3 from '../assets/home/r3.jpeg'
import r4 from '../assets/home/r4.jpeg'
import r5 from '../assets/home/r5.jpeg'
import r6 from '../assets/home/r6.jpg'
import r7 from '../assets/home/r7.jpg'
import r8 from '../assets/home/r8.jpg'

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

      {/* Section 1 — subtitle copy block under the header title */}
      <section className="mt-4 flex flex-col items-center text-center">
        <FadeUp mode="mount" className="w-full max-w-2xl">
          <StitchedFrame variant="paper" tilt={-1}>
            <p
              className="font-hand text-center text-[#a83829]"
              style={{ fontSize: 'clamp(1.73rem, 3.73vw, 2.4rem)', lineHeight: 1.15 }}
            >
              breathing new life into old garments
            </p>
            <p
              className="font-body mt-3 text-center text-[#3b2a18]"
              style={{ fontSize: '1.21rem', lineHeight: 1.5 }}
            >
              bespoke clothes mending &amp; hand embroidery from my studio in east london
            </p>
          </StitchedFrame>
        </FadeUp>
      </section>

      {/* Section 2 — photo pile (spread wider), then r4 + outside + r5 in a single row */}
      <section className="mt-20">
        {/* Photo pile of 4, spread 15% wider */}
        <div className="mb-14 flex flex-col items-center">
          <motion.div
            className="relative"
            style={{ width: 641, height: 300 }}
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
            <motion.div className="absolute" style={{ top: 12, left: 157, zIndex: 2 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={6}>
                <img src={r2} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
            {/* r3 */}
            <motion.div className="absolute" style={{ top: 24, left: 314, zIndex: 3 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={-4}>
                <img src={r3} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
            {/* inside1 — front */}
            <motion.div className="absolute" style={{ top: 0, left: 471, zIndex: 4 }} variants={pileItem}>
              <StitchedFrame variant="photo" tilt={2}>
                <img src={inside1} alt="Studio interior" className="block h-[220px] w-[170px] object-cover" draggable={false} />
              </StitchedFrame>
            </motion.div>
          </motion.div>
        </div>

        {/* "every garment" copy block */}
        <FadeUp className="mb-14 flex justify-center">
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

        {/* r4 + outside-door portrait + r5 in a single horizontal row */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <FadeUp>
            <StitchedFrame variant="photo" tilt={-5}>
              <img
                src={r4}
                alt="Mended garment detail"
                className="block h-[260px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
          <FadeUp delay={0.12}>
            <StitchedFrame variant="photo" tilt={2}>
              <img
                src={outside}
                alt="Studio portrait"
                className="block h-[260px] w-[220px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
          <FadeUp delay={0.24}>
            <StitchedFrame variant="photo" tilt={-3}>
              <img
                src={r5}
                alt="Embroidery close-up"
                className="block h-[260px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
        </div>

      </section>

      {/* Section 3 — centered full-width copy */}
      <section className="mt-24 flex flex-col items-center gap-8">
        <FadeUp className="w-full max-w-3xl">
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
      </section>

      {/* Section 4 — CTA + still deciding text */}
      <section className="mt-20 flex flex-col items-center gap-6">
        <FadeUp>
          <BookAMendButton className="h-20" />
        </FadeUp>
        <FadeUp delay={0.12} className="w-full max-w-xl">
          <StitchedFrame variant="paper" tilt={1.5}>
            <p
              className="font-body text-center text-[#3b2a18]"
              style={{ fontSize: '0.95rem', lineHeight: 1.5 }}
            >
              <span className="font-hand text-[#a83829]" style={{ fontSize: '1.2rem' }}>
                still deciding —
              </span>{' '}
              have a look at the gallery above, or send a photo of the piece you're thinking about.
              i'll let you know if it's a good fit.
            </p>
          </StitchedFrame>
        </FadeUp>
      </section>

      {/* Section 4.5 — r6, r7, r8 photo row */}
      <section className="mt-20">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <FadeUp>
            <StitchedFrame variant="photo" tilt={-4}>
              <img
                src={r6}
                alt="Mended garment detail"
                className="block h-[260px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
          <FadeUp delay={0.12}>
            <StitchedFrame variant="photo" tilt={3}>
              <img
                src={r7}
                alt="Mended garment detail"
                className="block h-[260px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
          <FadeUp delay={0.24}>
            <StitchedFrame variant="photo" tilt={-2}>
              <img
                src={r8}
                alt="Mended garment detail"
                className="block h-[260px] w-[200px] object-cover"
                draggable={false}
              />
            </StitchedFrame>
          </FadeUp>
        </div>
      </section>

      {/* Section 5 — tap-to-mend interactive */}
      <section className="mt-20">
        <div className="flex justify-center">
          <FadeUp>
            <TapToMend tilt={1.5} />
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

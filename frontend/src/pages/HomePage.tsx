import { motion, useReducedMotion, type Variants } from 'framer-motion'
import StitchedFrame from '../components/StitchedFrame'
import TapToMend from '../components/TapToMend'
import FadeUp from '../components/motion/FadeUp'
import { BookAMendButton } from '../App'
import { EASE } from '../lib/motion'
import inside1 from '../assets/home/inside1.jpeg'
import outside from '../assets/home/outside.jpeg'
import r1 from '../assets/home/r1.jpeg'
import r3 from '../assets/home/r3.jpeg'
import r4 from '../assets/home/r4.jpeg'
import r5 from '../assets/home/r5.jpeg'
import r6 from '../assets/home/r6.jpg'
import r7 from '../assets/home/r7.jpg'
import r8 from '../assets/home/r8.jpg'

type PilePhoto = {
  src: string
  alt: string
  top: number
  left: number
  zIndex: number
  tilt: number
  width: number
  height: number
}

type PhotoPileProps = {
  photos: PilePhoto[]
  containerWidth: number
  containerHeight: number
  containerVariants: Variants
  itemVariants: Variants
}

const PILE_SCALE = 'clamp(0.55, calc((100vw - 32px) / 500px), 1)'

function PhotoPile({
  photos,
  containerWidth,
  containerHeight,
  containerVariants,
  itemVariants,
}: PhotoPileProps) {
  return (
    <div
      style={{
        width: `calc(${containerWidth}px * ${PILE_SCALE})`,
        height: `calc(${containerHeight}px * ${PILE_SCALE})`,
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: containerWidth,
          height: containerHeight,
          transform: `scale(${PILE_SCALE})`,
          transformOrigin: 'top left',
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.src}
            className="absolute"
            style={{ top: photo.top, left: photo.left, zIndex: photo.zIndex }}
            variants={itemVariants}
          >
            <StitchedFrame variant="photo" tilt={photo.tilt}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="block object-cover"
                style={{ width: photo.width, height: photo.height }}
                draggable={false}
              />
            </StitchedFrame>
          </motion.div>
        ))}
      </motion.div>
    </div>
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

  const introPhotoPile: PilePhoto[] = [
    { src: r1, alt: 'Studio photo', top: 20, left: 0, zIndex: 1, tilt: -10, width: 170, height: 220 },
    { src: inside1, alt: 'Studio interior', top: 0, left: 160, zIndex: 2, tilt: 2, width: 170, height: 220 },
    { src: r3, alt: 'Studio photo', top: 24, left: 320, zIndex: 3, tilt: -4, width: 170, height: 220 },
  ]

  const firstPhotoPile: PilePhoto[] = [
    { src: r4, alt: 'Mended garment detail', top: 18, left: 0, zIndex: 1, tilt: -8, width: 180, height: 230 },
    { src: outside, alt: 'Studio portrait', top: 6, left: 160, zIndex: 2, tilt: 5, width: 180, height: 230 },
    { src: r5, alt: 'Embroidery close-up', top: 22, left: 320, zIndex: 3, tilt: -3, width: 180, height: 230 },
  ]

  const secondPhotoPile: PilePhoto[] = [
    { src: r6, alt: 'Mended garment detail', top: 18, left: 0, zIndex: 1, tilt: -7, width: 180, height: 230 },
    { src: r7, alt: 'Mended garment detail', top: 4, left: 160, zIndex: 2, tilt: 4, width: 180, height: 230 },
    { src: r8, alt: 'Mended garment detail', top: 20, left: 320, zIndex: 3, tilt: -2, width: 180, height: 230 },
  ]

  return (
    <main className="relative mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-10">

      {/* Section 1 — subtitle copy block under the header title */}
      <section className="mt-4 flex flex-col items-center text-center">
        <FadeUp mode="mount" className="w-full max-w-2xl">
          <StitchedFrame variant="paper" tilt={-1}>
            <p
              className="font-hand text-center text-[#a83829]"
              style={{ fontSize: 'clamp(1.52rem, 3.28vw, 2.1rem)', lineHeight: 1.15 }}
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

      {/* Section 2 — photo pile (spread wider), then r4 + outside + r5 in a photo pile */}
      <section className="mt-12 md:mt-20">
        {/* Photo pile of 3, using the 2nd and 4th photos swapped and one removed */}
        <div className="mb-10 flex justify-center md:mb-14">
          <PhotoPile
            photos={introPhotoPile}
            containerWidth={500}
            containerHeight={300}
            containerVariants={pileContainer}
            itemVariants={pileItem}
          />
        </div>

        {/* "every garment" copy block */}
        <FadeUp className="mb-10 flex justify-center md:mb-14">
          <StitchedFrame variant="paper" tilt={1} className="max-w-3xl">
            <p
              className="font-body text-center text-[#3b2a18]"
              style={{ fontSize: '1rem', lineHeight: 1.5 }}
            >
              hole in your jumper? rip in your jeans? moths nibbled at your favourite
              t-shirt? i'm here to help!
            </p>
          </StitchedFrame>
        </FadeUp>

        {/* r4 + outside-door portrait + r5 in a photo pile */}
        <div className="mb-10 flex justify-center md:mb-14">
          <FadeUp>
            <PhotoPile
              photos={firstPhotoPile}
              containerWidth={500}
              containerHeight={280}
              containerVariants={pileContainer}
              itemVariants={pileItem}
            />
          </FadeUp>
        </div>

      </section>

      {/* Section 3 — centered full-width copy */}
      <section className="mt-16 flex flex-col items-center gap-8 md:mt-24">
        <FadeUp className="w-full max-w-3xl">
          <StitchedFrame variant="paper" tilt={1.5}>
            <p
              className="font-body text-center text-[#3b2a18]"
              style={{ fontSize: '1rem', lineHeight: 1.5 }}
            >
              mending your clothes allows you to carry a little piece of art with you
              wherever you go; as well as reducing textile waste and overconsumption.
            </p>
          </StitchedFrame>
        </FadeUp>
      </section>

      {/* Section 4 — CTA + still deciding text */}
      <section className="mt-12 flex flex-col items-center gap-6 md:mt-20">
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
                still deciding?
              </span>{' '}
              take a look at some examples of my work below, or get in touch via the form
              and we can discuss what mend is best for you.
            </p>
          </StitchedFrame>
        </FadeUp>
      </section>

      {/* Section 4.5 — r6, r7, r8 photo pile */}
      <section className="mt-12 md:mt-20">
        <div className="flex justify-center">
          <FadeUp>
            <PhotoPile
              photos={secondPhotoPile}
              containerWidth={500}
              containerHeight={280}
              containerVariants={pileContainer}
              itemVariants={pileItem}
            />
          </FadeUp>
        </div>
      </section>

      {/* Section 5 — tap-to-mend interactive */}
      <section className="mt-12 md:mt-20">
        <div className="flex justify-center">
          <FadeUp>
            <TapToMend tilt={1.5} />
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

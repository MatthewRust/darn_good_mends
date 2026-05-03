import { motion, useReducedMotion } from 'framer-motion'
import StaggerContainer from '../components/motion/StaggerContainer'
import { EASE, makeStaggerItemVariants } from '../lib/motion'

// HEIC files display natively on Apple devices/Safari. For broader browser
// support, convert gallery images to JPEG.
const imageModules = import.meta.glob('../assets/gallery/*', { eager: true, query: '?url', import: 'default' }) as Record<
  string,
  string
>

const images = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

const TILTS = [-3, 2, -5, 4, -2, 3, -4, 1, 5, -3, 2, -1, 4, -2]

function PolaroidFrame({ src, index }: { src: string; index: number }) {
  const tilt = TILTS[index % TILTS.length]
  const reduced = useReducedMotion()
  const itemVariants = makeStaggerItemVariants(reduced)
  const hover = reduced ? undefined : { scale: 1.04, rotate: tilt + 1 }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={hover}
      whileFocus={hover}
      transition={{ duration: 0.25, ease: EASE }}
      tabIndex={0}
      style={{
        rotate: tilt,
        backgroundColor: '#fffaf0',
        padding: '8px 8px 36px 8px',
        boxShadow: '0 6px 18px rgba(80,45,15,0.22), 0 1px 3px rgba(80,45,15,0.14)',
        borderRadius: 2,
        display: 'inline-block',
        outline: 'none',
      }}
    >
      <img
        src={src}
        alt={`Gallery image ${index + 1}`}
        draggable={false}
        style={{
          display: 'block',
          width: 200,
          height: 200,
          objectFit: 'cover',
        }}
      />
    </motion.div>
  )
}

export function GalleryPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-10">
      <h1
        className="font-hand text-center text-[#7a0000] mb-12"
        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1 }}
      >
        the gallery
      </h1>

      <StaggerContainer
        stagger={0.06}
        viewportAmount={0.1}
        className="flex flex-wrap justify-center gap-10"
      >
        {images.map((src, i) => (
          <PolaroidFrame key={src} src={src} index={i} />
        ))}
      </StaggerContainer>

      {images.length === 0 && (
        <p className="font-body text-center text-[#3b2a18]/60 mt-20" style={{ fontSize: '1rem' }}>
          no images yet — check back soon.
        </p>
      )}
    </main>
  )
}

import StitchedFrame from '../components/StitchedFrame'
import TapToMend from '../components/TapToMend'
import { BookAMendButton } from '../App'
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
  return (
    <main className="relative mx-auto max-w-6xl px-6 pt-8 pb-24 sm:px-10">

      {/* Section 1 — title on left, outside image on right */}
      <section className="mt-4 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <h1
            className="font-hand text-[#7a0000]"
            style={{ fontSize: 'clamp(2.4rem, 8vw, 4.6rem)', lineHeight: 0.95 }}
          >
            darn good mends
          </h1>
          <p
            className="font-hand mt-4 text-[#7a0000]"
            style={{ fontSize: '1.6rem', lineHeight: 1.15 }}
          >
            breathing new life
            <br />
            into old garments
          </p>
          <p
            className="font-body mt-3 max-w-xs text-[#3b2a18]"
            style={{ fontSize: '0.95rem', lineHeight: 1.4 }}
          >
            bespoke clothes mending &amp; hand embroidery from my studio in east london
          </p>
        </div>

        <div className="flex flex-col items-center">
          <StitchedFrame variant="photo" tilt={2}>
            <img
              src={outside}
              alt="Studio piece"
              className="block h-[300px] w-[260px] object-cover"
              draggable={false}
            />
          </StitchedFrame>
        </div>
      </section>

      {/* Section 2 — photo pile above group of 3 */}
      <section className="mt-20">
        {/* Photo pile */}
        <div className="mb-14 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <div className="relative" style={{ width: 510, height: 300 }}>
              {/* r1 — back */}
              <div className="absolute" style={{ top: 20, left: 0, zIndex: 1 }}>
                <StitchedFrame variant="photo" tilt={-10}>
                  <img src={r1} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
                </StitchedFrame>
              </div>
              {/* r2 */}
              <div className="absolute" style={{ top: 12, left: 105, zIndex: 2 }}>
                <StitchedFrame variant="photo" tilt={6}>
                  <img src={r2} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
                </StitchedFrame>
              </div>
              {/* r3 */}
              <div className="absolute" style={{ top: 24, left: 210, zIndex: 3 }}>
                <StitchedFrame variant="photo" tilt={-4}>
                  <img src={r3} alt="Studio photo" className="block h-[220px] w-[170px] object-cover" draggable={false} />
                </StitchedFrame>
              </div>
              {/* inside1 — front */}
              <div className="absolute" style={{ top: 0, left: 315, zIndex: 4 }}>
                <StitchedFrame variant="photo" tilt={2}>
                  <img src={inside1} alt="Me in the studio" className="block h-[220px] w-[170px] object-cover" draggable={false} />
                </StitchedFrame>
              </div>
            </div>
            {/* Arrow label beside the pile */}
            <div className="hidden sm:flex flex-col items-center gap-1">
              <HandArrow className="h-10 w-16" flip />
              <span className="font-hand text-[#7a0000]" style={{ fontSize: '1.3rem' }}>
                me in the studio
              </span>
            </div>
          </div>
        </div>

        {/* Group of 3 — r4 and r5 (outside moved to top section) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          <StitchedFrame variant="photo" tilt={-5}>
            <img
              src={r4}
              alt="Mended garment detail"
              className="block h-[200px] w-[200px] object-cover"
              draggable={false}
            />
          </StitchedFrame>
          <StitchedFrame variant="photo" tilt={-3}>
            <img
              src={r5}
              alt="Embroidery close-up"
              className="block h-[200px] w-[200px] object-cover"
              draggable={false}
            />
          </StitchedFrame>
        </div>
        <div className="mt-10 flex justify-center">
          <StitchedFrame variant="paper" tilt={1} className="max-w-xl">
            <p className="font-body text-[#3b2a18]" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
              every garment carries a story. each mend i make is a small act of care, a stitch
              between what was and what could be again.
            </p>
          </StitchedFrame>
        </div>
      </section>

      {/* Section 3 — text + squirrel feature */}
      <section className="mt-24 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <StitchedFrame variant="paper" tilt={-2} className="max-w-md self-start">
            <p className="font-body text-[#3b2a18]" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
              i work with natural threads and salvaged trims. nothing flashy, just slow,
              considered repair.
            </p>
          </StitchedFrame>
          <StitchedFrame variant="paper" tilt={1.5} className="max-w-md self-end">
            <p className="font-body text-[#3b2a18]" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
              collection in person or post — turnaround is usually one to two weeks depending on
              the piece.
            </p>
          </StitchedFrame>
        </div>
        <div className="flex flex-col items-center gap-3">
          <StitchedFrame variant="photo" tilt={-1}>
            <img
              src={squirel}
              alt="Embroidered squirrel motif on clothes"
              className="block h-[300px] w-[260px] object-cover"
              draggable={false}
            />
          </StitchedFrame>
        </div>
      </section>

      {/* Section 4 — CTA + still deciding text */}
      <section className="mt-20 flex flex-col items-center gap-6">
        <BookAMendButton />
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
      </section>

      {/* Section 5 — gallery row 2 with tap-to-mend interactive */}
      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-center gap-10">
          <StitchedFrame variant="photo" tilt={-4}>
            <img
              src={r6}
              alt="Repair detail"
              className="block h-[220px] w-[180px] object-cover"
              draggable={false}
            />
          </StitchedFrame>
          <TapToMend tilt={1.5} />
          <StitchedFrame variant="photo" tilt={3}>
            <img
              src={n1}
              alt="Studio piece"
              className="block h-[220px] w-[180px] object-cover"
              draggable={false}
            />
          </StitchedFrame>
        </div>
      </section>
    </main>
  )
}

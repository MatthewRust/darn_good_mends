import { motion, useReducedMotion } from 'framer-motion'

export function HomePage() {
  const reduceMotion = useReducedMotion()
  const stitchedTitle = 'darn good mends'
  const letters = Array.from(stitchedTitle)

  const threadPath = 'M 34 148 C 82 72, 122 64, 166 112 S 248 178, 288 122 S 350 58, 366 104'

  const unevenStitches = [
    { gap: 8, offset: 0 },
    { gap: 9, offset: 1 },
    { gap: 7, offset: 2 },
    { gap: 8.5, offset: 1 },
    { gap: 8, offset: 0 },
    { gap: 9, offset: 2 },
    { gap: 7.5, offset: 1 },
    { gap: 8, offset: 0 },
  ]

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      {/* Linen texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px),
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px)
          `,
          backgroundColor: '#f4ead7',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <svg
          viewBox="0 0 400 220"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="darn good mends stitched wordmark"
        >
          <defs>
            <linearGradient id="thread-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="45%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="linen-texture">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" />
            </filter>
          </defs>

          <path id="stitched-path" d={threadPath} fill="none" />

          {/* Wobbling shadow thread */}
          <motion.path
            d={threadPath}
            fill="none"
            stroke="#ead2c4"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.55"
            animate={
              reduceMotion
                ? { opacity: 0.55 }
                : {
                    pathLength: 1,
                    opacity: 0.8,
                    strokeDasharray: unevenStitches.map((s) => `${s.gap} 18`),
                    y: [0, -0.5, 0.3, -0.2, 0],
                  }
            }
            transition={{
              pathLength: { duration: 1.25, ease: 'easeInOut' },
              y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
              strokeDasharray: { duration: 1.25, ease: 'easeInOut' },
            }}
          />

          {/* Main red thread with uneven stitches */}
          <motion.g>
            {unevenStitches.map((stitch, idx) => (
              <motion.path
                key={`stitch-${idx}`}
                d={threadPath}
                fill="none"
                stroke="url(#thread-glow)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${stitch.gap} 7`}
                opacity={0}
                animate={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        pathLength: 1,
                        opacity: 1,
                        y: stitch.offset * 0.15,
                      }
                }
                transition={{
                  pathLength: { duration: 1.35, ease: 'easeInOut' },
                  y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 1.35, ease: 'easeInOut' },
                }}
              />
            ))}
          </motion.g>

          {/* Needle traveling along path */}
          <motion.g
            animate={
              reduceMotion
                ? { opacity: 0 }
                : {
                    offsetDistance: ['0%', '100%'],
                  }
            }
            transition={{
              offsetDistance: {
                duration: 2,
                delay: 0.8,
                ease: 'easeInOut',
              },
            }}
            style={{
              offsetPath: `path('${threadPath}')`,
              offsetRotate: '0deg',
            } as any}
          >
            <g transform="translate(-4, -5)">
              {/* Needle from provided SVG - simplified red needle */}
              <path
                d="M1.284 9.684C1.036 9.684 0.8 9.648 0.576 9.576C0.352 9.512 0.16 9.368 0 9.144C0.08 8.76 0.176 8.348 0.288 7.908C0.408 7.46 0.536 7.004 0.672 6.54C0.808 6.068 0.944 5.608 1.08 5.16C1.224 4.704 1.36 4.28 1.488 3.888C1.616 3.496 1.732 3.152 1.836 2.856C1.94 2.56 2.02 2.336 2.076 2.184C2.1 2.12 2.14 2.028 2.196 1.908C2.252 1.78 2.32 1.652 2.4 1.524C2.48 1.396 2.572 1.288 2.676 1.2C2.78 1.104 2.892 1.056 3.012 1.056C3.124 1.056 3.236 1.096 3.348 1.176C3.1 1.752 2.848 2.388 2.592 3.084C2.344 3.78 2.104 4.5 1.872 5.244C1.64 5.98 1.428 6.7 1.236 7.404C1.044 8.108 0.884 8.748 0.756 9.324C0.868 9.34 0.96 9.352 1.032 9.36C1.112 9.368 1.192 9.372 1.272 9.372C1.784 9.372 2.276 9.252 2.748 9.012C3.228 8.78 3.672 8.46 4.08 8.052C4.496 7.636 4.86 7.164 5.172 6.636C5.484 6.1 5.724 5.536 5.892 4.944C6.068 4.344 6.156 3.748 6.156 3.156C6.156 2.508 6.052 1.976 5.844 1.56C5.636 1.136 5.348 0.824 4.98 0.624C4.612 0.424 4.184 0.324 3.696 0.324C3.176 0.324 2.708 0.428 2.292 0.636C1.876 0.844 1.548 1.124 1.308 1.476C1.068 1.828 0.948 2.224 0.948 2.664C0.948 2.76 0.952 2.844 0.96 2.916C0.976 2.988 0.992 3.052 1.008 3.108C0.744 3.108 0.556 3.044 0.444 2.916C0.34 2.78 0.288 2.62 0.288 2.436C0.288 2.156 0.384 1.876 0.576 1.596C0.776 1.308 1.048 1.044 1.392 0.804C1.744 0.564 2.148 0.372 2.604 0.228C3.06 0.076 3.544 0 4.056 0C4.776 0 5.352 0.148 5.784 0.444C6.224 0.732 6.544 1.124 6.744 1.62C6.944 2.116 7.044 2.672 7.044 3.288C7.044 3.984 6.936 4.652 6.72 5.292C6.504 5.924 6.204 6.508 5.82 7.044C5.444 7.572 5.012 8.036 4.524 8.436C4.036 8.828 3.512 9.132 2.952 9.348C2.4 9.572 1.844 9.684 1.284 9.684Z"
                fill="#EE3333"
                filter="url(#linen-texture)"
              />
            </g>
          </motion.g>

          {/* Stitched letters */}
          <motion.text
            xmlSpace="preserve"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="40"
            fontWeight="700"
            letterSpacing="2"
            fill="url(#thread-glow)"
            stroke="#5f1a1a"
            strokeWidth="1"
            paintOrder="stroke fill"
            style={{ filter: 'drop-shadow(0 1px 0 rgba(255, 245, 238, 0.45))' }}
          >
            <textPath href="#stitched-path" startOffset="50%" textAnchor="middle">
              {letters.map((letter, index) => {
                const delay = index * 0.11

                if (letter === ' ') {
                  return (
                    <motion.tspan
                      key={`space-${index}`}
                      dx="12"
                      fill="transparent"
                      initial={false}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                    >
                      {'\u00A0'}
                    </motion.tspan>
                  )
                }

                return (
                  <motion.tspan
                    key={`${letter}-${index}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 8, rotate: -1 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      delay,
                      duration: 0.34,
                      ease: 'easeOut',
                    }}
                  >
                    {letter}
                  </motion.tspan>
                )
              })}
            </textPath>
          </motion.text>
        </svg>
      </div>
    </main>
  )
}

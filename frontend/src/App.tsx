import { AppRoutes } from './routes/AppRoutes'

function BookAMendButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      className={`relative font-hand tracking-wide text-[#7a0000] transition-transform hover:-translate-y-0.5 ${className}`}
      style={{ fontSize: '1.35rem' }}
    >
      <span className="relative z-10 inline-block bg-[#fffaf0] px-4 py-1">BOOK A MEND</span>
      <svg
        className="pointer-events-none absolute"
        style={{ top: 2, left: 2, right: 2, bottom: 2, width: 'calc(100% - 4px)', height: 'calc(100% - 4px)' }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#7a0000"
          strokeWidth="1.4"
          strokeDasharray="5 3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

function SquirrelBadge() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 56" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r="25"
          fill="#fffaf0"
          stroke="#7a0000"
          strokeWidth="1.4"
          strokeDasharray="5 3"
        />
      </svg>
      <span
        className="font-hand relative leading-none text-[#7a0000]"
        style={{ fontSize: '0.85rem', textAlign: 'center' }}
      >
        SQUIR
        <br />
        REL
      </span>
    </div>
  )
}

function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <SquirrelBadge />
          <BookAMendButton />
        </div>
        <svg
          className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="1.5"
            x2="100%"
            y2="1.5"
            stroke="#7a0000"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            opacity="0.85"
          />
        </svg>
      </header>
      <AppRoutes />
    </div>
  )
}

export default App
export { BookAMendButton, SquirrelBadge }

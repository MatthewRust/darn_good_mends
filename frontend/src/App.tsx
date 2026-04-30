import { Link } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import dgmLogo from './assets/home/dgm logo.png'

function DashedButton({ label, to, className = '' }: { label: string; to: string; className?: string }) {
  return (
    <Link
      to={to}
      className={`relative font-hand tracking-wide text-[#7a0000] transition-transform hover:-translate-y-0.5 ${className}`}
      style={{ fontSize: '1.35rem', textDecoration: 'none' }}
    >
      <span className="relative z-10 inline-block bg-[#fffaf0] px-4 py-1">{label}</span>
      <svg
        className="pointer-events-none absolute"
        style={{ top: 2, left: 2, right: 2, bottom: 2, width: 'calc(100% - 4px)', height: 'calc(100% - 4px)', overflow: 'visible' }}
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
    </Link>
  )
}

function BookAMendButton({ className = '' }: { className?: string }) {
  return <DashedButton label="BOOK A MEND" to="/book" className={className} />
}

function ViewGalleryButton({ className = '' }: { className?: string }) {
  return <DashedButton label="GALLERY" to="/gallery" className={className} />
}

function SquirrelBadge() {
  return (
    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#7a0000]/40 bg-[#fffaf0]">
      <img src={dgmLogo} alt="Darn Good Mends logo" className="h-full w-full object-cover" draggable={false} />
    </div>
  )
}

function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <SquirrelBadge />
          <div className="flex items-center gap-3">
            <ViewGalleryButton />
            <BookAMendButton />
          </div>
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
export { BookAMendButton, ViewGalleryButton, SquirrelBadge }

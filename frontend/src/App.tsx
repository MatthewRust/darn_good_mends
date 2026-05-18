import { Link } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import StitchedFrame from './components/StitchedFrame'
import dgmLogo from './assets/home/dgm logo.png'
import bookAMendBadge from './assets/home/book_a_mend_badge.png'

function BookAMendButton({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/book"
      aria-label="Book a mend"
      className={`inline-block transition-transform hover:-translate-y-0.5 ${className}`}
    >
      <img
        src={bookAMendBadge}
        alt="Book a mend"
        className="block h-full w-auto select-none"
        draggable={false}
      />
    </Link>
  )
}

function SquirrelBadge() {
  return (
    <Link to="/" aria-label="Go to home page" className="mt-4 inline-block transition-transform hover:scale-105">
      <img
        src={dgmLogo}
        alt="Darn Good Mends logo"
        className="block h-[168px] w-[168px] object-contain"
        draggable={false}
      />
    </Link>
  )
}

function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="relative">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <SquirrelBadge />
          <div className="flex flex-1 justify-center">
            <StitchedFrame variant="paper" tilt={-1}>
              <h1
                className="font-hand text-[#7a0000]"
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
                  lineHeight: 1,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                darn good mends
              </h1>
            </StitchedFrame>
          </div>
          <BookAMendButton className="h-12" />
        </div>
      </header>
      <AppRoutes />
    </div>
  )
}

export default App
export { BookAMendButton, SquirrelBadge }

import { Link } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import Footer from './components/Footer'
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
        className="block h-[96px] w-[96px] object-contain md:h-[185px] md:w-[185px]"
        draggable={false}
      />
    </Link>
  )
}

function App() {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="relative">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-center justify-between gap-4 md:contents">
            <SquirrelBadge />
            <BookAMendButton className="h-[3.25rem] md:h-[5.16rem] md:order-3" />
          </div>
          <div className="flex flex-1 justify-center md:order-2">
            <div
              className="bg-[#a83829] px-5 py-2 shadow-md md:mt-[138px]"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <h1
                className="font-hand text-white text-center"
                style={{
                  fontSize: 'clamp(1.7rem, 8vw, 3.95rem)',
                  lineHeight: 1.05,
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                darn good mends
              </h1>
            </div>
          </div>
        </div>
      </header>
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
export { BookAMendButton, SquirrelBadge }

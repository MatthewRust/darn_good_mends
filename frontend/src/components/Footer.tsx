import { Link } from 'react-router-dom'
import dgmLogo from '../assets/home/dgm logo.png'
import bookAMendBadge from '../assets/home/book_a_mend_badge.png'

export default function Footer() {
  return (
    <footer className="bg-[#a83829]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <span className="flex shrink-0 items-center justify-center">
          <img
            src={dgmLogo}
            alt="Darn Good Mends logo"
            className="h-20 w-auto select-none object-contain"
            draggable={false}
          />
        </span>
        <Link to="/book" aria-label="Book a mend" className="inline-block shrink-0 transition-transform hover:-translate-y-0.5">
          <img src={bookAMendBadge} alt="Book a mend" className="block h-14 w-auto select-none sm:h-16" draggable={false} />
        </Link>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-6 text-center">
        <a href="mailto:hello@darngoodmends.com" className="text-white text-sm hover:underline">hello@darngoodmends.com</a>
      </div>
    </footer>
  )
}

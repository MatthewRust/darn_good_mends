import { Link } from 'react-router-dom'
import squirrel from '../assets/home/squirel.png'

const SOCIALS = [
  { label: 'instagram', href: '#' },
  { label: 'facebook', href: '#' },
  { label: 'tiktok', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#a83829]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-4 px-6 py-5">
        <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#fffaf0]">
          <img
            src={squirrel}
            alt="Darn Good Mends squirrel"
            className="h-11 w-11 object-contain"
            draggable={false}
          />
        </span>
        <Link
          to="/book"
          className="font-hand text-[#fffaf0] transition-transform hover:-translate-y-0.5"
          style={{ fontSize: '1.7rem', lineHeight: 1 }}
        >
          book a mend
        </Link>
        <nav className="ml-auto flex items-center gap-5">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-hand text-[#fffaf0] transition-transform hover:-translate-y-0.5"
              style={{ fontSize: '1.25rem', lineHeight: 1 }}
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

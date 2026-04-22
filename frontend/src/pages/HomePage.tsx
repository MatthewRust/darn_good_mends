import underconstructionSquirel from '../assets/underconstruction_squirel.png'

export function HomePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 py-10"
      style={{ backgroundColor: '#faf6eb' }}
    >
      <img
        src={underconstructionSquirel}
        alt="under construction squirrel"
        className="w-full max-w-[420px] object-contain"
      />

      <p
        className="mt-6 text-center text-lg tracking-[0.02em] sm:text-xl"
        style={{ color: '#a93c2d' }}
      >
        website being stitched together
      </p>
    </main>
  )
}

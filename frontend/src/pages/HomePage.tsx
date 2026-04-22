import StitchedLogo from '../components/StitchedLogo.tsx'

export function HomePage() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{
        backgroundColor: '#faf6f0',
        backgroundImage:
          'radial-gradient(rgba(80, 53, 29, 0.08) 0.6px, transparent 0.6px), radial-gradient(rgba(80, 53, 29, 0.06) 0.5px, transparent 0.5px)',
        backgroundSize: '12px 12px, 8px 8px',
        backgroundPosition: '0 0, 4px 4px',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(140, 106, 73, 0.05), rgba(140, 106, 73, 0.05) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, rgba(140, 106, 73, 0.05), rgba(140, 106, 73, 0.05) 1px, transparent 1px, transparent 6px)',
          mixBlendMode: 'multiply',
        }}
      />

      <section className="relative z-10 w-full max-w-5xl rounded-[1.75rem] border-2 border-dashed border-[#cfad85] bg-[#fff9ef]/90 p-6 shadow-[0_30px_80px_rgba(113,75,42,0.18)] sm:p-10">
        <StitchedLogo className="mx-auto block w-[min(90vw,700px)]" />
      </section>
    </main>
  )
}

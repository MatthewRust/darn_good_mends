import { useEffect, useState } from 'react'
import { api } from '../services/api'

export function HomePage() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    api
      .get('/health')
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))
  }, [])

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Full-Stack Boilerplate
        </p>
        <h1 className="text-4xl font-bold text-slate-900">React + Express + Postgres</h1>
        <p className="text-slate-600">
          Frontend is running. Backend health check is{' '}
          <span className="font-semibold">{status}</span>.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Next steps</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Create feature pages in src/pages.</li>
          <li>Register page routes in src/routes/AppRoutes.tsx.</li>
          <li>Create API clients in src/services and call backend endpoints.</li>
        </ul>
      </section>
    </main>
  )
}

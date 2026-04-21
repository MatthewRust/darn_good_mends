import { Link } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <>
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl gap-6 px-6 py-4 text-sm font-medium text-slate-700">
          <Link to="/">Home</Link>
        </div>
      </nav>
      <AppRoutes />
    </>
  )
}

export default App

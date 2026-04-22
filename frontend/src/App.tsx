import { Link } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <>
      <nav className="border-b border-[#2b2620] bg-[repeating-linear-gradient(-45deg,_#f7c62f_0px,_#f7c62f_14px,_#121212_14px,_#121212_28px)]">
        <div className="mx-auto flex max-w-4xl gap-6 px-6 py-3 text-sm font-medium">
        </div>
      </nav>
      <AppRoutes />
    </>
  )
}

export default App

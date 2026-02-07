import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

function Header() {
  return (
    <div className="flex animate-slide-down items-center justify-between border-b border-primary-200 bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-3 uppercase shadow-lg backdrop-blur-sm sm:px-6">
      <Link
        to="/"
        className="flex items-center gap-4 font-bold tracking-widest text-white transition-transform duration-200 hover:scale-105"
      >
        SliceRush
      </Link>
      <div className="flex items-center gap-4">
        <Username />
        <SearchOrder />
      </div>
    </div>
  )
}

export default Header

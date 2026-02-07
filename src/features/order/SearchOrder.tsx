import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'

function SearchOrder() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!query) return
    navigate(ROUTES.ORDER(query))
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-white/70 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 sm:w-64 sm:focus:w-72"
      />
    </form>
  )
}

export default SearchOrder

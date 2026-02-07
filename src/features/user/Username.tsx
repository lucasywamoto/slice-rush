import { useAppSelector } from '../../store'

function Username() {
  const username = useAppSelector((state) => state.user?.username)

  if (!username) return null

  return (
    <div className="hidden text-sm font-semibold text-white md:block">
      Hello, {username}!
    </div>
  )
}

export default Username

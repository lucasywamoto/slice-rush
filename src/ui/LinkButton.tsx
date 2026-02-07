import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LinkButton({
  children,
  to,
}: {
  children: ReactNode
  to: string | number
}) {
  const navigate = useNavigate()
  const className = 'text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors duration-200'
  const isLink = Number.isInteger(to)

  return isLink ? (
    <Link to={to as string} className={className}>
      {children}
    </Link>
  ) : (
    <button onClick={() => navigate(to as number)} className={className}>
      {children}
    </button>
  )
}

export default LinkButton

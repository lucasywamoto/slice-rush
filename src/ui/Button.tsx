import { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

function Button({
  children,
  to,
  disabled,
  onClick,
  type = 'primary',
}: {
  children: ReactNode
  to?: string
  disabled?: boolean
  onClick?: MouseEventHandler
  type?: 'primary' | 'secondary' | 'small' | 'round'
}) {
  const base =
    'inline-block rounded-full text-sm bg-gradient-to-r from-primary-600 to-accent-600 font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 active:scale-95 '
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'inline-block text-sm rounded-full border-2 border-primary-400  px-4 py-2.5 md:px-6 md:py-3.5 font-semibold uppercase tracking-wide text-primary-600 transition-all duration-300 hover:bg-primary-600 hover:text-white hover:scale-105 hover:shadow-md focus:bg-primary-600 focus:outline-none focus:text-white focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 ',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  }

  const isLink = to !== undefined
  const hasOnClick = onClick !== null

  if (isLink)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    )

  if (hasOnClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    )

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  )
}

export default Button

import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { useAppSelector } from '../../store'
import { selectTotalCartPrice, selectTotalCartQty } from './cartSlice'
import { formatCurrency } from '../../utilities/helpers'

function CartOverview() {
  const totalQty = useAppSelector(selectTotalCartQty)
  const totalPrice = useAppSelector(selectTotalCartPrice)

  return (
    totalQty > 0 && (
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-4 text-sm uppercase text-slate-100 sm:px-6 md:text-base shadow-lg animate-slide-up">
        <p className="space-x-4 font-semibold text-slate-200 sm:space-x-6">
          <span>{`${totalQty} ${totalQty > 1 ? 'Pizzas' : 'Pizza'}`}</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <Link to={ROUTES.CART} className="hover:text-primary-300 transition-colors duration-200">Open cart &rarr;</Link>
      </div>
    )
  )
}

export default CartOverview

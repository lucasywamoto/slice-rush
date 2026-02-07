// Test ID: IIDSAT

import { LoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers'
import OrderItem from './OrderItem'
import { useEffect } from 'react'
import { useAppDispatch } from '../../store'
import { clearCart } from '../cart/cartSlice'
import { ROUTES } from '../../routes.constants'
import UpdateOrder from './UpdateOrder'

function Order() {
  const order = useLoaderData() as Order
  const dispatch = useAppDispatch()
  const fetcher = useFetcher()
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, cart, status, priority, orderPrice, estimatedDelivery } = order

  const priorityPrice = priority ? Number((orderPrice * 0.2).toFixed(2)) : 0
  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  useEffect(() => {
    if (fetcher.data && fetcher.state !== 'idle') return

    fetcher.load(ROUTES.MENU)
  }, [])

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-5 rounded-lg shadow-sm">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-slate-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-slate-200 border-b border-t border-slate-200">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((el: Pizza) => el.id === item.pizzaId)
                .ingredients as string[]
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-5 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-slate-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-slate-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const order = await getOrder(params.orderId!)
  return order
}

export default Order

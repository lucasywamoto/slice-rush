import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useAppDispatch, useAppSelector } from '../../store'
import { clearCart, selectCart } from './cartSlice'
import EmptyCart from './EmptyCart'
import { ROUTES } from '../../routes'

function Cart() {
  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.user?.username)
  const cart = useAppSelector(selectCart)

  function handleClearCart() {
    dispatch(clearCart())
  }

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-3">
      <LinkButton to={ROUTES.MENU}>&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to={ROUTES.NEW_ORDER} type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  )
}

export default Cart

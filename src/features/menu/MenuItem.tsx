import { useAppDispatch, useAppSelector } from '../../store'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utilities/helpers'
import { addItem, selectPizzaQtyById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQty from '../cart/UpdateItemQty'

function MenuItem({ pizza }: { pizza: Pizza }) {
  const dispatch = useAppDispatch()
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const quantity = useAppSelector((state) => selectPizzaQtyById(state, id))

  function handleAddToCart() {
    const newItem: CartItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2 hover:bg-white/50 rounded-lg transition-all duration-200 px-2 animate-fade-in">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-lg shadow-md transition-all duration-300 hover:scale-105 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="mt-0.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-slate-600">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-semibold text-primary-600">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-slate-500">
              Sold out
            </p>
          )}
          {quantity > 0 ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQty pizzaId={id} quantity={quantity} />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            !soldOut && (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem

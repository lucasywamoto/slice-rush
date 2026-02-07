import { useAppDispatch } from '../../store'
import Button from '../../ui/Button'
import { decreaseItemQty, increaseItemQty } from './cartSlice'

function UpdateItemQty({
  pizzaId,
  quantity,
}: {
  pizzaId: number
  quantity: number
}) {
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQty(pizzaId))}>
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQty(pizzaId))}>
        +
      </Button>
    </div>
  )
}

export default UpdateItemQty

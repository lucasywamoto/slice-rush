import { useAppDispatch } from '../../store'
import Button from '../../ui/Button'
import { deleteItem } from './cartSlice'

function DeleteItem({ pizzaId }: { pizzaId: number }) {
  const dispatch = useAppDispatch()

  function handleDeleteFromCart() {
    dispatch(deleteItem(pizzaId))
  }

  return (
    <Button type="small" onClick={handleDeleteFromCart}>
      Delete
    </Button>
  )
}

export default DeleteItem

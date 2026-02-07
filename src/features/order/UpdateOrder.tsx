import { ActionFunctionArgs, useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrder } from '../../services/apiRestaurant'

function UpdateOrder({ order }: { order: Order }) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <input type="hidden" value={JSON.stringify(order)} />
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  )
}

export async function action({ params }: ActionFunctionArgs) {
  const data = { priority: true }

  try {
    await updateOrder(params.orderId as string, data)
  } catch (err) {
    console.error('Order update failed:', err)
  }
  return null
}

export default UpdateOrder

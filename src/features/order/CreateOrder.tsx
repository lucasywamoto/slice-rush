import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectCart, selectTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from '../../utilities/helpers'
import { MouseEvent, useState } from 'react'
import { fetchAddress } from '../user/userSlice'

type FormErrors = {
  phone?: string
  customer?: string
  address?: string
  general?: string
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)

  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const isSubmiting = navigation.state === 'submitting'

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user)
  const isLoadingAddress = addressStatus === 'loading'
  const cart = useAppSelector(selectCart)
  const totalCartPrice = useAppSelector(selectTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice
  const formErrors = useActionData() as FormErrors

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
          {formErrors?.customer && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.customer}
            </p>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {formErrors?.address && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.address}
              </p>
            )}
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="z-99 absolute right-[3px] top-[3px] md:right-[4px] md:top-[4px]">
            {!position && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
                disabled={isLoadingAddress}
              >
                Get position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={String(withPriority)}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 hover:scale-110"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {formErrors?.general && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.general}
            </p>
          )}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position ? `${position?.latitude},${position?.longitude}` : ''
            }
          />
          <Button disabled={isSubmiting || isLoadingAddress} type="primary">
            {isSubmiting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const { ROUTES } = await import('../../routes.constants')
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const errors: FormErrors = {}

  if (!data.customer) errors.customer = 'Name is required'
  if (!data.phone) errors.phone = 'Phone is required'
  if (!data.address) errors.address = 'Address is required'
  if (!isValidPhone(data.phone.toString()))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.'

  if (Object.keys(errors).length > 0) return errors

  const order: OrderDTO = {
    customer: data.customer as string,
    phone: data.phone as string,
    address: data.address as string,
    cart: JSON.parse(data.cart as string) as CartItem[],
    priority: data.priority === 'true',
  }

  try {
    const newOrder = await createOrder(order)
    return redirect(ROUTES.ORDER(newOrder.id))
  } catch (error) {
    console.error('Order creation failed:', error)
    errors.general = 'Failed to create order. Please try again.'
  }
}

export default CreateOrder

type Pizza = {
  id: number
  name: string
  unitPrice: number
  imageUrl: string
  ingredients: string[]
  soldOut: boolean
}

type Order = {
  id: string
  customer: string
  phone: string
  address: string
  priority: boolean
  status: string
  estimatedDelivery: string
  cart: CartItem[]
  position: string
  orderPrice: number
  priorityPrice: number
}

type OrderDTO = {
  customer: string
  phone: string
  address: string
  priority: boolean
  cart: CartItem[]
}

type CartItem = {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

type User = {
  username?: string
  status: 'idle' | 'loading' | 'error'
  position?: Position
  address?: string
  error?: string
}

type Position = {
  latitude: number
  longitude: number
}

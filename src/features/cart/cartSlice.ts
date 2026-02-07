import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../../store'

const initialState = {
  cart: [] as CartItem[],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      if (state.cart.find((item) => item.pizzaId === action.payload.pizzaId))
        return state
      state.cart.push(action.payload)
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
    },
    increaseItemQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload)
      if (!item) return state
      item.quantity++
      item.totalPrice = item.unitPrice * item.quantity
    },
    decreaseItemQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload)
      if (!item) return state
      item.quantity--
      item.totalPrice = item.unitPrice * item.quantity

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer

// export function getTotalCartQty(state: RootState) {
//   return state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0)
// }

// export function getTotalCartPrice(state: RootState) {
//   return state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0)
// }

export const selectCart = (state: RootState) => state.cart.cart

export const selectTotalCartQty = createSelector([selectCart], (cart) =>
  cart.reduce((acc, cur) => acc + cur.quantity, 0),
)

export const selectTotalCartPrice = createSelector([selectCart], (cart) =>
  cart.reduce((acc, cur) => acc + cur.totalPrice, 0),
)

export const selectPizzaQtyById = createSelector(
  [selectCart, (_state: RootState, pizzaId: number) => pizzaId],
  (cart, pizzaId) =>
    cart.find((item) => item.pizzaId === pizzaId)?.quantity || 0,
)

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  MENU: '/menu',
  NEW_ORDER: '/order',
  ORDER_DETAIL: '/order/:orderId',
  ORDER: (id: string) => `/order/${id}`,
}

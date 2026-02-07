import { ROUTES } from './routes.constants'

import AppLayout from './ui/AppLayout'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Home from './ui/Home'
import Cart from './features/cart/Cart'
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import { action as updateOrderAction } from './features/order/UpdateOrder'
import Error from './ui/Error'

export { ROUTES } from './routes.constants'
export const routesConfig = [
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.MENU,
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.NEW_ORDER,
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: ROUTES.ORDER_DETAIL,
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]

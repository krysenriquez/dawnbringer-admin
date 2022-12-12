import {Route, Routes, Outlet} from 'react-router-dom'
import {OrdersListWrapper} from '../components/OrdersListWrapper'
import {OrderInfoWrapper} from '../components/OrderInfoWrapper'
const OrdersRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<OrdersListWrapper />} />
      <Route path=':order_id' element={<OrderInfoWrapper />} />
    </Routes>
  )
}

export default OrdersRoutes

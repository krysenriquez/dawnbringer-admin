import {OrderInfoQueryProvider} from '../stores/OrderInfoQueryProvider'
import OrderInfoPage from '../components/OrderInfo/OrderInfoPage'

const OrderInfo = () => {
  return (
    <OrderInfoQueryProvider>
      <OrderInfoPage />
    </OrderInfoQueryProvider>
  )
}

export default OrderInfo

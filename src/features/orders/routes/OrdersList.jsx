import {OrdersListQueryProvider} from '../stores/OrdersListQueryProvider'
import OrdersListTable from '../components/OrdersList/OrdersListTable'

const OrdersList = () => {
  return (
    <>
      <OrdersListQueryProvider>
        <OrdersListTable />
      </OrdersListQueryProvider>
    </>
  )
}

export default OrdersList

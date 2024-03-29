import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import OrderDetails from './components/OrderDetails'
import OrderCustomer from './components/OrderCustomer'
import OrderMember from './components/OrderMember'
import OrderDocuments from './components/OrderDocuments'
import OrderAddress from './components/OrderAddress'
import OrderMedia from './components/OrderMedia'
import OrderTable from './components/OrderTable'
import OrderStatus from './components/OrderStatus'

const OrderInfoPage = () => {
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {Object.keys(orderInfo).length > 0 && !isLoading ? (
        <div className='d-flex flex-column flex-lg-row gap-7'>
          <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-lg-300px'>
            <OrderStatus />
          </div>
          <div className='flex-lg-row-fluid ms-lg-7 ms-xl-1 d-flex flex-column gap-7 gap-lg-10'>
            <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
              <OrderDetails />
              <OrderMember />
              <OrderCustomer />
            </div>
            <div className='d-flex flex-column gap-7 gap-lg-10'>
              <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                <OrderAddress />
                <OrderMedia />
              </div>
              <OrderTable />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default OrderInfoPage

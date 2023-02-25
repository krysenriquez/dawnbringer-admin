import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'

const OrderAddress = () => {
  const intl = useIntl()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {orderInfo && orderInfo.address && !isLoading ? (
        <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
          <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
            <img src='/media/icons/ecommerce/delivery.svg' className='w-175px' />
          </div>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Delivery Address</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <div className='d-flex align-items-center min-h-100'>
              <div>
                <h4>
                  {orderInfo.address.address1} {orderInfo.address.address2}
                </h4>
                <h4>
                  {orderInfo.address.city} {orderInfo.address.province} {orderInfo.address.zip}
                </h4>
                <h4>{orderInfo.address.country}</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
export default OrderAddress

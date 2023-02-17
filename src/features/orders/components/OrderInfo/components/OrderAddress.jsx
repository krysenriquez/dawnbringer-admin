import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'

const OrderAddress = () => {
  const intl = useIntl()
  const order = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {order && order.customer && order.customer.address && !isLoading ? (
        <>
          {order.customer.address.map((address) => {
            return (
              <div
                className='card card-flush py-4 flex-row-fluid overflow-hidden'
                key={address.addressType}
              >
                <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
                  <img
                    src={clsx({
                      '/media/icons/ecommerce/delivery.svg': address.addressType == 'SHIPPING',
                      '/media/icons/ecommerce/scroll.svg': address.addressType == 'BILLING',
                    })}
                    className='w-175px'
                  />
                </div>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>{intl.formatMessage({id: address.addressType})} Address</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  {address.address1} {address.address2}
                  <br />
                  {address.city} {address.province} {address.zip}
                  <br />
                  {address.country}
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <></>
      )}
    </>
  )
}
export default OrderAddress

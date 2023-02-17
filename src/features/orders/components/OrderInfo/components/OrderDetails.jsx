import {useIntl} from 'react-intl'
import {format} from 'date-fns'
import clsx from 'clsx'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const OrderDetails = () => {
  const intl = useIntl()
  const order = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {order && !isLoading ? (
        <div className='card card-flush py-4 flex-row-fluid'>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Order (#{order.orderNumber})</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <div className='table-responsive'>
              <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-250px'>
                <tbody className='fw-semibold text-gray-600'>
                  <tr>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <CustomSVG
                          className='svg-icon svg-icon-2 me-2'
                          path='/media/icons/general/calendar.svg'
                        />
                        Date Added
                      </div>
                    </td>
                    <td className='fw-bold text-end'>
                      {format(Date.parse(order.created), 'dd/MM/yyyy')}
                    </td>
                  </tr>
                  <tr>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <CustomSVG
                          className='svg-icon svg-icon-2 me-2'
                          path='/media/icons/finance/wallet.svg'
                        />
                        Payment Method
                      </div>
                    </td>
                    <td className='fw-bold text-end'>
                      {intl.formatMessage({id: order.paymentMethod})}
                    </td>
                  </tr>
                  <tr>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <CustomSVG
                          className='svg-icon svg-icon-2 me-2'
                          path='/media/icons/ecommerce/delivery.svg'
                        />
                        Delivery Method
                      </div>
                    </td>
                    <td className='fw-bold text-end'>
                      {intl.formatMessage({id: order.orderType})}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default OrderDetails

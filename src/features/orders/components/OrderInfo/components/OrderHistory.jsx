import {useIntl} from 'react-intl'
import clsx from 'clsx'
import {format} from 'date-fns'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'

const OrderHistory = () => {
  const intl = useIntl()
  const order = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {order && order.histories && !isLoading ? (
        <div className='card card-flush py-4'>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Order History</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <div className='table-responsive'>
              <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
                <thead>
                  <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                    <th className='min-w-100px'>Date Added</th>
                    <th className='min-w-175px'>Note</th>
                    <th className='min-w-70px'>Order Status</th>
                  </tr>
                </thead>
                <tbody className='fw-semibold text-gray-600'>
                  {order.histories.map((history) => {
                    return (
                      <tr key={history.id}>
                        <td>
                          {history.created &&
                            format(Date.parse(history.created), 'dd/MM/yyyy hh:mm:ss aa')}
                        </td>
                        <td>{history.orderNote}</td>
                        <td>
                          <div
                            className={clsx('badge', {
                              'badge-light-warning': history.orderStatus == 'PENDING',
                              'badge-light-info':
                                history.orderStatus == 'AWAITING_DELIVERY' ||
                                history.orderStatus == 'AWAITING_PICKUP' ||
                                history.orderStatus == 'ON_DELIVERY' ||
                                history.orderStatus == 'ON_PICKUP',
                              'badge-light-danger':
                                history.orderStatus == 'CANCELLED' ||
                                history.orderStatus == 'REFUNDED',
                              'badge-light-success': history.orderStatus == 'COMPLETED',
                            })}
                          >
                            {history.orderStatus ? (
                              intl.formatMessage({id: history.orderStatus})
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
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
export default OrderHistory

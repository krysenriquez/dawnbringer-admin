import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import {format} from 'date-fns'

const OrderHistory = ({history}) => {
  const [data, setData] = useState(history)
  const intl = useIntl()

  useEffect(() => {
    setData(history)
  }, [history])

  return (
    <div className='card card-flush py-4 flex-row-fluid'>
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
                <th className='min-w-175px'>Comment</th>
                <th className='min-w-70px'>Order Status</th>
              </tr>
            </thead>
            <tbody className='fw-semibold text-gray-600'>
              {data.map((history) => {
                return (
                  <tr key={history.created}>
                    <td>{format(Date.parse(history.created), 'dd/MM/yyyy hh:mm:ss aa')}</td>
                    <td>{history.comment}</td>
                    <td>
                      <div
                        className={clsx('badge', {
                          'badge-light-warning': history.order_status == 'PENDING',
                          'badge-light-info':
                            history.order_status == 'AWAITING_DELIVERY' ||
                            history.order_status == 'AWAITING_PICKUP' ||
                            history.order_status == 'ON_DELIVERY',
                          'badge-light-danger':
                            history.order_status == 'CANCELLED' ||
                            history.order_status == 'REFUNDED',
                          'badge-light-success': history.order_status == 'COMPLETED',
                        })}
                      >
                        {history.order_status ? (
                          intl.formatMessage({id: history.order_status})
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
  )
}
export {OrderHistory}

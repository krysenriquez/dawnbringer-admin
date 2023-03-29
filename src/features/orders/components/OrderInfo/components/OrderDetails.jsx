import {useIntl} from 'react-intl'
import {format} from 'date-fns'
import clsx from 'clsx'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import CustomCard from '@/components/elements/Card/CustomCard'
import Countdown from 'react-countdown'

const OrderDetails = () => {
  const intl = useIntl()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {orderInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid'
          hasHeader={true}
          header={<h2>Order (#{orderInfo.orderNumber})</h2>}
          bodyClassName='pt-0'
        >
          <div className='table-responsive'>
            <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-200px'>
              <tbody className='fw-semibold text-gray-600'>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/general/calendar.svg'
                      />
                      Order Date
                    </div>
                  </td>
                  <td className='fw-bold text-end'>
                    {orderInfo.orderDate &&
                      format(Date.parse(orderInfo.orderDate), 'dd/MM/yyyy hh:mm:ss')}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/general/hourglass.svg'
                      />
                      Remaining Prep Time
                    </div>
                  </td>
                  <td className='fw-bold text-end'>
                    {orderInfo.orderDate && orderInfo.currentOrderStage != 4 ? (
                      <Countdown
                        date={Date.parse(orderInfo.orderDate)}
                        overtime={true}
                        className={'text-' + orderInfo.remainingPrepTimeStatus}
                      />
                    ) : (
                      <></>
                    )}
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
                    {intl.formatMessage({id: orderInfo.paymentMethod})}
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
                    {intl.formatMessage({id: orderInfo.orderType})}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default OrderDetails

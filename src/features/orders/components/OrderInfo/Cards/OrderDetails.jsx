import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {format} from 'date-fns'

const OrderDetails = ({order}) => {
  const [data, setData] = useState(order)
  const intl = useIntl()

  useEffect(() => {
    setData(order)
  }, [order])

  return (
    <div className='card card-flush py-4 flex-row-fluid'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Order (#000001)</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='table-responsive'>
          <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
            <tbody className='fw-semibold text-gray-600'>
              <tr>
                <td className='text-muted'>
                  <div className='d-flex align-items-center'>
                    <CustomSVG
                      className='svg-icon svg-icon-2 me-2'
                      path='/public/media/icons/general/calendar.svg'
                    />
                    Date Added
                  </div>
                </td>
                <td className='fw-bold text-end'>
                  {format(Date.parse(data.created), 'dd/MM/yyyy')}
                </td>
              </tr>
              <tr>
                <td className='text-muted'>
                  <div className='d-flex align-items-center'>
                    <CustomSVG
                      className='svg-icon svg-icon-2 me-2'
                      path='/public/media/icons/finance/wallet.svg'
                    />
                    Payment Method
                  </div>
                </td>
                <td className='fw-bold text-end'>
                  {intl.formatMessage({id: data.payment_method})}
                </td>
              </tr>
              <tr>
                <td className='text-muted'>
                  <div className='d-flex align-items-center'>
                    <CustomSVG
                      className='svg-icon svg-icon-2 me-2'
                      path='/public/media/icons/ecommerce/delivery.svg'
                    />
                    Delivery Method
                  </div>
                </td>
                <td className='fw-bold text-end'>{intl.formatMessage({id: data.order_type})}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export {OrderDetails}

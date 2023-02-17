import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const OrderCustomer = () => {
  const order = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {order && order.customer && !isLoading ? (
        <div className='card card-flush py-4 flex-row-fluid'>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Customer</h2>
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
                          path='/media/icons/communication/user.svg'
                        />
                        Customer
                      </div>
                    </td>
                    <td className='fw-bold text-end'>{order.customer.name}</td>
                  </tr>
                  <tr>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <CustomSVG
                          className='svg-icon svg-icon-2 me-2'
                          path='/media/icons/communication/mail.svg'
                        />
                        Email
                      </div>
                    </td>
                    <td className='fw-bold text-end'>{order.customer.emailAddress}</td>
                  </tr>
                  <tr>
                    <td className='text-muted'>
                      <div className='d-flex align-items-center'>
                        <CustomSVG
                          className='svg-icon svg-icon-2 me-2'
                          path='/media/icons/communication/mobile.svg'
                        />
                        Phone
                      </div>
                    </td>
                    <td className='fw-bold text-end'>{order.customer.contactNumber}</td>
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
export default OrderCustomer

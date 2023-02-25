import {useNavigate} from 'react-router-dom'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import CustomCard from '@/components/elements/Card/CustomCard'

const OrderCustomer = () => {
  const navigate = useNavigate()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  const handleClick = (e) => {
    navigate(`/customers/` + e.customerNumber, {
      state: {customerNumber: e.customerNumber},
    })
  }

  return (
    <>
      {orderInfo && orderInfo.customer && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid'
          hasHeader={true}
          header={<h2>Customer</h2>}
          bodyClassName='pt-0'
        >
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
                  <td className='fw-bold text-end'>
                    <button
                      className='btn btn-flush btn-link btn-color-gray-700 btn-active-color-primary fw-bold text-end'
                      onClick={() => handleClick(orderInfo.customer)}
                    >
                      {orderInfo.customer.name}
                    </button>
                  </td>
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
                  <td className='fw-bold text-end'>{orderInfo.customer.emailAddress}</td>
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
                  <td className='fw-bold text-end'>{orderInfo.customer.contactNumber}</td>
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
export default OrderCustomer

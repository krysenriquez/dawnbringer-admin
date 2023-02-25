import {useNavigate} from 'react-router-dom'
import {toCurrency} from '@/utils/toCurrency'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const OrderTable = () => {
  const navigate = useNavigate()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  const handleClick = (e) => {
    navigate(`/product-variants/` + e.variantSku, {
      state: {sku: e.variantSku},
    })
  }

  return (
    <>
      {orderInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid overflow-hidden'
          hasHeader={true}
          header={<h2>Details</h2>}
          bodyClassName='pt-0'
        >
          <div className='table-responsive'>
            <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
              <thead>
                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                  <th className='min-w-175px'>Product</th>
                  <th className='min-w-100px text-end'>SKU</th>
                  <th className='min-w-70px text-end'>Qty</th>
                  <th className='min-w-100px text-end'>Unit Price</th>
                  <th className='min-w-100px text-end'>Total</th>
                </tr>
              </thead>
              <tbody className='fw-semibold text-gray-600'>
                {orderInfo.details.map((detail) => {
                  return (
                    <tr key={detail.variantSku}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-50px me-5 ps-4'>
                            <img
                              src={`${
                                detail.variantThumbnail ? detail.variantThumbnail : defaultThumbnail
                              }`}
                              className=''
                              alt=''
                            />
                          </div>
                          <div className='ms-5'>
                            <button
                              className='btn btn-flush btn-link btn-color-gray-700 btn-active-color-primary fw-bold text-end'
                              onClick={() => handleClick(detail)}
                            >
                              {detail.variantName}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>{detail.variantSku}</td>
                      <td className='text-end'>{detail.quantity}</td>
                      <td className='text-end'>{toCurrency(detail.amount)}</td>
                      <td className='text-end'>{toCurrency(detail.totalAmount)}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan={4} className='text-end'>
                    Subtotal
                  </td>
                  <td className='text-end'>
                    {toCurrency(
                      orderInfo.details.reduce((a, v) => (a = a + parseFloat(v.totalAmount)), 0)
                    )}
                  </td>
                </tr>
                {orderInfo.fees.map((fee) => {
                  return (
                    <tr key={fee.feeType}>
                      <td colSpan={4} className='text-end'>
                        {fee.feeType}
                      </td>
                      <td className='text-end'>{toCurrency(fee.amount)}</td>
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan={4} className='fs-3 text-dark text-end'>
                    Grand Total
                  </td>
                  <td className='text-dark fs-3 fw-bolder text-end'>
                    {toCurrency(orderInfo.totalAmount)}
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
export default OrderTable

import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {toCurrency} from '@/utils/toCurrency'

const OrderTable = ({order}) => {
  const [data, setData] = useState(order)
  const intl = useIntl()

  useEffect(() => {
    setData(order)
  }, [order])

  return (
    <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Details</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
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
              {order.details.map((detail) => {
                return (
                  <tr key={detail.product_variant_sku}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <a
                          href='/metronic8/demo6/../demo6/apps/ecommerce/catalog/edit-product.html'
                          className='symbol symbol-50px'
                        >
                          <span
                            className='symbol-label'
                            style={{
                              backgroundImage:
                                'url(/metronic8/demo6/assets/media//stock/ecommerce/1.gif)',
                            }}
                          />
                        </a>
                        <div className='ms-5'>
                          <a
                            href='/metronic8/demo6/../demo6/apps/ecommerce/catalog/edit-product.html'
                            className='fw-bold text-gray-600 text-hover-primary'
                          >
                            {detail.product_variant_name}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className='text-end'>{detail.product_variant_sku}</td>
                    <td className='text-end'>{detail.quantity}</td>
                    <td className='text-end'>{toCurrency(detail.amount)}</td>
                    <td className='text-end'>{toCurrency(detail.total_amount)}</td>
                  </tr>
                )
              })}
              <tr>
                <td colSpan={4} className='text-end'>
                  Subtotal
                </td>
                <td className='text-end'>
                  {toCurrency(
                    order.details.reduce((a, v) => (a = a + parseFloat(v.total_amount)), 0)
                  )}
                </td>
              </tr>
              {order.fees.map((fee) => {
                return (
                  <tr key={fee.fee_type}>
                    <td colSpan={4} className='text-end'>
                      {fee.fee_type}
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
                  {toCurrency(order.total_amount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export {OrderTable}

import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {toCurrency} from '@/utils/toCurrency'
import {useThemeMode} from '@/providers/ThemeModeProvider'

const OrderTable = ({order}) => {
  const intl = useIntl()
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
                const theme = useThemeMode()
                const defaultThumbnail =
                  `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
                const [thumbnail, setThumbnail] = useState({})
                const [hasNoThumbnail, setHasNoThumbnail] = useState(false)
                useEffect(() => {
                  if (detail.product_variant_thumbnail) {
                    setThumbnail(detail.product_variant_thumbnail)
                    setHasNoThumbnail(false)
                  } else {
                    setThumbnail(defaultThumbnail)
                    setHasNoThumbnail(true)
                  }
                }, [detail])

                useEffect(() => {
                  if (hasNoThumbnail) {
                    setThumbnail(defaultThumbnail)
                  }
                }, [theme])

                return (
                  <tr key={detail.product_variant_sku}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='symbol symbol-50px me-5 ps-4'>
                          <img src={`${thumbnail}`} className='' alt='' />
                        </div>
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

import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const OrderDocuments = ({order}) => {
  return (
    <div className='card card-flush py-4 flex-row-fluid'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Documents</h2>
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
                      path='/media/icons/ecommerce/scroll.svg'
                    />
                    Invoice
                  </div>
                </td>
                <td className='fw-bold text-end'>
                  <a
                    href='/metronic8/demo6/../demo6/apps/invoices/view/invoice-3.html'
                    className='text-gray-600 text-hover-primary'
                  >
                    #INV-000414
                  </a>
                </td>
              </tr>
              <tr>
                <td className='text-muted'>
                  <div className='d-flex align-items-center'>
                    <CustomSVG
                      className='svg-icon svg-icon-2 me-2'
                      path='/media/icons/ecommerce/delivery.svg'
                    />
                    Shipping
                  </div>
                </td>
                <td className='fw-bold text-end'>
                  <a href='#' className='text-gray-600 text-hover-primary'>
                    #SHP-0025410
                  </a>
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-center' colSpan={2}>
                  <a href='#' className='text-gray-600 text-hover-primary'>
                    View Attachments
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export {OrderDocuments}

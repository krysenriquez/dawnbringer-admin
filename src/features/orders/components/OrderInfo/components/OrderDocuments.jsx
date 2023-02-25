import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import CustomCard from '@/components/elements/Card/CustomCard'
import OrderAttachments from './OrderAttachments'

const ViewAttachments = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-700px',
    title: 'Attachments',
  }

  return (
    <CustomModal {...value}>
      <OrderAttachments />
    </CustomModal>
  )
}

const OrderDocuments = () => {
  const navigate = useNavigate()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleClick = (accountId) => {
    navigate(`/members/` + accountId, {
      state: {accountId: accountId},
    })
  }

  return (
    <>
      {orderInfo && !isLoading && (
        <>
          <CustomCard
            cardClassName='card-flush py-4 flex-row-fluid'
            hasHeader={true}
            header={<h2>Attachments</h2>}
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
                          path='/media/icons/general/link.svg'
                        />
                        Code
                      </div>
                    </td>
                    <td className='fw-bold text-end'>
                      <button
                        className='btn btn-flush btn-link btn-color-gray-700 btn-active-color-primary fw-bold text-end'
                        onClick={() => handleClick(orderInfo.codeAccount)}
                      >
                        {orderInfo.code}
                      </button>
                    </td>
                  </tr>
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
                  {/* <tr>
                <td className='fw-bold text-center' colSpan={2}>
                  <button className='btn btn-flush' onClick={() => toggleModal()}>
                    <span className='fw-bold text-gray-600 text-hover-primary'>
                      View Attachments
                    </span>
                  </button>
                </td>
              </tr> */}
                </tbody>
              </table>
            </div>
          </CustomCard>
          {isModalOpen && <ViewAttachments isModalOpen={isModalOpen} toggleModal={toggleModal} />}
        </>
      )}
    </>
  )
}
export default OrderDocuments

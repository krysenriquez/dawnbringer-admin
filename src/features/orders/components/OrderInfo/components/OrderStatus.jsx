import {useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import {format} from 'date-fns'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import OrderStatusForm from './OrderStatusForm'
import {OrderStatusProvider} from '@/features/orders/stores/OrderStatusProvider'
import classnames from 'classnames'
import CustomCard from '@/components/elements/Card/CustomCard'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProcessOrder = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-500px',
    title: 'Process Order',
  }

  return (
    <CustomModal {...value}>
      <OrderStatusProvider>
        <OrderStatusForm />
      </OrderStatusProvider>
    </CustomModal>
  )
}

const OrderStatus = () => {
  const intl = useIntl()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {permissions} = usePermissions()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {orderInfo && orderInfo.histories && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4'
          hasHeader={true}
          header={<h2>History</h2>}
          hasToolbar={
            getRolePermission({
              moduleName: 'Orders Management',
              permissions: permissions,
              permission: 'canUpdate',
            }) && orderInfo.currentOrderStage < 4
          }
          toolbarButtonName='Process'
          handleToolbarButtonClick={toggleModal}
          bodyClassName='pt-0'
        >
          <div className='timeline ms-n1'>
            {orderInfo.histories.map((history, index) => {
              return (
                <div className='timeline-item align-items-center mb-4' key={history.id}>
                  <div className='timeline-line w-20px mt-12 mb-n14' />
                  <div className='timeline-icon pt-1' style={{marginLeft: '0.7px'}}>
                    <CustomSVG
                      className={clsx('svg-icon svg-icon-2', {
                        'svg-icon-warning': history.orderStatus == 'PENDING',
                        'svg-icon-info':
                          history.orderStatus == 'AWAITING_DELIVERY' ||
                          history.orderStatus == 'AWAITING_PICKUP' ||
                          history.orderStatus == 'ON_DELIVERY' ||
                          history.orderStatus == 'ON_PICKUP',
                        'svg-icon-danger':
                          history.orderStatus == 'CANCELLED' || history.orderStatus == 'REFUNDED',
                        'svg-icon-success': history.orderStatus == 'COMPLETED',
                      })}
                      path='/media/icons/general/circle-full.svg'
                    />
                  </div>
                  <div className='timeline-content m-0'>
                    <span
                      className={clsx('fs-8 fw-bolder text-uppercase', {
                        'text-warning': history.orderStatus == 'PENDING',
                        'text-primary':
                          history.orderStatus == 'AWAITING_DELIVERY' ||
                          history.orderStatus == 'AWAITING_PICKUP' ||
                          history.orderStatus == 'ON_DELIVERY' ||
                          history.orderStatus == 'ON_PICKUP',
                        'text-danger':
                          history.orderStatus == 'CANCELLED' || history.orderStatus == 'REFUNDED',
                        'text-success': history.orderStatus == 'COMPLETED',
                      })}
                    >
                      {intl.formatMessage({id: history.orderStatus})}
                    </span>
                    <span
                      className={classnames('fs-6 fw-bold d-block', {
                        'text-gray-800': index === 0,
                        'text-gray-400': index !== 0,
                      })}
                    >
                      {history.orderNote}
                    </span>
                    <span className='fs-7 text-gray-400 fw-bold d-block'>{history.comment}</span>
                    <span className='fw-semibold text-gray-400'>
                      {history.created &&
                        format(Date.parse(history.created), 'dd/MM/yyyy hh:mm:ss aa')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
      {isModalOpen && <ProcessOrder isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </>
  )
}

export default OrderStatus

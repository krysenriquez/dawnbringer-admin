import {useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import {format} from 'date-fns'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import SupplyStatusForm from './Forms/SupplyStatusForm'
import classnames from 'classnames'
import CustomCard from '@/components/elements/Card/CustomCard'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProcessSupplyStatus = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-500px',
    title: 'Process Supply',
  }

  return (
    <CustomModal {...value}>
      <SupplyStatusForm />
    </CustomModal>
  )
}

const SupplyStatus = () => {
  const intl = useIntl()
  const supplyInfo = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {permissions} = usePermissions()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {supplyInfo && supplyInfo.histories && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4'
          hasHeader={true}
          header={<h2>History</h2>}
          hasToolbar={
            getRolePermission({
              moduleName: 'Supplies Management',
              permissions: permissions,
              permission: 'canUpdate',
            }) &&
            supplyInfo.currentSupplyStage < 5 &&
            supplyInfo.canUpdateSupplyStatus
          }
          toolbarButtonName='Process'
          handleToolbarButtonClick={toggleModal}
          bodyClassName='pt-0'
        >
          <>
            <div className='timeline ms-n1'>
              {supplyInfo.histories.map((history, index) => {
                return (
                  <div className='timeline-item align-items-center mb-4' key={history.id}>
                    <div className='timeline-line w-20px mt-12 mb-n14' />
                    <div className='timeline-icon pt-1' style={{marginLeft: '0.7px'}}>
                      <CustomSVG
                        className={clsx('svg-icon svg-icon-2', {
                          'svg-icon-warning': history.supplyStatus == 'PENDING',
                          'svg-icon-primary':
                            history.supplyStatus == 'REQUEST_RECEIVED' ||
                            history.supplyStatus == 'BACK_ORDERED',
                          'svg-icon-info':
                            history.supplyStatus == 'PREPARING' ||
                            history.supplyStatus == 'IN_TRANSIT',
                          'svg-icon-danger':
                            history.supplyStatus == 'CANCELLED' || history.supplyStatus == 'DENIED',
                          'svg-icon-success': history.supplyStatus == 'DELIVERED',
                        })}
                        path='/media/icons/general/circle-full.svg'
                      />
                    </div>
                    <div className='timeline-content m-0'>
                      <span
                        className={clsx('fs-8 fw-bolder text-uppercase', {
                          'text-warning': history.supplyStatus == 'PENDING',
                          'text-primary':
                            history.supplyStatus == 'REQUEST_RECEIVED' ||
                            history.supplyStatus == 'BACK_ORDERED',
                          'text-info':
                            history.supplyStatus == 'PREPARING' ||
                            history.supplyStatus == 'IN_TRANSIT',
                          'text-danger':
                            history.supplyStatus == 'CANCELLED' ||
                            history.supplyStatus == 'REFUNDED',
                          'text-success': history.supplyStatus == 'DELIVERED',
                        })}
                      >
                        {intl.formatMessage({id: history.supplyStatus})}
                      </span>
                      <span
                        className={classnames('fs-6 fw-bold d-block', {
                          'text-gray-800': index === 0,
                          'text-gray-400': index !== 0,
                        })}
                      >
                        {history.supplyNote}
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
          </>
        </CustomCard>
      ) : (
        <></>
      )}
      {isModalOpen && <ProcessSupplyStatus isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </>
  )
}

export default SupplyStatus

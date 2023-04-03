import {useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import CustomCard from '@/components/elements/Card/CustomCard'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useBranchInfoQueryData,
  useBranchInfoQueryLoading,
} from '@/features/branches/stores/BranchesInfoQueryProvider'
import BranchEditForm from '../../BranchEdit/BranchEditForm'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProcessBranchEdit = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Update Branch',
  }

  return (
    <CustomModal {...value}>
      <BranchEditForm />
    </CustomModal>
  )
}

const BranchDetails = () => {
  const intl = useIntl()
  const branchInfo = useBranchInfoQueryData()
  const isLoading = useBranchInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {permissions} = usePermissions()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {branchInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          hasToolbar={getRolePermission({
            moduleName: 'User Management',
            permissions: permissions,
            permission: 'canUpdate',
          })}
          toolbarButtonName='Edit'
          handleToolbarButtonClick={toggleModal}
          bodyClassName='pt-0'
        >
          <div className='py-5 fs-6'>
            <div className='fw-bold'>Branch Name</div>
            <div className='text-gray-600'>
              {branchInfo.branchName ? branchInfo.branchName : '--'}
            </div>
            <div className='fw-bold mt-5'>Contact Number</div>
            <div className='text-gray-600'>{branchInfo.phone ? branchInfo.phone : '--'}</div>
            <div className='fw-bold mt-5'>Email Address</div>
            <div className='text-gray-600'>
              {branchInfo.emailAddress ? branchInfo.emailAddress : '--'}
            </div>
            <div className='fw-bold mt-5'>Address</div>
            <div className='text-gray-600'>
              {branchInfo.address1 ||
              branchInfo.address2 ||
              branchInfo.city ||
              branchInfo.zip ||
              branchInfo.province ||
              branchInfo.country ? (
                <div>
                  {branchInfo.address1} {branchInfo.address2} <br />
                  {branchInfo.city} {branchInfo.zip}
                  <br />
                  {branchInfo.province} {branchInfo.country}
                </div>
              ) : (
                '--'
              )}
            </div>
            <div className='d-flex flex-stack mt-5'>
              <div className='fw-bold'>Is Main Branch</div>
              <CustomSVG
                path={
                  branchInfo.isMain
                    ? '/media/icons/general/check.svg'
                    : '/media/icons/general/cross.svg'
                }
                className={clsx('svg-icon-2', {
                  'svg-icon-success': branchInfo.isMain,
                  'svg-icon-danger': !branchInfo.isMain,
                })}
              />
            </div>
            <div className='d-flex flex-stack mt-5'>
              <div className='fw-bold'>Can Deliver</div>
              <CustomSVG
                path={
                  branchInfo.canDeliver
                    ? '/media/icons/general/check.svg'
                    : '/media/icons/general/cross.svg'
                }
                className={clsx('svg-icon-2', {
                  'svg-icon-success': branchInfo.canDeliver,
                  'svg-icon-danger': !branchInfo.canDeliver,
                })}
              />
            </div>
            <div className='d-flex flex-stack mt-5'>
              <div className='fw-bold'>Can Supply</div>
              <CustomSVG
                path={
                  branchInfo.canSupply
                    ? '/media/icons/general/check.svg'
                    : '/media/icons/general/cross.svg'
                }
                className={clsx('svg-icon-2', {
                  'svg-icon-success': branchInfo.canSupply,
                  'svg-icon-danger': !branchInfo.canSupply,
                })}
              />
            </div>
            <div className='d-flex flex-stack mt-5'>
              <div className='fw-bold'>Active</div>
              <CustomSVG
                path={
                  branchInfo.isActive
                    ? '/media/icons/general/check.svg'
                    : '/media/icons/general/cross.svg'
                }
                className={clsx('svg-icon-2', {
                  'svg-icon-success': branchInfo.isActive,
                  'svg-icon-danger': !branchInfo.isActive,
                })}
              />
            </div>
          </div>
          {isModalOpen && <ProcessBranchEdit isModalOpen={isModalOpen} toggleModal={toggleModal} />}
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default BranchDetails

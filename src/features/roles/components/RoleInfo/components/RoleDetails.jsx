import {useState} from 'react'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import CustomCard from '@/components/elements/Card/CustomCard'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useRoleInfoQueryData,
  useRoleInfoQueryLoading,
} from '@/features/roles/stores/RoleInfoQueryProvider'
import {RolePermissionsUpdateProvider} from '@/features/roles/stores/RolePermissionsUpdateProvider'
import RolePermissionsUpdateForm from './Forms/RolePermissionsUpdateForm'

const ProcessRoleEdit = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-750px',
    title: 'Update Role Permissions',
  }

  return (
    <CustomModal {...value}>
      <RolePermissionsUpdateProvider>
        <RolePermissionsUpdateForm />
      </RolePermissionsUpdateProvider>
    </CustomModal>
  )
}

const RoleDetails = () => {
  const intl = useIntl()
  const userTypeInfo = useRoleInfoQueryData()
  const isLoading = useRoleInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {userTypeInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>{userTypeInfo.userTypeName}</h2>}
          hasToolbar={true}
          toolbarButtonName='Edit'
          handleToolbarButtonClick={toggleModal}
          bodyClassName='pt-0'
        >
          <div className='d-flex flex-column text-gray-600'>
            {userTypeInfo.permissions &&
              userTypeInfo.permissions.map((permission) => {
                return (
                  <>
                    {permission.moduleName &&
                    (permission.canCreate || permission.canRetrieve || permission.canUpdate) ? (
                      <div className='mb-3' key={permission.moduleName}>
                        <label className='text-gray-800 fw-bold fs-6 mb-1'>
                          {permission.moduleName}
                        </label>
                        <div className='d-flex flex-stack ps-5'>
                          <div className='fw-bold'>Create</div>
                          <CustomSVG
                            path={
                              permission.canCreate
                                ? '/media/icons/general/check.svg'
                                : '/media/icons/general/cross.svg'
                            }
                            className={clsx('svg-icon-2', {
                              'svg-icon-success': permission.canCreate,
                              'svg-icon-danger': !permission.canCreate,
                            })}
                          />
                        </div>
                        <div className='d-flex flex-stack ps-5'>
                          <div className='fw-bold'>Read</div>
                          <CustomSVG
                            path={
                              permission.canRetrieve
                                ? '/media/icons/general/check.svg'
                                : '/media/icons/general/cross.svg'
                            }
                            className={clsx('svg-icon-2', {
                              'svg-icon-success': permission.canRetrieve,
                              'svg-icon-danger': !permission.canRetrieve,
                            })}
                          />
                        </div>
                        <div className='d-flex flex-stack ps-5'>
                          <div className='fw-bold'>Write</div>
                          <CustomSVG
                            path={
                              permission.canUpdate
                                ? '/media/icons/general/check.svg'
                                : '/media/icons/general/cross.svg'
                            }
                            className={clsx('svg-icon-2', {
                              'svg-icon-success': permission.canUpdate,
                              'svg-icon-danger': !permission.canUpdate,
                            })}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )
              })}
          </div>
          {isModalOpen && <ProcessRoleEdit isModalOpen={isModalOpen} toggleModal={toggleModal} />}
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default RoleDetails

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
                        {permission.canCreate && (
                          <div className='d-flex align-items-center'>
                            <span className='bullet bg-success me-3'></span>
                            <span className='text-gray-700'>Create</span>
                          </div>
                        )}
                        {permission.canRetrieve && (
                          <div className='d-flex align-items-center'>
                            <span className='bullet bg-success me-3'></span>
                            <span className='text-gray-700'>Read</span>
                          </div>
                        )}
                        {permission.canUpdate && (
                          <div className='d-flex align-items-center'>
                            <span className='bullet bg-success me-3'></span>
                            <span className='text-gray-700'>Write</span>
                          </div>
                        )}
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

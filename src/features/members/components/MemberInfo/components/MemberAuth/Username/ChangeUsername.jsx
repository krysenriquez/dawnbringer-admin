import {useEffect, useState} from 'react'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useMemberUserInfoQueryData,
  useMemberUserInfoQueryLoading,
} from '@/features/members/stores/MemberUserInfoQueryProviders'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import ChangeUsernameForm from './Form/ChangeUsernameForm'

const ProcessChangeUsername = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Update Username',
  }

  return (
    <CustomModal {...value}>
      <ChangeUsernameForm />
    </CustomModal>
  )
}

const ChangeUsername = () => {
  const memberInfo = useMemberUserInfoQueryData()
  const isLoading = useMemberUserInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {Object.keys(memberInfo).length > 0 && !isLoading ? (
        <div className='d-flex flex-wrap align-items-center'>
          <>
            <div>
              <div className='fs-6 fw-bold mb-1'>Username</div>
              <div className='fs-6 fw-semibold text-gray-600'>{memberInfo?.user?.username}</div>
            </div>
            <div className='ms-auto'>
              <ActionCell
                handleClick={toggleModal}
                className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto'
              >
                <CustomSVG path='/media/icons/actions/write.svg' className='svg-icon-2' />
              </ActionCell>
            </div>
          </>
          {isModalOpen && (
            <ProcessChangeUsername isModalOpen={isModalOpen} toggleModal={toggleModal} />
          )}
        </div>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default ChangeUsername

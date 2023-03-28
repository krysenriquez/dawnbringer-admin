import {useState} from 'react'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {useAuth} from '@/providers/AuthProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import ChangeEmailAddressForm from './Form/ChangeEmailAddressForm'

const ProcessChangeEmailAddress = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Update Email Address',
  }

  return (
    <CustomModal {...value}>
      <ChangeEmailAddressForm />
    </CustomModal>
  )
}

const ChangeEmailAddress = () => {
  const {currentUser} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <>
        <div>
          <div className='fs-6 fw-bold mb-1'>Email Address</div>
          <div className='fs-6 fw-semibold text-gray-600'>{currentUser?.emailAddress}</div>
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
        <ProcessChangeEmailAddress isModalOpen={isModalOpen} toggleModal={toggleModal} />
      )}
    </div>
  )
}

export default ChangeEmailAddress

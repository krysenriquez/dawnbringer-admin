import {useState} from 'react'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import ChangePasswordForm from './Form/ChangePasswordForm'

const ProcessChangePassword = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Update Password',
  }

  return (
    <CustomModal {...value}>
      <ChangePasswordForm />
    </CustomModal>
  )
}

const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <>
        <div>
          <div className='fs-6 fw-bold mb-1'>Password</div>
          <div className='fs-6 fw-semibold text-gray-600'>************</div>
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
      {isModalOpen && <ProcessChangePassword isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </div>
  )
}

export default ChangePassword

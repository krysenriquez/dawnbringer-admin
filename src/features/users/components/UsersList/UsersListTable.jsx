import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {useUsersListQueryData, useUsersListQueryLoading} from '../../stores/UsersListQueryProvider'
import {UserCreateProvider} from '../../stores/UserCreateProvider'
import usersColumn from './UsersListColumn'
import UserCreateForm from '../UserCreate/UserCreateForm'

const ProcessUserCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Create User',
  }

  return (
    <CustomModal {...value}>
      <UserCreateProvider>
        <UserCreateForm />
      </UserCreateProvider>
    </CustomModal>
  )
}

const UsersListTable = () => {
  const users = useUsersListQueryData()
  const isLoading = useUsersListQueryLoading() 
  const tableData = useMemo(() => users, [users])
  const tableColumns = useMemo(() => usersColumn, [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: true,
              toolbarButtonName: 'Add User',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
        {isModalOpen && <ProcessUserCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />}
      </CustomCardWithoutHeader>
    </>
  )
}

export default UsersListTable

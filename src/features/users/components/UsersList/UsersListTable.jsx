import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {useUsersListQueryData, useUsersListQueryLoading} from '../../stores/UsersListQueryProvider'
import usersColumn from './UsersListColumn'
// import BranchCreateModal from '../BranchCreate/BranchCreateModal'

const UsersListTable = () => {
  const navigate = useNavigate()
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
        {/* {isModalOpen && <BranchCreateModal isModalOpen={isModalOpen} toggleModal={toggleModal} />} */}
      </CustomCardWithoutHeader>
    </>
  )
}

export default UsersListTable

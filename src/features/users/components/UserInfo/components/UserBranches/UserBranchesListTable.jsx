import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useUserInfoQueryData,
  useUserInfoQueryLoading,
} from '@/features/users/stores/UserInfoQueryProvider'
import branchesColumn from './UserBranchesListColumn'
import {UserBranchesUpdateProvider} from '@/features/users/stores/UserUpdateBranchesProvider'
import UserBranchesUpdateForm from '../Forms/UserBranchesUpdateForm'

const ProcessUserBranchesUpdate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-700px',
    title: 'Update User Branches',
  }

  return (
    <CustomModal {...value}>
      <UserBranchesUpdateProvider>
        <UserBranchesUpdateForm />
      </UserBranchesUpdateProvider>
    </CustomModal>
  )
}

const UserBranchesListTable = () => {
  const navigate = useNavigate()
  const userInfo = useUserInfoQueryData()
  const isLoading = useUserInfoQueryLoading()
  const [userInfoBranches, setUserInfoBranches] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (userInfo) {
      setUserInfoBranches(userInfo.branchAssignment.branch)
    }
  }, [userInfo])

  const tableData = useMemo(() => userInfoBranches, [userInfoBranches])
  const tableColumns = useMemo(() => branchesColumn, [])

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
              toolbarButtonName: 'Update User Branches',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
      </CustomCardWithoutHeader>
      {isModalOpen && (
        <ProcessUserBranchesUpdate isModalOpen={isModalOpen} toggleModal={toggleModal} />
      )}
    </>
  )
}

export default UserBranchesListTable

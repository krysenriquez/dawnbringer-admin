import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useBranchesListQueryData,
  useBranchesListQueryLoading,
} from '@/features/branches/stores/BranchesListQueryProvider'
import branchesColumn from './BranchesListColumn'
import BranchCreateForm from '../BranchCreate/BranchCreateForm'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProcessBranchCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Create Branch',
  }

  return (
    <CustomModal {...value}>
      <BranchCreateForm />
    </CustomModal>
  )
}

const BranchesListTable = () => {
  const navigate = useNavigate()
  const branches = useBranchesListQueryData()
  const isLoading = useBranchesListQueryLoading()
  const tableData = useMemo(() => branches, [branches])
  const tableColumns = useMemo(() => branchesColumn, [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {permissions} = usePermissions()

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
              hasToolbar: getRolePermission({
                moduleName: 'User Management',
                permissions: permissions,
                permission: 'canCreate',
              }),
              toolbarButtonName: 'Add Branch',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
        {isModalOpen && <ProcessBranchCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />}
      </CustomCardWithoutHeader>
    </>
  )
}

export default BranchesListTable

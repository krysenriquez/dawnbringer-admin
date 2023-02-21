import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useBranchesListQueryData,
  useBranchesListQueryLoading,
} from '@/features/settings/stores/BranchesListQueryProvider'
import branchesColumn from './BranchesListColumn'

const BranchesListTable = () => {
  const branches = useBranchesListQueryData()
  const isLoading = useBranchesListQueryLoading()
  const tableData = useMemo(() => branches, [branches])
  const tableColumns = useMemo(() => branchesColumn, [])
  const navigate = useNavigate()

  const createProduct = () => {
    navigate(`/settings/branches/create`)
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
              toolbarButtonName: 'Add Branch',
              handleToolbarButtonClick: createProduct,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
      </CustomCardWithoutHeader>
    </>
  )
}

export default BranchesListTable

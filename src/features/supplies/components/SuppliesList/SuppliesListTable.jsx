import {useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useSuppliesListQueryData,
  useSuppliesListQueryLoading,
} from '../../stores/SuppliesListQueryProvider'
import suppliesColumn from './SuppliesListColumn'

const SuppliesListTable = () => {
  const supplies = useSuppliesListQueryData()
  const isLoading = useSuppliesListQueryLoading()
  const tableData = useMemo(() => supplies, [supplies])
  const tableColumns = useMemo(() => suppliesColumn, [])
  const navigate = useNavigate()

  const createSupply = () => {
    navigate(`/supplies/create`)
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
              toolbarButtonName: 'Create Supply',
              handleToolbarButtonClick: createSupply,
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

export default SuppliesListTable

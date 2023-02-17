import {useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
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
      <CustomCard>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: true,
              toolbarButtonName: 'Create Supply',
              handletoolbarButtonClick: createSupply,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}

export default SuppliesListTable

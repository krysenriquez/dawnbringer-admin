import {useMemo} from 'react'
import CustomCard from '@/components/elements/Card/CustomCard'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useCashoutsListQueryData,
  useCashoutsListQueryLoading,
} from '../../stores/CashoutsListQueryProvider'
import cashoutsColumn from './CashoutsColumn'

const CashoutsListTable = () => {
  const cashouts = useCashoutsListQueryData()
  const isLoading = useCashoutsListQueryLoading()

  const tableData = useMemo(() => cashouts, [cashouts])
  const tableColumns = useMemo(() => cashoutsColumn, [])

  return (
    <>
      <CustomCard>
        <CustomTable
          {...{
            data: tableData,
            columns: tableColumns,
            hasToolbar: false,
          }}
        />
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}

export default CashoutsListTable

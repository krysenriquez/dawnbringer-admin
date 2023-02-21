import {useMemo} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useCustomersListQueryData,
  useCustomersListQueryLoading,
} from '@/features/customers/stores/CustomersListQueryProvider'
import customersColumn from './CustomersListColumn'

const CustomersListTable = () => {
  const customers = useCustomersListQueryData()
  const isLoading = useCustomersListQueryLoading()
  const tableData = useMemo(() => customers, [customers])
  const tableColumns = useMemo(() => customersColumn, [])

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: false,
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

export default CustomersListTable

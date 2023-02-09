import {useEffect, useMemo} from 'react'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  OrdersListQueryProvider,
  useOrdersListQueryData,
  useOrdersListQueryLoading,
} from './OrdersListQueryProvider'
import ordersColumn from './OrdersListColumn'

const OrdersListPage = () => {
  const orders = useOrdersListQueryData()
  const isLoading = useOrdersListQueryLoading()

  const tableData = useMemo(() => orders, [orders])
  const tableColumns = useMemo(() => ordersColumn, [])

  return (
    <>
      <CustomCard>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
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

const OrdersListWrapper = () => {
  return (
    <>
      <OrdersListQueryProvider>
        <OrdersListPage />
      </OrdersListQueryProvider>
    </>
  )
}

export {OrdersListWrapper}

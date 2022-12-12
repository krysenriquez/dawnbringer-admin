import {useEffect, useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  OrdersListQueryProvider,
  useOrdersListQueryData,
  useOrdersListQueryLoading,
} from './OrdersList/OrdersListQueryProvider'
import ordersColumn from './OrdersList/OrdersListColumn'

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
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Orders List'>
        {intl.formatMessage({id: 'MENU.ORDERS'})}
      </PageTitle>
      <OrdersListQueryProvider>
        <OrdersListPage />
      </OrdersListQueryProvider>
    </>
  )
}

export {OrdersListWrapper}

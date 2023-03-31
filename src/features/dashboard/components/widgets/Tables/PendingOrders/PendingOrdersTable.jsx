import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import ordersColumn from './PendingOrdersColumn'

const PendingOrdersTable = () => {
  const navigate = useNavigate()
  const {pendingOrdersList} = useDashboard()
  const tableData = useMemo(() => pendingOrdersList, [pendingOrdersList])
  const tableColumns = useMemo(() => ordersColumn, [])

  const handleClick = (e) => {
    navigate(`/orders/` + e.orderId, {
      state: {orderId: e.orderId},
    })
  }

  return (
    <>
      <CustomCardWithoutHeader className='card card-flush overflow-hidden h-md-100'>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <span className='card-label fw-bold text-dark'>Pending Orders</span>,
              handleClick: handleClick,
            }}
          />
        ) : (
          <></>
        )}
        {!pendingOrdersList && <TableLoading />}
      </CustomCardWithoutHeader>
    </>
  )
}

export default PendingOrdersTable

import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useCustomerInfoQueryData,
  useCustomerInfoQueryLoading,
} from '@/features/customers/stores/CustomerInfoQueryProvider'
import ordersColumn from './CustomerOrdersColumn'

const CustomerOrdersTable = () => {
  const navigate = useNavigate()
  const customerInfo = useCustomerInfoQueryData()
  const isLoading = useCustomerInfoQueryLoading()
  const [customerInfoOrders, setCustomerInfoOrders] = useState([])

  useEffect(() => {
    if (customerInfo) {
      setCustomerInfoOrders(customerInfo.orders)
    }
  }, [customerInfo])

  const tableData = useMemo(() => customerInfoOrders, [customerInfoOrders])
  const tableColumns = useMemo(() => ordersColumn, [])

  const handleClick = (e) => {
    navigate(`/orders/` + e.orderId, {
      state: {orderId: e.orderId},
    })
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <h2>Order History</h2>,
              handleClick: handleClick,
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

export default CustomerOrdersTable

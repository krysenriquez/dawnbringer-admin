import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import ordersColumn from './MemberOrdersColumn'

const MemberOrdersTable = () => {
  const navigate = useNavigate()
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()
  const [memberInfoOrders, setMemberInfoOrders] = useState([])

  useEffect(() => {
    if (memberInfo) {
      setMemberInfoOrders(memberInfo.orders)
    }
  }, [memberInfo])

  const tableData = useMemo(() => memberInfoOrders, [memberInfoOrders])
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

export default MemberOrdersTable

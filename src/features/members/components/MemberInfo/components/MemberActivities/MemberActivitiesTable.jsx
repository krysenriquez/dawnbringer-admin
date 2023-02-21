import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import activitiesColumn from './MemberActivitiesColumn'

const MemberActivitiesTable = () => {
  const navigate = useNavigate()
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()
  const [memberInfoOrders, setMemberInfoOrders] = useState([])

  useEffect(() => {
    if (memberInfo) {
      setMemberInfoOrders(memberInfo.activities)
    }
  }, [memberInfo])

  const tableData = useMemo(() => memberInfoOrders, [memberInfoOrders])
  const tableColumns = useMemo(() => activitiesColumn, [])

  const handleClick = (e) => {}

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <h2>Activities</h2>,
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

export default MemberActivitiesTable

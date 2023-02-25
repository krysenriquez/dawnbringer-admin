import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useBranchInfoQueryData,
  useBranchInfoQueryLoading,
} from '@/features/branches/stores/BranchesInfoQueryProvider'

import usersColumn from './BranchUsersColumn'

const BranchUsersTable = () => {
  const navigate = useNavigate()
  const branchInfo = useBranchInfoQueryData()
  const isLoading = useBranchInfoQueryLoading()
  const [branchInfoUsers, setBranchInfoUsers] = useState([])

  useEffect(() => {
    if (branchInfo) {
      setBranchInfoUsers(branchInfo.users)
    }
  }, [branchInfo])

  const tableData = useMemo(() => branchInfoUsers, [branchInfoUsers])
  const tableColumns = useMemo(() => usersColumn, [])

  const handleClick = (e) => {
    // navigate(`/orders/` + e.orderId, {
    //   state: {orderId: e.orderId},
    // })
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <h2>Assigned Users</h2>,
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

export default BranchUsersTable

import {useEffect, useMemo, useState} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useRoleInfoQueryData,
  useRoleInfoQueryLoading,
} from '@/features/roles/stores/RoleInfoQueryProvider'
import usersColumn from './UsersListColumn'

const UsersListTable = () => {
  const userTypeInfo = useRoleInfoQueryData()
  const isLoading = useRoleInfoQueryLoading()

  const [users, setUsers] = useState([])
  useEffect(() => {
    if (userTypeInfo && userTypeInfo.users && !isLoading) {
      setUsers(userTypeInfo.users)
    }
  }, [userTypeInfo])

  const tableData = useMemo(() => users, [users])
  const tableColumns = useMemo(() => usersColumn, [])

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

export default UsersListTable

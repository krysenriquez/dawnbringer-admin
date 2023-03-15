import {useMemo} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {useRolesListQueryData, useRolesListQueryLoading} from '../../stores/RolesListQueryProvider'
import rolesColumn from './RolesListColumn'

const RolesListTable = () => {
  const userTypes = useRolesListQueryData()
  const isLoading = useRolesListQueryLoading()
  const tableData = useMemo(() => userTypes, [userTypes])
  const tableColumns = useMemo(() => rolesColumn, [])

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

export default RolesListTable

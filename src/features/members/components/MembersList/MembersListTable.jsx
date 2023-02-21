import {useMemo} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useMembersListQueryData,
  useMembersListQueryLoading,
} from '../../stores/MembersListQueryProvider'
import membersColumns from './MembersListColumn'

const MembersListTable = () => {
  const members = useMembersListQueryData()
  const isLoading = useMembersListQueryLoading()
  const tableData = useMemo(() => members, [members])
  const tableColumns = useMemo(() => membersColumns, [])

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

export default MembersListTable

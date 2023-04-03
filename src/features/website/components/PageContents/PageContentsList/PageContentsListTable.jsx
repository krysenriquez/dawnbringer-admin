import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  usePageContentsListQueryData,
  usePageContentsListQueryLoading,
} from '@/features/website/stores/PageContents/PageContentsListQueryProvider'
import pageContentsColumn from './PageContentsListColumn'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const PageContentsListTable = () => {
  const navigate = useNavigate()
  const pageContents = usePageContentsListQueryData()
  const isLoading = usePageContentsListQueryLoading()
  const tableData = useMemo(() => pageContents, [pageContents])
  const tableColumns = useMemo(() => pageContentsColumn, [])
  const [canCreatePageContent, setCanCreatePageContent] = useState(false)
  const {permissions} = usePermissions()

  const createPageContent = () => {
    navigate(`/website/page-contents/create`)
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar:
                getRolePermission({
                  moduleName: 'Content Management',
                  permissions: permissions,
                  permission: 'canCreate',
                }) && canCreatePageContent,
              toolbarButtonName: 'Add Page Content',
              handleToolbarButtonClick: createPageContent,
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

export default PageContentsListTable

import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useSectionComponentsListQueryData,
  useSectionComponentsListQueryLoading,
} from '@/features/website/stores/SectionComponents/SectionComponentsListQueryProvider'
import sectionComponentsColumn from './SectionComponentsListColumn'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const SectionComponentsListTable = () => {
  const navigate = useNavigate()
  const sectionComponents = useSectionComponentsListQueryData()
  const isLoading = useSectionComponentsListQueryLoading()
  const tableData = useMemo(() => sectionComponents, [sectionComponents])
  const tableColumns = useMemo(() => sectionComponentsColumn, [])
  const [canCreateSectionComponent, setCanCreateSectionComponent] = useState(false)
  const {permissions} = usePermissions()

  const createSectionComponents = () => {
    navigate(`/website/section-components/create`)
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
                }) && canCreateSectionComponent,
              toolbarButtonName: 'Add Section Component',
              handleToolbarButtonClick: createSectionComponents,
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

export default SectionComponentsListTable

import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductTypesListQueryData,
  useProductTypesListQueryLoading,
} from '@/features/product-type/stores/ProductTypesListQueryProvider'
import productTypesColumn from './ProductTypesListColumn'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProductTypesListTable = () => {
  const productTypes = useProductTypesListQueryData()
  const isLoading = useProductTypesListQueryLoading()
  const tableData = useMemo(() => productTypes, [productTypes])
  const tableColumns = useMemo(() => productTypesColumn, [])
  const navigate = useNavigate()
  const {permissions} = usePermissions()

  const createProductType = () => {
    navigate(`/product-types/create`)
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: getRolePermission({
                moduleName: 'Products Management',
                permissions: permissions,
                permission: 'canCreate',
              }),
              toolbarButtonName: 'Add Product Type',
              handleToolbarButtonClick: createProductType,
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

export default ProductTypesListTable

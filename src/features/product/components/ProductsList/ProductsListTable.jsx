import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductsListQueryData,
  useProductsListQueryLoading,
} from '../../stores/ProductsListQueryProvider'
import productsColumn from './ProductsListColumn'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProductsListTable = () => {
  const products = useProductsListQueryData()
  const isLoading = useProductsListQueryLoading()
  const tableData = useMemo(() => products, [products])
  const tableColumns = useMemo(() => productsColumn, [])
  const navigate = useNavigate()
  const {permissions} = usePermissions()

  const createProduct = () => {
    navigate(`/products/create`)
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
              toolbarButtonName: 'Add Product',
              handleToolbarButtonClick: createProduct,
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

export default ProductsListTable

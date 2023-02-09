import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  useProductsListQueryData,
  useProductsListQueryLoading,
} from '../../stores/ProductsListQueryProvider'
import productsColumn from './ProductsListColumn'

const ProductsListTable = () => {
  const products = useProductsListQueryData()
  const isLoading = useProductsListQueryLoading()
  const tableData = useMemo(() => products, [products])
  const tableColumns = useMemo(() => productsColumn, [])
  const navigate = useNavigate()

  const createProduct = () => {
    navigate(`/products/create`)
  }

  return (
    <>
      <CustomCard>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: true,
              toolbarButtonName: 'Add Product',
              handletoolbarButtonClick: createProduct,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
      </CustomCard>
    </>
  )
}

export default ProductsListTable

import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductTypeInfoQueryData,
  useProductTypeInfoQueryLoading,
} from '@/features/product-type/stores/ProductTypeInfoQueryProvider'
import productsColumn from './ProductsColumn'

const ProductsTable = () => {
  const navigate = useNavigate()
  const productTypeInfo = useProductTypeInfoQueryData()
  const isLoading = useProductTypeInfoQueryLoading()
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (productTypeInfo) {
      setProducts(productTypeInfo.products)
    }
  }, [productTypeInfo])

  const tableData = useMemo(() => products, [products])
  const tableColumns = useMemo(() => productsColumn, [])

  const handleClick = (e) => {
    navigate(`/products/` + e.productId, {
      state: {productId: e.productId},
    })
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <h2>Products</h2>,
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

export default ProductsTable

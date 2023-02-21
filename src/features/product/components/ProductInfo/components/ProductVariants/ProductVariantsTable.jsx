import {useState, useMemo, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductInfoQueryData,
  useProductInfoQueryLoading,
} from '@/features/product/stores/ProductInfoQueryProvider'

import {productVariantsColumn} from './ProductVariantsColumn'

const ProductVariantsTable = () => {
  const navigate = useNavigate()
  const productInfo = useProductInfoQueryData()
  const isLoading = useProductInfoQueryLoading()
  const [productVariants, setProductVariants] = useState([])

  useEffect(() => {
    if (productInfo) {
      setProductVariants(productInfo.productVariants)
    }
  }, [productInfo])

  const tableData = useMemo(() => productVariants, [productVariants])
  const tableColumns = useMemo(() => productVariantsColumn, [])

  const handleClick = (e) => {
    navigate(`/product-variants/` + e.sku, {
      state: {sku: e.sku},
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
              title: <h2>Product Variants</h2>,
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

export default ProductVariantsTable

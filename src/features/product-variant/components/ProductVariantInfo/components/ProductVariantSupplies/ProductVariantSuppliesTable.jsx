import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import suppliesColumn from './ProductVariantSuppliesColumn'

const ProductVariantSuppliesTable = () => {
  const navigate = useNavigate()
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()
  const [productVariantSupplies, setProductVariantSupplies] = useState([])

  useEffect(() => {
    if (productVariantInfo) {
      setProductVariantSupplies(productVariantInfo.supplies)
    }
  }, [productVariantInfo])

  const tableData = useMemo(() => productVariantSupplies, [productVariantSupplies])
  const tableColumns = useMemo(() => suppliesColumn, [])

  const handleClick = (e) => {
    navigate(`/supplies/` + e.supplyId, {
      state: {supplyId: e.supplyId},
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
              title: <h2>Supplies</h2>,
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

export default ProductVariantSuppliesTable

import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import ordersColumn from './ProductVariantOrdersColumn'

const ProductVariantOrdersTable = () => {
  const navigate = useNavigate()
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()
  const [productVariantOrders, setProductVariantOrders] = useState([])

  useEffect(() => {
    if (productVariantInfo) {
      setProductVariantOrders(productVariantInfo.orders)
    }
  }, [productVariantInfo])

  const tableData = useMemo(() => productVariantOrders, [productVariantOrders])
  const tableColumns = useMemo(() => ordersColumn, [])

  const handleClick = (e) => {
    navigate(`/orders/` + e.orderId, {
      state: {orderId: e.orderId},
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
              title: <h2>Orders</h2>,
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

export default ProductVariantOrdersTable

import {useEffect, useMemo, useState} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import historiesColumn from './HistoriesColumn'

const HistoriesTable = () => {
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()
  const [histories, setHistories] = useState([])

  useEffect(() => {
    if (productVariantInfo) {
      setHistories(productVariantInfo.history)
    }
  }, [productVariantInfo])

  const tableData = useMemo(() => histories, [histories])
  const tableColumns = useMemo(() => historiesColumn, [])

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <h2>History</h2>,
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

export default HistoriesTable

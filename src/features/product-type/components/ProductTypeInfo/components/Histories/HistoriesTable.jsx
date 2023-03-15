import {useEffect, useMemo, useState} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useProductTypeInfoQueryData,
  useProductTypeInfoQueryLoading,
} from '@/features/product-type/stores/ProductTypeInfoQueryProvider'
import historiesColumn from './HistoriesColumn'

const HistoriesTable = () => {
  const productTypeInfo = useProductTypeInfoQueryData()
  const isLoading = useProductTypeInfoQueryLoading()
  const [histories, setHistories] = useState([])

  useEffect(() => {
    if (productTypeInfo) {
      setHistories(productTypeInfo.history)
    }
  }, [productTypeInfo])

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

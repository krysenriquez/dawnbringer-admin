import {useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
import TableLoading from '@/components/elements/Table/TableLoading'
import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'

import {productVariantsColumn} from './VariantStocksColumn'

const VariantStocksTable = () => {
  const navigate = useNavigate()
  const {variantStocksList} = useDashboard()
  const tableData = useMemo(() => variantStocksList, [variantStocksList])
  const tableColumns = useMemo(() => productVariantsColumn, [])

  const handleClick = (e) => {
    navigate(`/product-variants/` + e.sku, {
      state: {sku: e.sku},
    })
  }

  return (
    <>
      <CustomCardWithoutHeader className='card card-flush overflow-hidden h-md-100'>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <span className='card-label fw-bold text-dark'>Product Variant Stocks</span>,
              handleClick: handleClick,
            }}
          />
        ) : (
          <></>
        )}
        {!variantStocksList && <TableLoading />}
      </CustomCardWithoutHeader>
    </>
  )
}

export default VariantStocksTable

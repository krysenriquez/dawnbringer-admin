import {useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  useProductVariantsListQueryData,
  useProductVariantsListQueryLoading,
} from '../../stores/ProductVariantsListQueryProvider'

import {productVariantsColumn} from './ProductVariantsListColumn'

export const ProductVariantsListTable = () => {
  const productVariants = useProductVariantsListQueryData()
  const isLoading = useProductVariantsListQueryLoading()
  const tableData = useMemo(() => productVariants, [productVariants])
  const tableColumns = useMemo(() => productVariantsColumn, [])
  const navigate = useNavigate()

  const createProductVariant = () => {
    navigate(`/product-variants/create`)
  }

  return (
    <>
      <CustomCard className='card card-flush py-4'>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: 'Product Variants',
              hasToolbar: true,
              toolbarButtonName: 'Add Product Variant',
              handletoolbarButtonClick: createProductVariant,
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

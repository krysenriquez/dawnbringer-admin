import {useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
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
      <CustomCardWithoutHeader className='card card-flush py-4'>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              title: 'Product Variants',
              hasToolbar: true,
              toolbarButtonName: 'Add Product Variant',
              handleToolbarButtonClick: createProductVariant,
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

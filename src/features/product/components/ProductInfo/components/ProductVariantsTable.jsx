import {useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {productVariantsColumn} from './ProductVariantsColumn'

const ProductVariantsListPage = () => {
  const productVariants = useProductVariantsListQueryData()
  const isLoading = useProductVariantsListQueryLoading()
  const tableData = useMemo(() => productVariants, [productVariants])
  const tableColumns = useMemo(() => productVariantsColumn, [])
  const navigate = useNavigate()

  const navigateSelectedVariant = (variant) => {
    navigate(`${variant.sku}`, {
      state: {sku: variant.sku},
    })
  }

  const createProductVariant = () => {
    navigate(`/products/variants/create`)
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
              handleClick: navigateSelectedVariant,
              toolbarButtonName: 'Add Variant',
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

const ProductVariantsListWrapper = () => {
  return (
    <>
      <ProductVariantsListQueryProvider>
        <ProductVariantsListPage />
      </ProductVariantsListQueryProvider>
    </>
  )
}

export {ProductVariantsListWrapper}

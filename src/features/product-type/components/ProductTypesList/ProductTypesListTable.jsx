import {useEffect, useMemo} from 'react'
import {useNavigate} from 'react-router-dom'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  useProductTypesListQueryData,
  useProductTypesListQueryLoading,
} from '@/features/product-type/stores/ProductTypesListQueryProvider'
import productTypesColumn from './ProductTypesListColumn'

const ProductTypesListTable = () => {
  const productTypes = useProductTypesListQueryData()
  const isLoading = useProductTypesListQueryLoading()
  const tableData = useMemo(() => productTypes, [productTypes])
  const tableColumns = useMemo(() => productTypesColumn, [])
  const navigate = useNavigate()

  const createProductType = () => {
    navigate(`/product-types/create`)
  }

  return (
    <>
      <CustomCard className='card card-flush py-4'>
        {tableData ? (
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: true,
              toolbarButtonName: 'Add Product Type',
              handletoolbarButtonClick: createProductType,
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

export default ProductTypesListTable

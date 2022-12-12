import {useEffect, useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {CustomTable} from '@/components/elements/Table/CustomTable'
import {TableLoading} from '@/components/elements/Table/TableLoading'
import {
  ProductsListQueryProvider,
  useProductsListQueryData,
  useProductsListQueryLoading,
} from './ProductsList/ProductsListQueryProvider'
import productsColumn from './ProductsList/ProductsColumn'

const ProductsListPage = () => {
  const products = useProductsListQueryData()
  const isLoading = useProductsListQueryLoading()

  const tableData = useMemo(() => products, [products])
  const tableColumns = useMemo(() => productsColumn, [])

  return (
    <>
      <CustomCard>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
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

const ProductsListWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Products List'>
        {intl.formatMessage({id: 'MENU.PRODUCTS'})}
      </PageTitle>
      <ProductsListQueryProvider>
        <ProductsListPage />
      </ProductsListQueryProvider>
    </>
  )
}

export {ProductsListWrapper}

import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import ProductVariantInfo from './ProductVariantInfo'
import ProductVariantsList from './ProductVariantsList'
import ProductVariantCreate from './ProductVariantCreate'
const ProductVariantRoutes = () => {
  const intl = useIntl()

  const productVariantBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PRODUCTS.VARIANTS'}),
      path: '/product-variants',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <PageTitle breadcrumbs={productVariantBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.VARIANTS.LIST'})}
            </PageTitle>
            <ProductVariantsList />
          </>
        }
      />
      <Route
        path=':sku'
        element={
          <>
            <PageTitle breadcrumbs={productVariantBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.VARIANTS.INFO'})}
            </PageTitle>
            <ProductVariantInfo />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={productVariantBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.VARIANTS.CREATE'})}
            </PageTitle>
            <ProductVariantCreate />
          </>
        }
      />
    </Routes>
  )
}

export default ProductVariantRoutes

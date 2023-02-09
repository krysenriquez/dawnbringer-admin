import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import ProductTypesList from './ProductTypesList'
import ProductTypeCreate from './ProductTypeCreate'

const ProductTypeRoutes = () => {
  const intl = useIntl()

  const productTypeBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PRODUCTS.TYPES'}),
      path: '/product-types',
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
            <PageTitle breadcrumbs={productTypeBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.TYPES'})}
            </PageTitle>
            <ProductTypesList />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={productTypeBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.TYPES.CREATE'})}
            </PageTitle>
            <ProductTypeCreate />
          </>
        }
      />
    </Routes>
  )
}

export default ProductTypeRoutes

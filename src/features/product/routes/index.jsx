import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import ProductInfo from './ProductInfo'
import ProductsList from './ProductsList'
import ProductCreate from './ProductCreate'
import ProductEdit from './ProductEdit'

const ProductRoutes = () => {
  const intl = useIntl()

  const productBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PRODUCTS'}),
      path: '/products',
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
            <PageTitle breadcrumbs={productBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.LIST'})}
            </PageTitle>
            <ProductsList />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={productBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.CREATE'})}
            </PageTitle>
            <ProductCreate />
          </>
        }
      />
      <Route
        path=':productId'
        element={
          <>
            <PageTitle breadcrumbs={productBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.INFO'})}
            </PageTitle>
            <ProductInfo />
          </>
        }
      />
      <Route
        path=':productId/edit'
        element={
          <>
            <PageTitle breadcrumbs={productBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PRODUCTS.INFO'})}
            </PageTitle>
            <ProductEdit />
          </>
        }
      />
    </Routes>
  )
}

export default ProductRoutes

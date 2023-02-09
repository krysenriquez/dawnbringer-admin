import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/elements/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'
import DashboardRoutes from '@/features/dashboard/routes'

const PrivateRoutes = () => {
  // const Dashboard = lazy(() => import('@/features/dashboard/routes'))
  const Members = lazy(() => import('@/features/members/routes'))
  const Products = lazy(() => import('@/features/product/routes'))
  const ProductVariants = lazy(() => import('@/features/product-variant/routes'))
  const ProductTypes = lazy(() => import('@/features/product-type/routes'))
  const Orders = lazy(() => import('@/features/orders/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        {path: '*', element: <Navigate to='dashboard' />},
        {path: 'dashboard/*', element: <DashboardRoutes />},
        {
          path: 'members/*',
          element: (
            <SuspensedView>
              <Members />
            </SuspensedView>
          ),
        },
        {
          path: 'products/*',
          element: (
            <SuspensedView>
              <Products />
            </SuspensedView>
          ),
        },
        {
          path: 'product-variants/*',
          element: (
            <SuspensedView>
              <ProductVariants />
            </SuspensedView>
          ),
        },
        {
          path: 'product-types/*',
          element: (
            <SuspensedView>
              <ProductTypes />
            </SuspensedView>
          ),
        },
        {
          path: 'orders/*',
          element: (
            <SuspensedView>
              <Orders />
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes

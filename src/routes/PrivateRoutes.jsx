import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/elements/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'
import DashboardRoutes from '@/features/dashboard/routes'

const PrivateRoutes = () => {
  // const Dashboard = lazy(() => import('@/features/dashboard/routes'))
  const Products = lazy(() => import('@/features/product/routes'))
  const ProductVariants = lazy(() => import('@/features/product-variant/routes'))
  const ProductTypes = lazy(() => import('@/features/product-type/routes'))
  const Orders = lazy(() => import('@/features/orders/routes'))
  const Supplies = lazy(() => import('@/features/supplies/routes'))
  const Members = lazy(() => import('@/features/members/routes'))
  const Cashouts = lazy(() => import('@/features/cashouts/routes'))
  const Customers = lazy(() => import('@/features/customers/routes'))
  const Website = lazy(() => import('@/features/website/routes'))
  const Settings = lazy(() => import('@/features/settings/routes'))
  const Account = lazy(() => import('@/features/account/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        {path: '*', element: <Navigate to='dashboard' />},
        {path: 'dashboard/*', element: <DashboardRoutes />},
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
        {
          path: 'supplies/*',
          element: (
            <SuspensedView>
              <Supplies />
            </SuspensedView>
          ),
        },
        {
          path: 'members/*',
          element: (
            <SuspensedView>
              <Members />
            </SuspensedView>
          ),
        },
        {
          path: 'cashouts/*',
          element: (
            <SuspensedView>
              <Cashouts />
            </SuspensedView>
          ),
        },
        {
          path: 'customers/*',
          element: (
            <SuspensedView>
              <Customers />
            </SuspensedView>
          ),
        },
        {
          path: 'website/*',
          element: (
            <SuspensedView>
              <Website />
            </SuspensedView>
          ),
        },
        {
          path: 'settings/*',
          element: (
            <SuspensedView>
              <Settings />
            </SuspensedView>
          ),
        },
        {
          path: 'account/*',
          element: (
            <SuspensedView>
              <Account />
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes

import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/elements/MainLayout'
import {DashboardLayout} from '@/components/layouts/main/elements/DashboardLayout'
import {SuspensedView} from '@/utils/suspensedView'
import RolePermissionRoute from '@/providers/Permissions/RolePermissionRoute'
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
        {
          path: 'products/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Products Management' permission='canRetrieve'>
                <Products />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'product-variants/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Products Management' permission='canRetrieve'>
                <ProductVariants />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'product-types/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Products Management' permission='canRetrieve'>
                <ProductTypes />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'orders/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Orders Management' permission='canRetrieve'>
                <Orders />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'supplies/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Supplies Management' permission='canRetrieve'>
                <Supplies />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'members/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Members Management' permission='canRetrieve'>
                <Members />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'cashouts/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Members Management' permission='canRetrieve'>
                <Cashouts />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'customers/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Guests Management' permission='canRetrieve'>
                <Customers />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'website/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='Content Management' permission='canRetrieve'>
                <Website />
              </RolePermissionRoute>
            </SuspensedView>
          ),
        },
        {
          path: 'settings/*',
          element: (
            <SuspensedView>
              <RolePermissionRoute moduleName='User Management' permission='canRetrieve'>
                <Settings />
              </RolePermissionRoute>
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
    {
      path: '/*',
      element: <DashboardLayout />,
      children: [{path: 'dashboard/*', element: <DashboardRoutes />}],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes

import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import OrdersList from './OrdersList'
import OrderInfo from './OrderInfo'

const OrdersRoutes = () => {
  const intl = useIntl()

  const ordersBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'ORDERS'}),
      path: '/orders',
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
            <PageTitle breadcrumbs={ordersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'ORDERS.LIST'})}
            </PageTitle>
            <OrdersList />
          </>
        }
      />
      <Route
        path=':orderId'
        element={
          <>
            <PageTitle breadcrumbs={ordersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'ORDERS.INFO'})}
            </PageTitle>
            <OrderInfo />
          </>
        }
      />
    </Routes>
  )
}

export default OrdersRoutes

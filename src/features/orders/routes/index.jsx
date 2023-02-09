import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {OrdersListWrapper} from '../components/OrdersList/OrdersListWrapper'
import {OrderInfoWrapper} from '../components/OrderInfo/OrderInfoWrapper'

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
            <OrdersListWrapper />
          </>
        }
      />
      <Route
        path=':order_id'
        element={
          <>
            <PageTitle breadcrumbs={ordersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'ORDERS.INFO'})}
            </PageTitle>
            <OrderInfoWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default OrdersRoutes

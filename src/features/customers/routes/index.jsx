import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import CustomersList from './CustomersList'
import CustomerInfo from './CustomerInfo'

const CustomersRoutes = () => {
  const intl = useIntl()

  const customersBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'CUSTOMERS'}),
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
            <PageTitle breadcrumbs={customersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'CUSTOMERS.LIST'})}
            </PageTitle>
            <CustomersList />
          </>
        }
      />
      <Route
        path=':customerNumber'
        element={
          <>
            <PageTitle breadcrumbs={customersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'CUSTOMERS.LIST'})}
            </PageTitle>
            <CustomerInfo />
          </>
        }
      />
    </Routes>
  )
}

export default CustomersRoutes

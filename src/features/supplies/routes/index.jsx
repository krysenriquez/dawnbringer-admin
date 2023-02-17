import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import SuppliesList from './SuppliesList'
import SupplyCreate from './SupplyCreate'
import SupplyInfo from './SupplyInfo'

const SuppliesRoutes = () => {
  const intl = useIntl()

  const suppliesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'SUPPLIES'}),
      path: '/supplies',
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
            <PageTitle breadcrumbs={suppliesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SUPPLIES.LIST'})}
            </PageTitle>
            <SuppliesList />
          </>
        }
      />
      <Route
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={suppliesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SUPPLIES.CREATE'})}
            </PageTitle>
            <SupplyCreate />
          </>
        }
      />
      <Route
        path=':supplyId'
        element={
          <>
            <PageTitle breadcrumbs={suppliesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SUPPLIES.INFO'})}
            </PageTitle>
            <SupplyInfo />
          </>
        }
      />
    </Routes>
  )
}

export default SuppliesRoutes

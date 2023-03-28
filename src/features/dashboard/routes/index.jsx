import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle, PageAction} from '@/providers/PageDataProvider'
import DashboardActions from '../components/widgets/DashboardActions'
import Dashboard from './Dashboard'

const MembersRoutes = () => {
  const intl = useIntl()

  const dashboardBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'DASHBOARD'}),
      path: '/dashboard',
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
            <PageTitle breadcrumbs={dashboardBreadCrumbs} description=''>
              {intl.formatMessage({id: 'DASHBOARD'})}
            </PageTitle>
            <PageAction>
              <DashboardActions />
            </PageAction>
            <Dashboard />
          </>
        }
      />
    </Routes>
  )
}

export default MembersRoutes

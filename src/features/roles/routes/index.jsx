import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import RolesList from './RolesList'
import RoleInfo from './RoleInfo'

const RolessRoutes = () => {
  const intl = useIntl()

  const rolesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'SETTINGS.ROLES'}),
      path: '/roles',
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
            <PageTitle breadcrumbs={rolesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.ROLES.LIST'})}
            </PageTitle>
            <RolesList />
          </>
        }
      />
      <Route
        path=':userTypeId'
        element={
          <>
            <PageTitle breadcrumbs={rolesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.ROLES.INFO'})}
            </PageTitle>
            <RoleInfo />
          </>
        }
      />
    </Routes>
  )
}

export default RolessRoutes

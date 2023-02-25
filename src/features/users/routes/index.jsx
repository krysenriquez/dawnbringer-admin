import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import BranchesList from './UsersList'
import BranchInfo from './UserInfo'

const UsersRoutes = () => {
  const intl = useIntl()

  const usersBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'SETTINGS.USERS'}),
      path: '/users',
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
            <PageTitle breadcrumbs={usersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.USERS.LIST'})}
            </PageTitle>
            <BranchesList />
          </>
        }
      />
      <Route
        path=':userId'
        element={
          <>
            <PageTitle breadcrumbs={usersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.USERS.INFO'})}
            </PageTitle>
            <BranchInfo />
          </>
        }
      />
    </Routes>
  )
}

export default UsersRoutes

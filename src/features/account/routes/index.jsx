import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import AccountInfo from './AccountInfo'

const AccountsRoutes = () => {
  const intl = useIntl()

  const profileBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'PROFILE'}),
      path: '/account',
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
            <PageTitle breadcrumbs={profileBreadCrumbs} description=''>
              {intl.formatMessage({id: 'PROFILE.INFO'})}
            </PageTitle>
            <AccountInfo />
          </>
        }
      />
    </Routes>
  )
}

export default AccountsRoutes

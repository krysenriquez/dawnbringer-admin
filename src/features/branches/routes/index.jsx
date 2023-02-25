import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import BranchesList from './BranchesList'
import BranchInfo from './BranchInfo'

const BranchesRoutes = () => {
  const intl = useIntl()

  const branchesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'SETTINGS.BRANCHES'}),
      path: '/branches',
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
            <PageTitle breadcrumbs={branchesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.BRANCHES.LIST'})}
            </PageTitle>
            <BranchesList />
          </>
        }
      />
      <Route
        path=':branchId'
        element={
          <>
            <PageTitle breadcrumbs={branchesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.BRANCHES.INFO'})}
            </PageTitle>
            <BranchInfo />
          </>
        }
      />
    </Routes>
  )
}

export default BranchesRoutes

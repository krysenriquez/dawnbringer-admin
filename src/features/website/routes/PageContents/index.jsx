import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import PageContentsList from './PageContentsList'
import PageContentInfo from './PageContentInfo'

const BranchesRoutes = () => {
  const intl = useIntl()

  const pageContentsBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'WEBSITE.PAGECONTENTS'}),
      path: '/page-contents',
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
            <PageTitle breadcrumbs={pageContentsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'WEBSITE.PAGECONTENTS.LIST'})}
            </PageTitle>
            <PageContentsList />
          </>
        }
      />
      <Route
        path=':branchId'
        element={
          <>
            <PageTitle breadcrumbs={pageContentsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'WEBSITE.PAGECONTENTS.INFO'})}
            </PageTitle>
            <PageContentInfo />
          </>
        }
      />
    </Routes>
  )
}

export default BranchesRoutes

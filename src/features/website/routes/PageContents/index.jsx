import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import PageContentsList from './PageContentsList'
import PageContentCreate from './PageContentCreate'
import PageContentInfo from './PageContentInfo'

const PageContentsRoutes = () => {
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
        path='/create'
        element={
          <>
            <PageTitle breadcrumbs={pageContentsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'WEBSITE.PAGECONTENTS.CREATE'})}
            </PageTitle>
            <PageContentCreate />
          </>
        }
      />
      <Route
        path=':pageContentId'
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

export default PageContentsRoutes

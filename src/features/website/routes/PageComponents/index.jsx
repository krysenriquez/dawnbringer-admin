import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import PageComponentsList from './PageComponentsList'
import PageComponentInfo from './PageComponentInfo'

const PageComponentsRoutes = () => {
  const intl = useIntl()

  const pageComponentsBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'WEBSITE.PAGECOMPONENTS'}),
      path: '/page-components',
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
            <PageTitle breadcrumbs={pageComponentsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'WEBSITE.PAGECOMPONENTS.LIST'})}
            </PageTitle>
            <PageComponentsList />
          </>
        }
      />
      <Route
        path=':pageComponentId'
        element={
          <>
            <PageTitle breadcrumbs={pageComponentsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'WEBSITE.PAGECOMPONENTS.INFO'})}
            </PageTitle>
            <PageComponentInfo />
          </>
        }
      />
    </Routes>
  )
}

export default PageComponentsRoutes

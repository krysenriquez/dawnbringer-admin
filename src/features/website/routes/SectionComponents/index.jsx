import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import SectionComponentsList from './SectionComponentsList'
import SectionComponentInfo from './SectionComponentInfo'

const BranchesRoutes = () => {
  const intl = useIntl()

  const pageContentsBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'WEBSITE.SECTIONCOMPONENTS'}),
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
              {intl.formatMessage({id: 'WEBSITE.SECTIONCOMPONENTS.LIST'})}
            </PageTitle>
            <SectionComponentsList />
          </>
        }
      />
      <Route
        path=':branchId'
        element={
          <>
            <PageTitle breadcrumbs={pageContentsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'WEBSITE.SECTIONCOMPONENTS.INFO'})}
            </PageTitle>
            <SectionComponentInfo />
          </>
        }
      />
    </Routes>
  )
}

export default BranchesRoutes

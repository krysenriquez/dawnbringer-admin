import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import BranchesList from './BranchesList'

const SettingsRoutes = () => {
  const intl = useIntl()

  const settingsBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'SETTINGS'}),
      path: '/orders',
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
        path='/branches'
        element={
          <>
            <PageTitle breadcrumbs={settingsBreadCrumbs} description=''>
              {intl.formatMessage({id: 'SETTINGS.BRANCHES'})}
            </PageTitle>
            <BranchesList />
          </>
        }
      />
    </Routes>
  )
}

export default SettingsRoutes

import {lazy} from 'react'
import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {SuspensedView} from '@/utils/suspensedView'
import BranchesList from '@/features/branches/routes/BranchesList'

const SettingsRoutes = () => {
  const Branches = lazy(() => import('@/features/branches/routes'))
  const Users = lazy(() => import('@/features/users/routes'))

  return (
    <Routes>
      <Route
        path='/branches/*'
        element={
          <>
            <SuspensedView>
              <Branches />
            </SuspensedView>
          </>
        }
      />
      <Route
        path='/users/*'
        element={
          <>
            <SuspensedView>
              <Users />
            </SuspensedView>
          </>
        }
      />
    </Routes>
  )
}

export default SettingsRoutes

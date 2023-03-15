import {lazy} from 'react'
import {Route, Routes} from 'react-router-dom'
import {SuspensedView} from '@/utils/suspensedView'

const SettingsRoutes = () => {
  const Branches = lazy(() => import('@/features/branches/routes'))
  const Users = lazy(() => import('@/features/users/routes'))
  const Roles = lazy(() => import('@/features/roles/routes'))

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
      <Route
        path='/roles/*'
        element={
          <>
            <SuspensedView>
              <Roles />
            </SuspensedView>
          </>
        }
      />
    </Routes>
  )
}

export default SettingsRoutes

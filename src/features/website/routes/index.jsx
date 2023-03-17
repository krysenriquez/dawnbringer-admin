import {lazy} from 'react'
import {Route, Routes, Outlet} from 'react-router-dom'
import {SuspensedView} from '@/utils/suspensedView'

const WebsiteRoutes = () => {
  const PageContents = lazy(() => import('@/features/website/routes/PageContents'))
  const PageComponents = lazy(() => import('@/features/website/routes/PageComponents'))
  const SectionComponents = lazy(() => import('@/features/website/routes/SectionComponents'))

  return (
    <Routes>
      <Route
        path='/page-contents/*'
        element={
          <>
            <SuspensedView>
              <PageContents />
            </SuspensedView>
          </>
        }
      />
      <Route
        path='/page-components/*'
        element={
          <>
            <SuspensedView>
              <PageComponents />
            </SuspensedView>
          </>
        }
      />
      <Route
        path='/section-components/*'
        element={
          <>
            <SuspensedView>
              <SectionComponents />
            </SuspensedView>
          </>
        }
      />
    </Routes>
  )
}

export default WebsiteRoutes

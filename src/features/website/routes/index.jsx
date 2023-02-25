import {lazy} from 'react'
import {Route, Routes, Outlet} from 'react-router-dom'
import {SuspensedView} from '@/utils/suspensedView'

const WebsiteRoutes = () => {
  const PageContents = lazy(() => import('@/features/website/routes/PageContents'))
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

import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {PageDataProvider} from '@/providers/PageDataProvider'
// Layout Components
import {AsideDefault} from './Aside/AsideDefault'
import {Footer} from './Footer/Footer'
import Header from './Header/Header'
import Toolbar from './Toolbar/Toolbar'
import {Content} from './Content/Content'
import {ScrollTop} from './Content/ScrollTop'
import {MenuComponent} from '@/components/assets/components'
import {Sidebar} from './Sidebar/Sidebar'

const DashboardLayout = () => {
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  return (
    <PageDataProvider>
      <div className='app-page flex-column flex-column-fluid'>
        <Header />
        <div className='app-wrapper flex-column flex-row-fluid'>
          <Sidebar />
          <div className='app-main flex-column flex-row-fluid'>
            <div className='d-flex flex-column flex-column-fluid'>
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {DashboardLayout}

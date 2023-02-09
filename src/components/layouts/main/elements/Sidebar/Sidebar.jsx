import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {SidebarLogo} from './SidebarLogo'
import {SidebarToggle} from './SidebarToggle'
import SidebarMenu from './SidebarMenu/SidebarMenu'

export function Sidebar() {
  const {config} = useLayout()

  return (
    <div
      className={clsx('app-sidebar', config.app.sidebar.class)}
      {...config.app.sidebar.drawer.attributes}
    >
      <div
        className='app-sidebar-header d-flex flex-stack d-none d-lg-flex pt-8 pb-2'
        id='kt_app_sidebar_header'
      >
        <SidebarLogo />
        <SidebarToggle />
      </div>
      <div className='app-sidebar-navs flex-column-fluid py-6'>
        <SidebarMenu />
      </div>
    </div>
  )
}

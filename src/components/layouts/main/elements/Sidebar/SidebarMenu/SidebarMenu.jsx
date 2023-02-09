import React from 'react'
import {useLocation} from 'react-router'
import {useIntl} from 'react-intl'
import {useLayout} from '@/providers/layout/LayoutProvider'
import SidebarMenuBranches from './SidebarMenuBranches'
import SidebarMenuItems from './SidebarMenuItems'

const SidebarMenu = () => {
  const {config} = useLayout()

  return (
    <div
      id='app_sidebar_navs_wrappers'
      className='app-sidebar-wrapper hover-scroll-y my-2'
      {...config.app.sidebar.menu.attributes}
    >
      <SidebarMenuBranches />
      <div
        id='app_sidebar_navs'
        data-menu='true'
        data-menu-expand='false'
        className='app-sidebar-menu-primary menu menu-column menu-rounded menu-sub-indention menu-state-bullet-primary'
      >
        <div className='menu-item mb-2'>
          <div className='menu-heading text-uppercase fs-7 fw-bold'>Menu</div>
          <div className='app-sidebar-separator separator' />
        </div>
        <SidebarMenuItems />
      </div>
    </div>
  )
}

export default SidebarMenu

import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {HeaderNotificationsMenu} from './components/menus/HeaderNotificationsMenu'
import {HeaderNotifications} from './components/HeaderNotifications/HeaderNotifications'
import {HeaderThemeModeSwitcher} from './components/HeaderThemeModeSwitcher/ThemeModeSwitcher'
import {HeaderUserMenu} from './components/menus/HeaderUserMenu'

const Topbar = () => {
  const {config} = useLayout()

  return (
    <div className={clsx('app-navbar', config.app.header.topbar.class)}>
      <div className='app-navbar-item ms-5'>
        <HeaderThemeModeSwitcher />
      </div>
      <div className='app-navbar-item ms-5'>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export {Topbar}

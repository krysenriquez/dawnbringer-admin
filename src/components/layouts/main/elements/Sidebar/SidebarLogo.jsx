import {Link} from 'react-router-dom'

export const SidebarLogo = () => {
  return (
    <Link to='/dashboard' className='app-sidebar-logo' id='app_sidebar_logo'>
      <img alt='Logo' src='/media/logos/lr-logo-horizontal.png' className='h-30px' />
    </Link>
  )
}

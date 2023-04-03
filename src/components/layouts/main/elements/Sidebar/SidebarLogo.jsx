import {Link} from 'react-router-dom'
import {useCompany} from '@/providers/CompanyProvider'

export const SidebarLogo = () => {
  const {company} = useCompany()
  return (
    <Link to='/dashboard' className='app-sidebar-logo ms-auto me-auto' id='app_sidebar_logo'>
      <img alt='Logo' src={company.logo} className='h-40px' />
    </Link>
  )
}

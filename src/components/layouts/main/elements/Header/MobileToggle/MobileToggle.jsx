import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {useCompany} from '@/providers/CompanyProvider'

const MobileToggle = () => {
  const {companyLogo} = useCompany()
  return (
    <div className='d-flex align-items-center d-block d-lg-none ms-n3' title='Show sidebar menu'>
      <div
        className='btn btn-icon btn-active-color-primary w-35px h-35px me-2'
        id='app_sidebar_toggle'
      >
        <CustomSVG path='/media/icons/hamburger.svg' className='svg-icon-2 svg-icon' />
      </div>
      <a href='/dashboard'>
        <img alt='Logo' src='/media/logos/logo.png' className='h-30px' />
      </a>
    </div>
  )
}

export default MobileToggle

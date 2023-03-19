import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useCompany} from '@/providers/CompanyProvider'

export const AuthLayout = () => {
  const {companyName, companyLogo} = useCompany()

  useEffect(() => {
    document.body.style.backgroundImage = 'none'
    return () => {}
  }, [])

  return (
    <>
      {companyName && (
        <div
          className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
          style={{
            backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/dozzy/1.png')})`,
          }}
        >
          <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
            <div className='mb-10'>
              <img alt='Logo' src={companyLogo} className='theme-dark-show w-140px' />
            </div>
            <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
              <Outlet />
            </div>
          </div>
          <div className='d-flex flex-center flex-column-auto p-10'>
            <div className='d-flex align-items-center fw-semibold fs-6'>
              <a href='#' className='text-muted text-hover-primary px-2'>
                About
              </a>
              <a href='#' className='text-muted text-hover-primary px-2'>
                Contact
              </a>
              <a href='#' className='text-muted text-hover-primary px-2'>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

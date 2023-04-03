import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useCompany} from '@/providers/CompanyProvider'

const AuthLayout = () => {
  const {company} = useCompany()

  return (
    <>
      {company && (
        <div
          className='d-flex flex-column flex-column-fluid bgi-position-y-center bgi-position-x-center bgi-no-repeat bgi-size-cover bgi-attachment-fixed'
          style={{
            backgroundImage: `url(${toAbsoluteUrl('/media/bg/le-reussi.png')})`,
          }}
        >
          <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
            <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto opacity-80'>
              <div className='text-center mb-10'>
                <img alt='Logo' src={company.logo} className='theme-dark-show w-140px' />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AuthLayout

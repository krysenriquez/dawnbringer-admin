import clsx from 'clsx'
import {useIntl} from 'react-intl'
import CustomCard from '@/components/elements/Card/CustomCard'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {
  useUserInfoQueryData,
  useUserInfoQueryLoading,
} from '@/features/users/stores/UserInfoQueryProvider'

const UserDetails = () => {
  const intl = useIntl()
  const userInfo = useUserInfoQueryData()
  const isLoading = useUserInfoQueryLoading()

  return (
    <>
      {userInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          hasToolbar={false}
          bodyClassName='pt-0'
        >
          <div className='py-5 fs-6'>
            <div className='fw-bold'>Display Name</div>
            <div className='text-gray-600'>{userInfo.displayName}</div>
            <div className='fw-bold mt-5'>Username</div>
            <div className='text-gray-600'>{userInfo.username}</div>
            <div className='fw-bold mt-5'>Email Address</div>
            <div className='text-gray-600'>{userInfo.emailAddress}</div>
            <div className='d-flex flex-stack mt-5'>
              <div className='fw-bold'>Is Active</div>
              <CustomSVG
                path={
                  userInfo.isActive
                    ? '/media/icons/general/check.svg'
                    : '/media/icons/general/cross.svg'
                }
                className={clsx('svg-icon-2', {
                  'svg-icon-success': userInfo.isActive,
                  'svg-icon-danger': !userInfo.isActive,
                })}
              />
            </div>
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserDetails

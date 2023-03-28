import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {
  useAccountInfoQueryData,
  useAccountInfoQueryLoading,
} from '../../stores/AccountInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const AccountInfo = () => {
  const intl = useIntl()
  const accountInfo = useAccountInfoQueryData()
  const isLoading = useAccountInfoQueryLoading()

  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  return (
    <>
      {accountInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          bodyClassName='pt-0'
        >
          <>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-150px symbol-lg-160px symbol-circle mb-7'>
                <img
                  src={`${accountInfo.avatar ? accountInfo.avatar : defaultThumbnail}`}
                  alt='image'
                />
              </div>
              <div className='fs-3 text-gray-800 fw-bold mb-1'>{accountInfo.displayName}</div>
              <div
                className={clsx('badge fw-bolder d-inline', {
                  'badge-light-warning':
                    accountInfo.userTypeName == 'Staff' || accountInfo.userTypeName == 'Auditor',
                  'badge-light-info': accountInfo.userTypeName == 'Developer',
                  'badge-light-success': accountInfo.userTypeName == 'Administrator',
                  'badge-light-dark': accountInfo.userTypeName == 'Member',
                })}
              >
                {accountInfo.userTypeName}
              </div>
            </div>
            <div className='pb-5 fs-6'>
              <div className='fw-bold mt-5'>Full Name</div>
              <div className='text-gray-600'>{accountInfo.displayName}</div>
              <div className='fw-bold mt-5'>Username</div>
              <div className='text-gray-600'>{accountInfo.username}</div>
              <div className='fw-bold mt-5'>Email Address</div>
              <div className='text-gray-600'>{accountInfo.emailAddress}</div>
            </div>
          </>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default AccountInfo

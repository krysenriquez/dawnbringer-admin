import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const MemberDetails = () => {
  const intl = useIntl()
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()

  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  return (
    <>
      {memberInfo && !isLoading ? (
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
                  src={`${
                    memberInfo.avatarInfo.avatar ? memberInfo.avatarInfo.avatar : defaultThumbnail
                  }`}
                  alt='image'
                />
              </div>
              <div className='fs-3 text-gray-800 fw-bold mb-1'>{memberInfo.fullName}</div>
              <div
                className={clsx('badge d-inline fw-bolder mb-6', {
                  'badge-light-success': memberInfo.accountStatus == 'ACTIVE',
                  'badge-light-warning':
                    memberInfo.accountStatus == 'DRAFT' || memberInfo.accountStatus == 'PENDING',
                  'badge-light-danger':
                    memberInfo.accountStatus == 'INACTIVE' ||
                    memberInfo.accountStatus == 'DEACTIVATED' ||
                    memberInfo.accountStatus == 'CLOSED',
                })}
              >
                {intl.formatMessage({id: memberInfo.accountStatus})}
              </div>
            </div>
            <div className='pb-5 fs-6'>
              <div className='fw-bold mt-5'>Account Number</div>
              <div className='text-gray-600'>{memberInfo.accountNumber}</div>
              <div className='fw-bold mt-5'>Birthdate</div>
              {memberInfo.personalInfo && (
                <>
                  <div className='text-gray-600'>
                    {memberInfo.personalInfo.birthdate ? memberInfo.personalInfo.birthdate : '--'}
                  </div>
                  <div className='fw-bold mt-5'>Gender</div>
                  <div className='text-gray-600'>
                    {memberInfo.personalInfo.gender ? memberInfo.personalInfo.gender : '--'}
                  </div>
                </>
              )}
              {memberInfo.contactInfo && (
                <>
                  <div className='fw-bold mt-5'>Contact Number</div>
                  <div className='text-gray-600'>
                    {memberInfo.contactInfo.contactNumber
                      ? memberInfo.contactInfo.contactNumber
                      : '--'}
                  </div>
                </>
              )}
              {memberInfo.addressInfo &&
                memberInfo.addressInfo.map((address) => {
                  return (
                    <div key={address.addressType}>
                      <div className='fw-bold mt-5'>
                        {intl.formatMessage({id: address.addressType})} Address
                      </div>
                      <div className='text-gray-600'>
                        {address.address1 ||
                        address.address2 ||
                        address.city ||
                        address.zip ||
                        address.province ||
                        address.country ? (
                          <>
                            {address.address1} {address.address2} <br />
                            {address.city} {address.zip}
                            <br />
                            {address.province} {address.country}
                          </>
                        ) : (
                          '--'
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          </>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default MemberDetails

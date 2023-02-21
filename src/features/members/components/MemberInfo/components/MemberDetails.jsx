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
  const member = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()

  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  return (
    <>
      {member && !isLoading ? (
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
                    member.avatarInfo.fileAttachment
                      ? member.avatarInfo.fileAttachment
                      : defaultThumbnail
                  }`}
                  alt='image'
                />
              </div>
              <div className='fs-3 text-gray-800 fw-bold mb-1'>{member.fullName}</div>
              <div
                className={clsx('badge d-inline fw-bolder mb-6', {
                  'badge-light-success': member.accountStatus == 'ACTIVE',
                  'badge-light-warning':
                    member.accountStatus == 'DRAFT' || member.accountStatus == 'PENDING',
                  'badge-light-danger':
                    member.accountStatus == 'INACTIVE' ||
                    member.accountStatus == 'DEACTIVATED' ||
                    member.accountStatus == 'CLOSED',
                })}
              >
                {intl.formatMessage({id: member.accountStatus})}
              </div>
            </div>
            <div className='pb-5 fs-6'>
              <div className='fw-bold mt-5'>Account Number</div>
              <div className='text-gray-600'>{member.accountNumber}</div>
              <div className='fw-bold mt-5'>Birthdate</div>
              {member.personalInfo && (
                <>
                  <div className='text-gray-600'>
                    {member.personalInfo.birthdate ? member.personalInfo.birthdate : '--'}
                  </div>
                  <div className='fw-bold mt-5'>Gender</div>
                  <div className='text-gray-600'>
                    {member.personalInfo.gender ? member.personalInfo.gender : '--'}
                  </div>
                </>
              )}
              {member.contactInfo && (
                <>
                  <div className='fw-bold mt-5'>Contact Number</div>
                  <div className='text-gray-600'>
                    {member.contactInfo.contactNumber ? member.contactInfo.contactNumber : '--'}
                  </div>
                </>
              )}
              {member.addressInfo &&
                member.addressInfo.map((address) => {
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

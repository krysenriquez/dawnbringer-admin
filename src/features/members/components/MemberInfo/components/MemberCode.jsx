import clsx from 'clsx'
import {QRCodeSVG} from 'qrcode.react'
import CountUp from 'react-countup'
import {toast} from 'react-toastify'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const MemberCode = () => {
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()

  const copyToClipBoard = (referralLink) => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Link Copied!')
  }

  return (
    <>
      {memberInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush'
          hasHeader={true}
          header={<h2>Code</h2>}
          bodyClassName='pt-0'
        >
          <div className='row'>
            <div className='col-xl-6 col-12 text-center mb-5'>
              <QRCodeSVG
                value={memberInfo.code.referralLink}
                size={180}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'H'}
                includeMargin={false}
                imageSettings={{
                  src: toAbsoluteUrl('/media/logos/logo.png'),
                  x: undefined,
                  y: undefined,
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
            </div>
            <div className='col-xl-6 col-12 d-flex flex-wrap align-items-center mb-5'>
              <div>
                <h4 className='text-gray-800 mb-0'>Your Referral Link</h4>
                <p className='fs-6 fw-semibold text-gray-600 py-4 m-0'>
                  Get product discounts and earn by sharing your QR Code or Referral Link
                </p>
                <div className='d-flex'>
                  <input
                    id='kt_referral_link_input'
                    type='text'
                    className='form-control form-control-solid me-3 flex-grow-1'
                    name='search'
                    defaultValue={memberInfo.code.referralLink}
                  />
                  <button
                    className='btn btn-light btn-active-light-primary fw-bold flex-shrink-0'
                    onClick={() => copyToClipBoard(memberInfo.code.referralLink)}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            {memberInfo.membershipLevelPoints &&
              memberInfo.membershipLevelPoints.map((points, index) => {
                return (
                  <div className='col' key={index}>
                    <div className='card card-dashed flex-center min-w-175px my-3 p-6'>
                      <span
                        className={clsx('fs-4 fw-semibold pb-1 px-2', {
                          'text-secondary': points.membershipLevel == 'Bronze',
                          'text-gray-700': points.membershipLevel == 'Silver',
                          'text-warning': points.membershipLevel == 'Gold',
                          'text-white': points.membershipLevel == 'Diamond',
                        })}
                      >
                        {points.membershipLevel}
                      </span>
                      <span className='fs-lg-2tx fw-bold d-flex justify-content-center'>
                        <CountUp delay={0} end={points.totalPoints} duration={1} />
                      </span>
                    </div>
                  </div>
                )
              })}
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default MemberCode

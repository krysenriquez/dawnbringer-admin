import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import {QRCodeSVG} from 'qrcode.react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {toast} from 'react-toastify'

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
        <div className='card card-xl-stretch mb-xl-10'>
          <div className='card-header border-0 py-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Referral Code</span>
            </h3>
          </div>
          <div className='card-body d-flex flex-column'>
            <div className='flex-grow-1'>
              <div className='text-center mb-10'>
                <QRCodeSVG
                  value={memberInfo.code.referralLink}
                  size={180}
                  bgColor={'#ffffff'}
                  fgColor={'#000000'}
                  level={'H'}
                  includeMargin={false}
                  imageSettings={{
                    src: toAbsoluteUrl('/media/logos/le_reussi_rectangle.png'),
                    x: undefined,
                    y: undefined,
                    height: 63,
                    width: 120,
                    excavate: true,
                  }}
                />
              </div>
            </div>
            <div className='pt-5'>
              <div className='text-center fs-6 pb-5 '>
                <h4 className='text-gray-800 mb-0'>Your Referral Link</h4>
                <p className='fs-6 fw-semibold text-gray-600 py-4 m-0'>
                  Get product discounts and earn by sharing your QR Code or Referral Link
                </p>
                <input
                  id='kt_referral_link_input'
                  type='text'
                  className='form-control form-control-solid me-3 flex-grow-1'
                  name='search'
                  defaultValue={memberInfo.code.referralLink}
                  disabled
                />
              </div>
              <button
                className='btn btn-light-warning w-100 py-3'
                onClick={() => copyToClipBoard(memberInfo.code.referralLink)}
              >
                <span className='fw-bold'>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default MemberCode

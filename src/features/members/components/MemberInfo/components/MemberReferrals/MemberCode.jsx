import clsx from 'clsx'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
  useMemberInfoQueryContext,
} from '@/features/members/stores/MemberInfoQueryProvider'
import {QRCodeSVG} from 'qrcode.react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {updateCodeStatus} from '@/features/members/api'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const MemberCode = () => {
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()
  const {refetch} = useMemberInfoQueryContext()
  const swal = withReactContent(Swal)

  const copyToClipBoard = (referralLink) => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Link Copied!')
  }

  const handleDisable = (code) => {
    console.log(code)
    swal
      .fire({
        title: code.status == 'ACTIVE' ? 'Deactivate Code?' : 'Activate Code?',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: code.status == 'ACTIVE' ? 'Deactivate' : 'Activate',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await updateCodeStatus({
              code: code.code,
            })
            swal.fire('Code Status Updated!', response.message, 'success')
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.message)
          } finally {
            refetch()
          }
        }
      })
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
            {memberInfo.code.status == 'ACTIVE' ? (
              <>
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
                        height: 53,
                        width: 110,
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
                </div>
              </>
            ) : (
              <></>
            )}
            <div className='text-center pt-10'>
              <RolePermissionComponent moduleName='Members Management' permission='canUpdate'>
                <>
                  <button
                    className={clsx('btn py-3 px-6 me-3', {
                      'btn-light': memberInfo.code.status == 'ACTIVE',
                      'btn-light-success': memberInfo.code.status != 'ACTIVE',
                    })}
                    onClick={() => handleDisable(memberInfo.code)}
                  >
                    <span className='fw-bold'>
                      {memberInfo.code.status == 'ACTIVE' ? 'Disable Code' : 'Enable Code'}
                    </span>
                  </button>
                  {memberInfo.code.status == 'ACTIVE' ? (
                    <button
                      className='btn btn-light-warning py-3 px-6 me-3'
                      onClick={() => copyToClipBoard(memberInfo.code.referralLink)}
                    >
                      <span className='fw-bold'>Copy Link</span>
                    </button>
                  ) : (
                    <></>
                  )}
                </>
              </RolePermissionComponent>
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

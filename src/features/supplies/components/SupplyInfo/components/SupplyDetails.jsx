import {useIntl} from 'react-intl'
import {format} from 'date-fns'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import CustomCard from '@/components/elements/Card/CustomCard'

const SupplyDetails = () => {
  const intl = useIntl()
  const supplyInfo = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()

  return (
    <>
      {supplyInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid'
          hasHeader={true}
          header={<h2>Supply (#{supplyInfo.supplyNumber})</h2>}
          bodyClassName='pt-0'
        >
          <div className='table-responsive'>
            <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-250px'>
              <tbody className='fw-semibold text-gray-600'>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/general/calendar.svg'
                      />
                      Date Added
                    </div>
                  </td>
                  <td className='fw-bold text-end'>
                    {format(Date.parse(supplyInfo.created), 'dd/MM/yyyy')}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/ecommerce/scroll.svg'
                      />
                      Reference Number
                    </div>
                  </td>
                  <td className='fw-bold text-end'>{supplyInfo.referenceNumber}</td>
                </tr>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/communication/message.svg'
                      />
                      Comment
                    </div>
                  </td>
                  <td className='fw-bold text-end'>{supplyInfo.comment}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default SupplyDetails

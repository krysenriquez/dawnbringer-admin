import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import CustomCard from '@/components/elements/Card/CustomCard'

const SupplyDelivery = () => {
  const supply = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()

  return (
    <>
      {supply && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid'
          hasHeader={true}
          header={<h2>Delivery</h2>}
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
                        path='/media/icons/ecommerce/delivery.svg'
                      />
                      Tracking Number
                    </div>
                  </td>
                  <td className='fw-bold text-end'>{supply.trackingNumber}</td>
                </tr>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/communication/user.svg'
                      />
                      Carrier
                    </div>
                  </td>
                  <td className='fw-bold text-end'>{supply.carrier}</td>
                </tr>
                <tr>
                  <td className='text-muted'>
                    <div className='d-flex align-items-center'>
                      <CustomSVG
                        className='svg-icon svg-icon-2 me-2'
                        path='/media/icons/communication/mobile.svg'
                      />
                      Carrier Contact Number
                    </div>
                  </td>
                  <td className='fw-bold text-end'>{supply.carrierContactNumber}</td>
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
export default SupplyDelivery

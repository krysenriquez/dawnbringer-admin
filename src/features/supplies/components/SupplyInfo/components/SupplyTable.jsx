import {useNavigate} from 'react-router-dom'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const SupplyTable = () => {
  const navigate = useNavigate()
  const supplyInfo = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()

  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  const handleClick = (e) => {
    navigate(`/product-variants/` + e.variantSku, {
      state: {sku: e.variantSku},
    })
  }

  return (
    <>
      {supplyInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid overflow-hidden'
          hasHeader={true}
          header={<h2>Details</h2>}
          bodyClassName='pt-0'
        >
          <div className='table-responsive'>
            <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
              <thead>
                <tr className='text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                  <th className='min-w-175px'>Product</th>
                  <th className='min-w-100px text-end'>SKU</th>
                  <th className='min-w-70px text-end'>Qty</th>
                </tr>
              </thead>
              <tbody className='fw-semibold text-gray-600'>
                {supplyInfo.details.map((detail) => {
                  return (
                    <tr key={detail.variantSku}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-50px me-5 ps-4'>
                            <img
                              src={`${
                                detail.variantThumbnail ? detail.variantThumbnail : defaultThumbnail
                              }`}
                              className=''
                              alt=''
                            />
                          </div>
                          <div className='ms-5'>
                            <button
                              className='btn btn-flush btn-link btn-color-gray-700 btn-active-color-primary fw-bold text-end'
                              onClick={() => handleClick(detail)}
                            >
                              {detail.variantName}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>{detail.variantSku}</td>
                      <td className='text-end'>{detail.quantity}</td>
                    </tr>
                  )
                })}
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

export default SupplyTable

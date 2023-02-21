import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'

const SupplyBranchFrom = () => {
  const intl = useIntl()
  const supply = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()

  return (
    <>
      {supply && supply.branchFrom && !isLoading ? (
        <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
          <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
            <img src='/media/icons/ecommerce/cart.svg' className='w-175px' />
          </div>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Branch From</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <h4>{supply.branchFromName}</h4>
            {supply.branchFrom.address1} {supply.branchFrom.address2}
            <br />
            {supply.branchFrom.city} {supply.branchFrom.province} {supply.branchFrom.zip}
            <br />
            {supply.branchFrom.country}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
export default SupplyBranchFrom

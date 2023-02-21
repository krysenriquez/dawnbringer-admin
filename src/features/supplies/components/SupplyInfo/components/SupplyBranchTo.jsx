import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'

const SupplyBranchTo = () => {
  const intl = useIntl()
  const supply = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()

  return (
    <>
      {supply && supply.branchTo && !isLoading ? (
        <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
          <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
            <img src='/media/icons/ecommerce/delivery.svg' className='w-175px' />
          </div>
          <div className='card-header'>
            <div className='card-title'>
              <h2>Branch From</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <h4>{supply.branchToName}</h4>
            {supply.branchTo.address1} {supply.branchTo.address2}
            <br />
            {supply.branchTo.city} {supply.branchTo.province} {supply.branchTo.zip}
            <br />
            {supply.branchTo.country}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
export default SupplyBranchTo

import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import {toCurrency} from '@/utils/toCurrency'
import CustomCard from '@/components/elements/Card/CustomCard'

const TotalSales = () => {
  const {totalSales} = useDashboard()

  return (
    <>
      {totalSales && (
        <CustomCard cardClassName='card card-flush h-md-100' hasHeader={false}>
          <>
            <span className='symbol  symbol-75px'>
              <span className='symbol-label bg-light-success'>
                <i className='fa-solid fa-money-bill text-success fs-2x' />
              </span>
            </span>
            <div className='text-white fw-bold fs-3x mb-2 mt-5 text-success'>
              {toCurrency(totalSales.total)}
            </div>
            <div className='fw-semibold text-white fs-3'>{totalSales.description}</div>
          </>
        </CustomCard>
      )}
    </>
  )
}

export default TotalSales

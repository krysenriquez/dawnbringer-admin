import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const CustomersCount = () => {
  const {customersCount} = useDashboard()

  return (
    <>
      {customersCount && (
        <CustomCard cardClassName='card card-flush h-md-100' hasHeader={false}>
          <>
            <span className='symbol  symbol-75px'>
              <span className='symbol-label bg-light-info'>
                <i className='fa fa-user-tag text-info fs-2x' />
              </span>
            </span>
            <div className='text-white fw-bold fs-3x mb-2 mt-5 text-info'>
              {customersCount.total}
            </div>
            <div className='fw-semibold text-white fs-3'>{customersCount.description}</div>
          </>
        </CustomCard>
      )}
    </>
  )
}

export default CustomersCount

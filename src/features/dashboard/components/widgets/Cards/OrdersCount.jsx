import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const OrdersCount = () => {
  const {ordersCount} = useDashboard()

  return (
    <>
      {ordersCount && (
        <CustomCard cardClassName='card card-flush h-md-100' hasHeader={false}>
          <>
            <span className='symbol  symbol-75px'>
              <span className='symbol-label bg-light-warning'>
                <i className='fa fa-cart-shopping text-warning fs-2x' />
              </span>
            </span>
            <div className='text-white fw-bold fs-3x mb-2 mt-5 text-warning'>
              {ordersCount.total}
            </div>
            <div className='fw-semibold text-white fs-3'>{ordersCount.description}</div>
          </>
        </CustomCard>
      )}
    </>
  )
}

export default OrdersCount

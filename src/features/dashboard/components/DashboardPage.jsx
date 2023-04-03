import OrderSalesSummary from './widgets/Charts/OrderSalesSummary'
import OrdersCountSummary from './widgets/Charts/OrdersCountSummary'
import VariantTotalSales from './widgets/Charts/VariantTotalSales'
import VariantQuantitySold from './widgets/Charts/VariantQuantitySold'
import VariantStocksTable from './widgets/Tables/VariantStocks/VariantStocksTable'
import PendingOrdersTable from './widgets/Tables/PendingOrders/PendingOrdersTable'
import MembersCount from './widgets/Cards/MembersCount'
import CustomersCount from './widgets/Cards/CustomersCount'
import OrdersCount from './widgets/Cards/OrdersCount'
import TotalSales from './widgets/Cards/TotalSales'
import {PageAction} from '@/providers/PageDataProvider'
import DashboardActions from '../components/widgets/DashboardActions'

const DashboardPage = () => {
  return (
    <>
      <PageAction>
        <DashboardActions />
      </PageAction>
      <div className='row g-5 g-xl-10 mb-xl-10'>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-0'>
          <TotalSales />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-0'>
          <OrdersCount />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-0'>
          <CustomersCount />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-0'>
          <MembersCount />
        </div>
      </div>
      <div className='row g-5 g-xl-10 mb-xl-10'>
        <div className='col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0'>
          <OrderSalesSummary />
        </div>
        <div className='col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0'>
          <OrdersCountSummary />
        </div>
      </div>
      <div className='row g-5 g-xl-10 mb-xl-10'>
        <div className='col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0'>
          <VariantTotalSales />
        </div>
        <div className='col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0'>
          <VariantQuantitySold />
        </div>
      </div>
      <div className='row g-5 g-xl-10 mb-xl-10'>
        <div className='col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0'>
          <VariantStocksTable />
        </div>
        <div className='col-lg-12 col-xl-12 col-xxl-6 mb-5 mb-xl-0'>
          <PendingOrdersTable />
        </div>
      </div>
    </>
  )
}

export default DashboardPage

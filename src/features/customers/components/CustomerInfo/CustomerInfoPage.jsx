import {
  useCustomerInfoQueryData,
  useCustomerInfoQueryLoading,
} from '@/features/customers/stores/CustomerInfoQueryProvider'
import CustomerDetails from './components/CustomerDetails'
import CustomerOrdersTable from './components/CustomerOrders/CustomerOrdersTable'

const CustomerInfoPage = () => {
  const customerInfo = useCustomerInfoQueryData()
  const isLoading = useCustomerInfoQueryLoading()

  return (
    <>
      {Object.keys(customerInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-lg-row gap-5'>
            <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-xl-350px'>
              <CustomerDetails />
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
              <CustomerOrdersTable />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default CustomerInfoPage

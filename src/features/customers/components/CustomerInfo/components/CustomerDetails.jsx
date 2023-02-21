import {useIntl} from 'react-intl'
import CustomCard from '@/components/elements/Card/CustomCard'
import {
  useCustomerInfoQueryData,
  useCustomerInfoQueryLoading,
} from '@/features/customers/stores/CustomerInfoQueryProvider'

const CustomerDetails = () => {
  const intl = useIntl()
  const customer = useCustomerInfoQueryData()
  const isLoading = useCustomerInfoQueryLoading()

  return (
    <>
      {customer && !isLoading ? (
        <CustomCard cardClassName='mb-5 mb-xl-8' hasHeader={false} bodyClassName='pb-5'>
          <div className='py-5 fs-6'>
            <div className='fw-bold'>Customer Number</div>
            <div className='text-gray-600'>{customer.customerNumber}</div>
            <div className='fw-bold mt-5'>Customer Name</div>
            <div className='text-gray-600'>{customer.name}</div>
            <div className='fw-bold mt-5'>Email Address</div>
            <div className='text-gray-600'>{customer.emailAddress}</div>
            <div className='fw-bold mt-5'>Contact Number</div>
            <div className='text-gray-600'>{customer.contactNumber}</div>
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default CustomerDetails

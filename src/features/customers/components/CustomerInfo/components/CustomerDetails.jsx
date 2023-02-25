import {useIntl} from 'react-intl'
import CustomCard from '@/components/elements/Card/CustomCard'
import {
  useCustomerInfoQueryData,
  useCustomerInfoQueryLoading,
} from '@/features/customers/stores/CustomerInfoQueryProvider'

const CustomerDetails = () => {
  const intl = useIntl()
  const customerInfo = useCustomerInfoQueryData()
  const isLoading = useCustomerInfoQueryLoading()

  return (
    <>
      {customerInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          hasToolbar={false}
          bodyClassName='pt-0'
        >
          <div className='py-5 fs-6'>
            <div className='fw-bold'>Customer Number</div>
            <div className='text-gray-600'>{customerInfo.customerNumber}</div>
            <div className='fw-bold mt-5'>Customer Name</div>
            <div className='text-gray-600'>{customerInfo.name}</div>
            <div className='fw-bold mt-5'>Email Address</div>
            <div className='text-gray-600'>{customerInfo.emailAddress}</div>
            <div className='fw-bold mt-5'>Contact Number</div>
            <div className='text-gray-600'>{customerInfo.contactNumber}</div>
          </div>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default CustomerDetails

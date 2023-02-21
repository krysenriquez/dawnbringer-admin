import {CustomerInfoQueryProvider} from '../stores/CustomerInfoQueryProvider'
import CustomerInfoPage from '../components/CustomerInfo/CustomerInfoPage'

const CustomerInfo = () => {
  return (
    <CustomerInfoQueryProvider>
      <CustomerInfoPage />
    </CustomerInfoQueryProvider>
  )
}

export default CustomerInfo

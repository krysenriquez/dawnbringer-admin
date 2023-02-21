import {CustomersListQueryProvider} from '../stores/CustomersListQueryProvider'
import CustomersListTable from '../components/CustomersList/CustomersListTable'

const CustomersList = () => {
  return (
    <CustomersListQueryProvider>
      <CustomersListTable />
    </CustomersListQueryProvider>
  )
}

export default CustomersList

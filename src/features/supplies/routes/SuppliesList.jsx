import {SuppliesListQueryProvider} from '../stores/SuppliesListQueryProvider'
import SuppliesListTable from '../components/SuppliesList/SuppliesListTable'

const SuppliesList = () => {
  return (
    <>
      <SuppliesListQueryProvider>
        <SuppliesListTable />
      </SuppliesListQueryProvider>
    </>
  )
}

export default SuppliesList

import {CashoutsListQueryProvider} from '../stores/CashoutsListQueryProvider'
import CashoutsListTable from '../components/CashoutsList/CashoutsListTable'

const CashoutsList = () => {
  return (
    <CashoutsListQueryProvider>
      <CashoutsListTable />
    </CashoutsListQueryProvider>
  )
}

export default CashoutsList

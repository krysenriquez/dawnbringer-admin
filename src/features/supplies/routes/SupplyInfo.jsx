import {SupplyInfoQueryProvider} from '../stores/SupplyInfoQueryProvider'
import SupplyInfoPage from '../components/SupplyInfo/SupplyInfoPage'

const SupplyInfo = () => {
  return (
    <SupplyInfoQueryProvider>
      <SupplyInfoPage />
    </SupplyInfoQueryProvider>
  )
}

export default SupplyInfo

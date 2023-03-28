import {CashoutInfoQueryProvider} from '../stores/CashoutInfoQueryProvider'
import CashoutInfoPage from '../components/CashoutInfo/CashoutInfoPage'

const CashoutInfo = () => {
  return (
    <>
      <CashoutInfoQueryProvider>
        <CashoutInfoPage />
      </CashoutInfoQueryProvider>
    </>
  )
}

export default CashoutInfo

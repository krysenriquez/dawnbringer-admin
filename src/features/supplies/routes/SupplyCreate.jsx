import {SupplyCreateProvider} from '../stores/SupplyCreateProvider'
import SupplyCreateForm from '../components/SupplyCreate/SupplyCreateForm'

const SupplyCreate = () => {
  return (
    <>
      <SupplyCreateProvider>
        <SupplyCreateForm />
      </SupplyCreateProvider>
    </>
  )
}

export default SupplyCreate

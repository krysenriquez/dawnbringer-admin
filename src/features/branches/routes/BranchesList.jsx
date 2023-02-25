import {BranchesListQueryProvider} from '../stores/BranchesListQueryProvider'
import BranchesListTable from '../components/BranchesList/BranchesListTable'

const BranchesList = () => {
  return (
    <BranchesListQueryProvider>
      <BranchesListTable />
    </BranchesListQueryProvider>
  )
}

export default BranchesList

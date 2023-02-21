import {BranchesListQueryProvider} from '../stores/BranchesListQueryProvider'
import BranchesListTable from '../components/Branches/BranchesList/BranchesListTable'

const BranchesList = () => {
  return (
    <BranchesListQueryProvider>
      <BranchesListTable />
    </BranchesListQueryProvider>
  )
}

export default BranchesList

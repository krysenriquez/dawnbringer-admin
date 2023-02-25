import {BranchInfoQueryProvider} from '../stores/BranchesInfoQueryProvider'
import BranchInfoPage from '../components/BranchInfo/BranchInfoPage'

const BranchInfo = () => {
  return (
    <BranchInfoQueryProvider>
      <BranchInfoPage />
    </BranchInfoQueryProvider>
  )
}

export default BranchInfo

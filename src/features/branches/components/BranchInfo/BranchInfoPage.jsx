import {
  useBranchInfoQueryData,
  useBranchInfoQueryLoading,
} from '@/features/branches/stores/BranchesInfoQueryProvider'
import BranchDetails from './components/BranchDetails'

import BranchUsersTable from './components/BranchUsers/BranchUsersTable'

const BranchInfoPage = () => {
  const branchInfo = useBranchInfoQueryData()
  const isLoading = useBranchInfoQueryLoading()

  return (
    <>
      {Object.keys(branchInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-lg-row gap-5'>
            <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-xl-350px'>
              <BranchDetails />
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
              <BranchUsersTable />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default BranchInfoPage

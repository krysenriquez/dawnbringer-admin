import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useBranchInfoQueryData,
  useBranchInfoQueryLoading,
} from '@/features/branches/stores/BranchesInfoQueryProvider'
import BranchDetails from './components/BranchDetails'
import BranchUsersTable from './components/BranchUsers/BranchUsersTable'
import HistoriesTable from './components/Histories/HistoriesTable'

const BranchInfoPage = () => {
  const branchInfo = useBranchInfoQueryData()
  const isLoading = useBranchInfoQueryLoading()
  const [tab, setTab] = useState('users')

  return (
    <>
      {Object.keys(branchInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-lg-row gap-5'>
            <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-xl-350px'>
              <BranchDetails />
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
              <CustomTabs
                className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold'
                defaultActiveKey='users'
                activeKey={tab}
                onSelect={(k) => setTab(k)}
              >
                <Tab
                  eventKey='users'
                  title='Users'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'users' ? <BranchUsersTable /> : <></>}
                </Tab>
                <Tab
                  eventKey='histories'
                  title='History'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'histories' ? <HistoriesTable /> : <></>}
                </Tab>
              </CustomTabs>
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

import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useUserInfoQueryData,
  useUserInfoQueryLoading,
} from '@/features/users/stores/UserInfoQueryProvider'
import UserDetails from './components/UserDetails'
import UserBranchesListTable from './components/UserBranches/UserBranchesListTable'

const BranchInfoPage = () => {
  const userInfo = useUserInfoQueryData()
  const isLoading = useUserInfoQueryLoading()
  const [tab, setTab] = useState('assignments')

  return (
    <>
      {Object.keys(userInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-lg-row gap-5'>
            <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-xl-350px'>
              <UserDetails />
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid'>
              <CustomTabs
                className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
                defaultActiveKey='assignments'
                activeKey={tab}
                onSelect={(k) => setTab(k)}
              >
                <Tab eventKey='assignments' title='Assignments'>
                  {tab == 'assignments' ? (
                    <>
                      <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
                        <UserBranchesListTable />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
                {/* <Tab eventKey='permissions' title='Permissions'>
                  {tab == 'permissions' ? (
                    <>
                      <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
                        <MemberCode />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
                <Tab eventKey='logs' title='Logs'>
                  {tab == 'logs' ? <><MemberActivitiesTable /></> : <></>}
                </Tab> */}
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

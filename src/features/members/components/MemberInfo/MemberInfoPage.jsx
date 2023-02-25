import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import MemberDetails from './components/MemberDetails'
import MemberCode from './components/MemberCode'
import MemberOrdersTable from './components/MemberOrders/MemberOrdersTable'
import MemberActivitiesTable from './components/MemberActivities/MemberActivitiesTable'

const MemberInfoPage = () => {
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()
  const [tab, setTab] = useState('orders')

  return (
    <>
      {Object.keys(memberInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-lg-row gap-5'>
            <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-xl-350px'>
              <MemberDetails />
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid'>
              <CustomTabs
                className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
                defaultActiveKey='orders'
                activeKey={tab}
                onSelect={(k) => setTab(k)}
              >
                <Tab eventKey='orders' title='Orders'>
                  {tab == 'orders' ? (
                    <>
                      <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
                        <MemberOrdersTable />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
                <Tab eventKey='referrals' title='Referrals'>
                  {tab == 'referrals' ? (
                    <>
                      <div className='d-flex flex-column flex-lg-row-fluid ms-lg-7 ms-xl-1 gap-7 gap-lg-10'>
                        <MemberCode />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
                <Tab eventKey='activities' title='Activities'>
                  {tab == 'activities' ? (
                    <>
                      <MemberActivitiesTable />
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
              </CustomTabs>
            </div>
          </div>
        </>
      ) : (
        <>
          <>
            <div className='text-center'>
              <h2>No Record Found</h2>
            </div>
          </>
        </>
      )}
    </>
  )
}

export default MemberInfoPage

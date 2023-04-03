import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
} from '@/features/members/stores/MemberInfoQueryProvider'
import {MemberPointsQueryProvider} from '../../stores/MemberPointsQueryProvider'
import {MemberUserInfoQueryProvider} from '../../stores/MemberUserInfoQueryProviders'
import CustomCard from '@/components/elements/Card/CustomCard'
import MemberDetails from './components/MemberDetails'
import MemberCode from './components/MemberReferrals/MemberCode'
import MemberPoints from './components/MemberReferrals/MemberPoints'
import MemberOrdersTable from './components/MemberOrders/MemberOrdersTable'
import MemberActivitiesTable from './components/MemberActivities/MemberActivitiesTable'
import ChangeUsername from './components/MemberAuth/Username/ChangeUsername'
import ChangeEmailAddress from './components/MemberAuth/EmailAddress/ChangeEmaillAddress'
import ChangePassword from './components/MemberAuth/Password/ChangePassword'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const MemberInfoPage = () => {
  const memberInfo = useMemberInfoQueryData()
  const isLoading = useMemberInfoQueryLoading()
  const [tab, setTab] = useState('orders')
  const {permissions} = usePermissions()

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
                        <div className='row g-5 g-xl-8 mb-5 mb-xl-2'>
                          <div className='col-6'>
                            <MemberCode />
                          </div>
                          <div className='col-6'>
                            <MemberPointsQueryProvider>
                              <MemberPoints />
                            </MemberPointsQueryProvider>
                          </div>
                        </div>
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
                <Tab
                  eventKey='advanced'
                  title='Advanced'
                  disabled={
                    !getRolePermission({
                      moduleName: 'Members Management',
                      permissions: permissions,
                      permission: 'canUpdate',
                    })
                  }
                >
                  {tab == 'advanced' ? (
                    <>
                      {/* <RolePermissionComponent
                        moduleName='Members Management'
                        permission='canUpdate'
                      > */}
                      <CustomCard
                        cardClassName='card-flush mb-5 mb-xl-8'
                        hasHeader={true}
                        header={<h2>Summary</h2>}
                        bodyClassName='pt-0'
                      >
                        <>
                          <MemberUserInfoQueryProvider>
                            <ChangeUsername />
                            <div className='separator separator-dashed my-6' />
                            <ChangeEmailAddress />
                            <div className='separator separator-dashed my-6' />
                            <ChangePassword />
                          </MemberUserInfoQueryProvider>
                        </>
                      </CustomCard>
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

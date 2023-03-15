import {useState} from 'react'
import {useRoleInfoQueryData, useRoleInfoQueryLoading} from '../../stores/RoleInfoQueryProvider'
import RoleDetails from './components/RoleDetails'
import UsersListTable from './components/Users/UsersListTable'

const RoleInfoPage = () => {
  const userTypeInfo = useRoleInfoQueryData()
  const isLoading = useRoleInfoQueryLoading()

  return (
    <>
      {Object.keys(userTypeInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-lg-row gap-5'>
            <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-xl-350px'>
              <RoleDetails />
            </div>
            <div className='d-flex flex-column flex-lg-row-fluid'>
              <UsersListTable />
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

export default RoleInfoPage

import {UserInfoQueryProvider} from '../stores/UserInfoQueryProvider'
import UserInfoPage from '../components/UserInfo/UserInfoPage'

const BranchInfo = () => {
  return (
    <UserInfoQueryProvider>
      <UserInfoPage />
    </UserInfoQueryProvider>
  )
}

export default BranchInfo

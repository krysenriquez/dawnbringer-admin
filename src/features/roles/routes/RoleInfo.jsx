import {RoleInfoQueryProvider} from '../stores/RoleInfoQueryProvider'
import RoleInfoPage from '../components/RoleInfo/RoleInfoPage'

const RoleInfo = () => {
  return (
    <RoleInfoQueryProvider>
      <RoleInfoPage />
    </RoleInfoQueryProvider>
  )
}

export default RoleInfo

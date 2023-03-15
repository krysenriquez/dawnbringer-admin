import {RolesListQueryProvider} from '../stores/RolesListQueryProvider'
import RolesListTable from '../components/RolesList/RolesListTable'

const RolesList = () => {
  return (
    <RolesListQueryProvider>
      <RolesListTable />
    </RolesListQueryProvider>
  )
}

export default RolesList

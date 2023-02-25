import {UsersListQueryProvider} from '../stores/UsersListQueryProvider'
import UsersListTable from '../components/UsersList/UsersListTable'

const BranchesList = () => {
  return (
    <UsersListQueryProvider>
      <UsersListTable />
    </UsersListQueryProvider>
  )
}

export default BranchesList

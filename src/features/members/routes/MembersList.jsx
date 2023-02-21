import {MembersListQueryProvider} from '../stores/MembersListQueryProvider'
import MembersListTable from '../components/MembersList/MembersListTable'

const MembersList = () => {
  return (
    <MembersListQueryProvider>
      <MembersListTable />
    </MembersListQueryProvider>
  )
}

export default MembersList

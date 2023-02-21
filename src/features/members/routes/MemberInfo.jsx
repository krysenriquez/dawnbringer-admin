import {MemberInfoQueryProvider} from '../stores/MemberInfoQueryProvider'
import MemberInfoPage from '../components/MemberInfo/MemberInfoPage'

const MemberInfo = () => {
  return (
    <MemberInfoQueryProvider>
      <MemberInfoPage />
    </MemberInfoQueryProvider>
  )
}

export default MemberInfo

import {AccountInfoQueryProvider} from '../stores/AccountInfoQueryProvider'

import AccountInfoPage from '../components/AccountInfoPage'

const AccountInfo = () => {
  return (
    <AccountInfoQueryProvider>
      <AccountInfoPage />
    </AccountInfoQueryProvider>
  )
}

export default AccountInfo

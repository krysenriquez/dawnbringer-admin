import ResetPasswordForm from '../components/ResetPasswordForm'
import {ResetPasswordProvider} from '../stores/ResetPasswordProvider'

const ResetPassword = () => {
  return (
    <ResetPasswordProvider>
      <ResetPasswordForm />
    </ResetPasswordProvider>
  )
}

export default ResetPassword

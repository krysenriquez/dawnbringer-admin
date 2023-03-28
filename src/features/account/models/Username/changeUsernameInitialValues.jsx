import changeUsernameFormModel from './changeUsernameFormModel'
const {
  formField: {
    user: {username, confirmPassword},
  },
} = changeUsernameFormModel

export default {
  user: {
    [username.key]: '',
    [confirmPassword.key]: '',
  },
}

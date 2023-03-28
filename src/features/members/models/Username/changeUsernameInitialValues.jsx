import changeUsernameFormModel from './changeUsernameFormModel'
const {
  formField: {
    user: {username, adminPassword},
  },
} = changeUsernameFormModel

export default {
  user: {
    [username.key]: '',
    [adminPassword.key]: '',
  },
}

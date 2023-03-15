import userCreateFormModel from './userCreateFormModel'
const {
  formField: {username, displayName, userType, emailAddress, password, repeatPassword, isActive},
} = userCreateFormModel

export default {
  [username.key]: '',
  [displayName.key]: '',
  [userType.key]: '',
  [emailAddress.key]: '',
  [password.key]: '',
  [repeatPassword.key]: '',
  [isActive.key]: false,
}

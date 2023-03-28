import changePasswordFormModel from './changePasswordFormModel'
const {
  formField: {
    user: {adminPassword, newPassword, confirmNewPassword},
  },
} = changePasswordFormModel

export default {
  user: {
    [adminPassword.key]: '',
    [newPassword.key]: '',
    [confirmNewPassword.key]: '',
  },
}

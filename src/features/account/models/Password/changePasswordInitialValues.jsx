import changePasswordFormModel from './changePasswordFormModel'
const {
  formField: {
    user: {currentPassword, newPassword, confirmNewPassword},
  },
} = changePasswordFormModel

export default {
  user: {
    [currentPassword.key]: '',
    [newPassword.key]: '',
    [confirmNewPassword.key]: '',
  },
}

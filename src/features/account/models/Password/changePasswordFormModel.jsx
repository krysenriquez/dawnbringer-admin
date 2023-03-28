export default {
  formId: 'changePasswordForm',
  formField: {
    user: {
      currentPassword: {
        key: 'currentPassword',
        name: 'user.currentPassword',
        label: 'Current Password',
        requiredErrorMsg: 'Current Password is required',
      },
      newPassword: {
        key: 'newPassword',
        name: 'user.newPassword',
        label: 'New Password',
        requiredErrorMsg: 'New Password is required',
      },
      confirmNewPassword: {
        key: 'confirmNewPassword',
        name: 'user.confirmNewPassword',
        label: 'Confirm New Password',
        requiredErrorMsg: 'Confirm New Password is required',
        invalidErrorMsg: 'Passwords must match',
      },
    },
  },
}

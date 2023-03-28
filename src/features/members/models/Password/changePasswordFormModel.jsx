export default {
  formId: 'changePasswordForm',
  formField: {
    user: {
      adminPassword: {
        key: 'adminPassword',
        name: 'user.adminPassword',
        label: 'Admin Password',
        requiredErrorMsg: 'Admin Password is required',
      },
      newPassword: {
        key: 'newPassword',
        name: 'user.newPassword',
        label: 'New Member Password',
        requiredErrorMsg: 'New Member Password is required',
      },
      confirmNewPassword: {
        key: 'confirmNewPassword',
        name: 'user.confirmNewPassword',
        label: 'Confirm New Member Password',
        requiredErrorMsg: 'Confirm New Member Password is required',
        invalidErrorMsg: 'Passwords must match',
      },
    },
  },
}

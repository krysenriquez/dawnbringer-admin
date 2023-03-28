export default {
  formId: 'changeUsernameForm',
  formField: {
    user: {
      username: {
        key: 'username',
        name: 'user.username',
        label: 'Username',
        min: 8,
        max: 20,
        requiredErrorMsg: 'Username is required',
      },
      adminPassword: {
        key: 'adminPassword',
        name: 'user.adminPassword',
        label: 'Confirm Admin Password',
        requiredErrorMsg: 'Admin Password is required',
      },
    },
  },
}

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
      confirmPassword: {
        key: 'confirmPassword',
        name: 'user.confirmPassword',
        label: 'Confirm Password',
        requiredErrorMsg: 'Password is required',
      },
    },
  },
}

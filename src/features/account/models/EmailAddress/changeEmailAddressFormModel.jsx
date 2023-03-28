export default {
  formId: 'changeEmailAddressForm',
  formField: {
    user: {
      emailAddress: {
        key: 'emailAddress',
        name: 'user.emailAddress',
        label: 'Email Address',
        requiredErrorMsg: 'Email Address is required',
        invalidErrorMsg: 'Invalid Email format',
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

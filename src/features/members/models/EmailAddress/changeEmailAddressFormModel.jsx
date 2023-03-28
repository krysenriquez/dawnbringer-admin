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
      adminPassword: {
        key: 'adminPassword',
        name: 'user.adminPassword',
        label: 'Confirm Admin Password',
        requiredErrorMsg: 'Admin Password is required',
      },
    },
  },
}

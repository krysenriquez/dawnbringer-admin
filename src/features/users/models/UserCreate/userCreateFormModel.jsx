export default {
  formId: 'userCreateForm',
  formField: {
    username: {
      key: 'username',
      name: 'username',
      label: 'Username',
      min: 8,
      max: 20,
      requiredErrorMsg: 'Username is required',
    },
    displayName: {
      key: 'displayName',
      name: 'displayName',
      label: 'Full Name',
      min: 8,
      max: 20,
      requiredErrorMsg: 'Full Name is required',
    },
    userType: {
      key: 'userType',
      name: 'userType',
      label: 'User Type',
      requiredErrorMsg: 'User Type is required',
    },
    emailAddress: {
      key: 'emailAddress',
      name: 'emailAddress',
      label: 'Email Address',
      requiredErrorMsg: 'Email Address is required',
      invalidErrorMsg: 'Invalid Email format',
    },
    password: {
      key: 'password',
      name: 'password',
      label: 'Password',
      requiredErrorMsg: 'Password is required',
    },
    repeatPassword: {
      key: 'repeatPassword',
      name: 'repeatPassword',
      label: 'Repeat Password',
      requiredErrorMsg: 'Repeat Password is required',
      invalidErrorMsg: 'Passwords must match',
    },
    isActive: {
      key: 'isActive',
      name: 'isActive',
      label: 'Is Active',
    },
  },
}

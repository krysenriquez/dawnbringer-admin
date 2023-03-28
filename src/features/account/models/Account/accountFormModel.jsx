export default {
  formId: 'profileForm',
  formField: {
    avatar: {
      key: 'avatar',
      name: 'avatar',
    },
    displayName: {
      key: 'displayName',
      name: 'displayName',
      label: 'Full Name',
      min: 5,
      max: 30,
      requiredErrorMsg: 'Full Name is required',
    },
  },
}

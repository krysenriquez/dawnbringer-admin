import changeEmailAddressFormModel from './changeEmailAddressFormModel'
const {
  formField: {
    user: {emailAddress, confirmPassword},
  },
} = changeEmailAddressFormModel

export default {
  user: {
    [emailAddress.key]: '',
    [confirmPassword.key]: '',
  },
}

import changeEmailAddressFormModel from './changeEmailAddressFormModel'
const {
  formField: {
    user: {emailAddress, adminPassword},
  },
} = changeEmailAddressFormModel

export default {
  user: {
    [emailAddress.key]: '',
    [adminPassword.key]: '',
  },
}

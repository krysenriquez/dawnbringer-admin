import {string, object} from 'yup'

import changeEmailAddressFormModel from './changeEmailAddressFormModel'
const {
  formField: {
    user: {emailAddress, adminPassword},
  },
} = changeEmailAddressFormModel

export default object().shape({
  user: object({
    [emailAddress.key]: string()
      .email(`${emailAddress.invalidErrorMsg}`)
      .required(`${emailAddress.requiredErrorMsg}`),
    [adminPassword.key]: string().required(`${adminPassword.requiredErrorMsg}`),
  }),
})

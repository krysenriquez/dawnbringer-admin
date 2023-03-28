import {string, object} from 'yup'

import changeEmailAddressFormModel from './changeEmailAddressFormModel'
const {
  formField: {
    user: {emailAddress, confirmPassword},
  },
} = changeEmailAddressFormModel

export default object().shape({
  user: object({
    [emailAddress.key]: string()
      .email(`${emailAddress.invalidErrorMsg}`)
      .required(`${emailAddress.requiredErrorMsg}`),
    [confirmPassword.key]: string().required(`${confirmPassword.requiredErrorMsg}`),
  }),
})

import {string, object} from 'yup'

import changeUsernameFormModel from './changeUsernameFormModel'
const {
  formField: {
    user: {username, adminPassword},
  },
} = changeUsernameFormModel

export default object().shape({
  user: object({
    [username.key]: string()
      .trim()
      .required(`${username.requiredErrorMsg}`)
      .min(username.min, `${username.label} must be a minimum of ${username.min} characters`)
      .max(username.max, `${username.label} must be a maximum of ${username.max} characters`),
    [adminPassword.key]: string().required(`${adminPassword.requiredErrorMsg}`),
  }),
})

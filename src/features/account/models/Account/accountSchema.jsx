import {string, object, array, date} from 'yup'

import profileFormModel from './accountFormModel'
const {
  formField: {avatar, displayName},
} = profileFormModel

export default object().shape({
  [avatar.key]: string(),
  [displayName.key]: string()
    .required(`${displayName.requiredErrorMsg}`)
    .min(displayName.min, `${displayName.label} must be a minimum of ${displayName.min} characters`)
    .max(
      displayName.max,
      `${displayName.label} must be a maximum of ${displayName.max} characters`
    ),
})

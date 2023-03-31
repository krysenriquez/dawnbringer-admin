import {string, object, ref, boolean} from 'yup'
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)
import {checkEmailAddress, checkUsername} from '../../api'
import userCreateFormModel from './userCreateFormModel'
const {
  formField: {username, displayName, userType, emailAddress, password, repeatPassword, isActive},
} = userCreateFormModel

const validateUsername = async (ctx) => {
  console.log(ctx.parent)
  return await checkUsername(ctx.parent.username)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: username.name, message: err.response.data.detail})
    })
}

const validateEmailAddress = async (ctx) => {
  return await checkEmailAddress(ctx.parent.emailAddress)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: emailAddress.name, message: err.response.data.detail})
    })
}

export default object().shape({
  [username.key]: string()
    .trim()
    .required(`${username.requiredErrorMsg}`)
    .min(username.min, `${username.label} must be a minimum of ${username.min} characters`)
    .max(username.max, `${username.label} must be a maximum of ${username.max} characters`)
    .test({
      name: 'is-valid-username',
      test: (value, ctx) => validateUsername(ctx),
      exclusive: true,
    }),
  [displayName.key]: string()
    .required(`${displayName.requiredErrorMsg}`)
    .min(8, 'Full Name must be at least 8 characters'),
  [userType.key]: string().required(`${userType.requiredErrorMsg}`),
  [emailAddress.key]: string()
    .email(`${emailAddress.invalidErrorMsg}`)
    .required(`${emailAddress.requiredErrorMsg}`)
    .test({
      name: 'is-valid-email-address',
      test: (value, ctx) => validateEmailAddress(ctx),
      exclusive: true,
    }),
  [password.key]: string()
    .min(8, 'Password must be at least 8 characters')
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minSymbols(1, 'Password must contain at least 1 special character')
    .required(`${password.requiredErrorMsg}`),
  [repeatPassword.key]: string()
    .required(`${repeatPassword.requiredErrorMsg}`)
    .oneOf([ref('password'), null], `${repeatPassword.invalidErrorMsg}`),
  [isActive.key]: boolean(),
})

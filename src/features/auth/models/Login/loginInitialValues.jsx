import loginFormModel from './loginFormModel'

const {
  formField: {username, password},
} = loginFormModel

export default {
  [username.key]: '',
  [password.key]: '',
}

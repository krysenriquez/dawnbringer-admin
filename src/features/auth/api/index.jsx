import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_PATH = import.meta.env.VITE_API_PATH



const AUTH_URL = `${API_URL}/vanguard`

const GET_USER_BY_ACCESSTOKEN_URL = `${AUTH_URL}/whoami/`
const LOGIN_URL = `${AUTH_URL}/dblogin/`
const REFRESH_URL = `${AUTH_URL}/refresh/`

const FORGOT_PASSWORD_URL = `${AUTH_URL}/forgotpassword/`
const VERIFY_FORGOT_PASSWORD_URL = `${AUTH_URL}/verifyforgotpassword/`

const USERS_URL = `${API_URL}/users`
const RESET_PASSWORD_URL = `${USERS_URL}/resetpassword/`

export function login(username, password) {
  return axios.post(LOGIN_URL, {username, password})
}

export function refreshToken(refresh) {
  return axios.post(`${REFRESH_URL}`, {
    refresh,
  })
}

export function getUserByToken(token) {
  return axios.post(`${GET_USER_BY_ACCESSTOKEN_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function requestResetPassword(values) {
  return axios.post(`${FORGOT_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

export function verifyForgotPassword(values) {
  return axios
    .post(`${VERIFY_FORGOT_PASSWORD_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export function resetPassword(values, token) {
  let config = {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  }
  return axios.post(`${RESET_PASSWORD_URL}`, humps.decamelizeKeys(values), config)
}

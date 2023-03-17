import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const USERS_URL = `${API_URL}/users`
export const GET_USER_TYPES_OPTIONS_URL = `${USERS_URL}/getusertypesoptions/`
export const GET_USERS_URL = `${USERS_URL}/getusers/`
export const GET_USER_INFO_URL = `${USERS_URL}/getuser/`
const UPDATE_BRANCH_ASSIGNMENTS_URL = `${USERS_URL}/updatebranchassignments/`
const CREATE_USER_URL = `${USERS_URL}/createuser/`
const VERIFY_USERNAME_URL = `${USERS_URL}/checkusername/`
const VERIFY_EMAIL_URL = `${USERS_URL}/checkemailaddress/`

export const getUserTypes = () => {
  return axios.get(`${GET_USER_TYPES_OPTIONS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getUsers = () => {
  return axios.get(`${GET_USERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getUserInfo = (userId) => {
  return axios
    .get(
      `${GET_USER_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          userId: userId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const updateBranchAssignments = (values) => {
  return axios.post(`${UPDATE_BRANCH_ASSIGNMENTS_URL}`, humps.decamelizeKeys(values))
}

export const createUser = (values) => {
  return axios.post(`${CREATE_USER_URL}`, humps.decamelizeKeys(values))
}

export const verifyUsername = (value) => {
  return axios.post(`${VERIFY_USERNAME_URL}`, {username: value})
}

export const verifyEmailAddress = (value) => {
  return axios.post(`${VERIFY_EMAIL_URL}`, {email_address: value})
}

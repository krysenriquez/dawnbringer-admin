import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const USER_URL = `${API_URL}/users`
export const GET_PROFILE_URL = `${USER_URL}/getuserprofile`
const UPDATE_PROFILE_URL = `${USER_URL}/updateuserprofile/`
const CHANGE_USERNAME_URL = `${USER_URL}/changeusername/`
const CHANGE_EMAIL_ADDRESS_URL = `${USER_URL}/changeemailaddress/`
const CHANGE_PASSWORD_URL = `${USER_URL}/changepassword/`

export const getUserProfile = () => {
  return axios.get(`${GET_PROFILE_URL}`).then((d) => humps.camelizeKeys(d.data[0]))
}

export const updateUserProfile = (values) => {
  return axios.post(`${UPDATE_PROFILE_URL}`, values, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const changeUsername = (values) => {
  return axios.post(`${CHANGE_USERNAME_URL}`, humps.decamelizeKeys(values))
}

export const changeEmailAddress = (values) => {
  return axios.post(`${CHANGE_EMAIL_ADDRESS_URL}`, humps.decamelizeKeys(values))
}

export const changePassword = (values) => {
  return axios.post(`${CHANGE_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

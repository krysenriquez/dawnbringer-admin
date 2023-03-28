import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ACCOUNTS_URL = `${API_URL}/accounts`

export const GET_MEMBERS_URL = `${ACCOUNTS_URL}/getmembers/`
export const GET_MEMBER_INFO_URL = `${ACCOUNTS_URL}/getmember/`
export const GET_MEMBER_USER_INFO_URL = `${ACCOUNTS_URL}/getmemberuser/`

const CORE_URL = `${API_URL}/core`
export const GET_MEMBER_MEMBERSHIP_LEVEL_POINTS = `${CORE_URL}/getadminmembershiplevelpoints/`

const USER_URL = `${API_URL}/users`
const VERIFY_USERNAME_URL = `${USER_URL}/checkusername/`
const CHANGE_USERNAME_URL = `${USER_URL}/changeusernameadmin/`
const VERIFY_EMAIL_ADDRESS_URL = `${USER_URL}/checkemailaddress/`
const CHANGE_EMAIL_ADDRESS_URL = `${USER_URL}/changeemailaddressadmin/`
const CHANGE_PASSWORD_URL = `${USER_URL}/changepasswordadmin/`

export const getMembers = () => {
  return axios.get(`${GET_MEMBERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getMember = (accountId) => {
  return axios
    .get(
      `${GET_MEMBER_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          accountId: accountId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getMemberMembershipLevelPoints = (accountId) => {
  return axios
    .post(
      `${GET_MEMBER_MEMBERSHIP_LEVEL_POINTS}`,
      humps.decamelizeKeys({
        accountId: accountId,
      })
    )
    .then((d) => humps.camelizeKeys(d.data))
}

export const getMemberUserInfo = (accountId) => {
  return axios
    .get(
      `${GET_MEMBER_USER_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          accountId: accountId,
        },
      })
    )
    .then((response) => humps.camelizeKeys(response.data[0]))
}

export const verifyUsername = (value) => {
  return axios.post(`${VERIFY_USERNAME_URL}`, {username: value})
}

export const changeUsername = (values) => {
  return axios.post(`${CHANGE_USERNAME_URL}`, humps.decamelizeKeys(values))
}

export const changeEmailAddress = (values) => {
  return axios.post(`${CHANGE_EMAIL_ADDRESS_URL}`, humps.decamelizeKeys(values))
}

export const verifyEmailAddress = (value) => {
  return axios.post(`${VERIFY_EMAIL_ADDRESS_URL}`, {email_address: value})
}

export const changePassword = (values) => {
  return axios.post(`${CHANGE_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const ACCOUNTS_URL = `${API_URL}/accounts/${API_SUFFIX}`
const CORE_URL = `${API_URL}/core/${API_SUFFIX}`
const USER_URL = `${API_URL}/users/${API_SUFFIX}`

export const GET_MEMBERS_URL = `${ACCOUNTS_URL}/getmembers/`
export const GET_MEMBER_INFO_URL = `${ACCOUNTS_URL}/getmember/`
export const GET_MEMBER_USER_INFO_URL = `${ACCOUNTS_URL}/getmemberuser/`
export const UPDATE_CODE_STATUS_URL = `${ACCOUNTS_URL}/updatecodestatus/`
export const GET_MEMBER_MEMBERSHIP_LEVEL_POINTS = `${CORE_URL}/getmembershiplevelpoints/`

const CHANGE_MEMBER_USERNAME_URL = `${USER_URL}/changememberusername/`
const CHANGE_MEMBER_EMAIL_ADDRESS_URL = `${USER_URL}/changememberemailaddress/`
const CHANGE_MEMBER_PASSWORD_URL = `${USER_URL}/changememberpassword/`

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

export const updateCodeStatus = (values) => {
  return axios
    .post(`${UPDATE_CODE_STATUS_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
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

export const changeMemberUsername = (values) => {
  return axios.post(`${CHANGE_MEMBER_USERNAME_URL}`, humps.decamelizeKeys(values))
}

export const changeMemberEmailAddress = (values) => {
  return axios.post(`${CHANGE_MEMBER_EMAIL_ADDRESS_URL}`, humps.decamelizeKeys(values))
}

export const changeMemberPassword = (values) => {
  return axios.post(`${CHANGE_MEMBER_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

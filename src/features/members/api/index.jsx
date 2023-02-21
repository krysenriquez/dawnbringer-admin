import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ACCOUNTS_URL = `${API_URL}/accounts
`
export const GET_MEMBERS_URL = `${ACCOUNTS_URL}/getmembers/`
export const GET_MEMBER_INFO_URL = `${ACCOUNTS_URL}/getmember/`

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

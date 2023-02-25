import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const USERS_URL = `${API_URL}/users`
export const GET_USERS_URL = `${USERS_URL}/getusers/`
export const GET_USER_INFO_URL = `${USERS_URL}/getuser/`
const UPDATE_BRANCH_ASSIGNMENTS_URL = `${USERS_URL}/updatebranchassignments/`

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

export function updateBranchAssignments(values) {
  return axios.post(`${UPDATE_BRANCH_ASSIGNMENTS_URL}`, humps.decamelizeKeys(values))
}

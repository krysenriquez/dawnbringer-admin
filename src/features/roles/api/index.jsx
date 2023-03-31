import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const USERS_URL = `${API_URL}/users/${API_SUFFIX}`

export const GET_USER_TYPES_URL = `${USERS_URL}/getusertypes/`
export const GET_USER_TYPE_INFO_URL = `${USERS_URL}/getusertype/`
const GET_MODULES_URL = `${USERS_URL}/getmodules/`
const UPDATE_ROLE_PERMISSIONS_URL = `${USERS_URL}/updaterolepermissions/`

export const getUserTypes = () => {
  return axios.get(`${GET_USER_TYPES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getUserTypeInfo = (userTypeId) => {
  return axios
    .get(
      `${GET_USER_TYPE_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          userTypeId: userTypeId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getModules = () => {
  return axios.get(`${GET_MODULES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function updateRolePermissions(values) {
  return axios.post(`${UPDATE_ROLE_PERMISSIONS_URL}`, humps.decamelizeKeys(values))
}

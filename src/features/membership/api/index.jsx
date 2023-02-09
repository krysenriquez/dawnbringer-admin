import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const SETTINGS_URL = `${API_URL}/settings`

const GET_MEMBERSHIP_LEVELS_URL = `${SETTINGS_URL}/getmembershiplevels`

export const getmembershiplevels = () => {
  return axios.get(`${GET_MEMBERSHIP_LEVELS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

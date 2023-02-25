import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const SETTINGS_URL = `${API_URL}/settings`

const GET_COMPANY_URL = `${SETTINGS_URL}/getcompany/`

export const getCompany = () => {
  return axios.get(`${GET_COMPANY_URL}`).then((d) => humps.camelizeKeys(d.data[0]))
}

import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const CORE_URL = `${API_URL}/core/${API_SUFFIX}`

export const GET_CASHOUTS_URL = `${CORE_URL}/getcashouts`
export const GET_CASHOUT_INFO_URL = `${CORE_URL}/getcashoutinfo`
const UPDATE_CASHOUT_STATUS_URL = `${CORE_URL}/updatecashoutstatus/`

export const getCashouts = () => {
  return axios.get(`${GET_CASHOUTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getCashout = (values) => {
  return axios
    .get(`${GET_CASHOUT_INFO_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const updateCashoutStatus = (values) => {
  return axios
    .post(`${UPDATE_CASHOUT_STATUS_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

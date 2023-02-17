import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ORDERS_URL = `${API_URL}/orders
`
export const GET_ORDERS_URL = `${ORDERS_URL}/getadminorders/`
export const GET_ORDER_INFO_URL = `${ORDERS_URL}/getadminorder/`
export const GET_ORDER_STATUSES_URL = `${ORDERS_URL}/getorderstatus/`
export const CREATE_ORDER_HISTORY_URL = `${ORDERS_URL}/updateorder/`

export const getOrders = (branchId) => {
  return axios
    .get(
      `${GET_ORDERS_URL}`,
      humps.decamelizeKeys({
        params: {
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data))
}

export const getOrderInfo = (orderId, branchId) => {
  return axios
    .get(
      `${GET_ORDER_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          orderId: orderId,
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export function getOrderStatuses(values) {
  return axios.post(`${GET_ORDER_STATUSES_URL}`, humps.decamelizeKeys(values))
}

export function processOrderStatus(values) {
  return axios.post(`${CREATE_ORDER_HISTORY_URL}`, humps.decamelizeKeys(values))
}

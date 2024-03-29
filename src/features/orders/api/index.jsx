import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const ORDERS_URL = `${API_URL}/orders/${API_SUFFIX}`

export const GET_ORDERS_URL = `${ORDERS_URL}/getorders/`
export const GET_ORDER_INFO_URL = `${ORDERS_URL}/getorder/`
const GET_ORDER_STATUSES_URL = `${ORDERS_URL}/getorderstatus/`
const GET_ORDER_STOCKS_URL = `${ORDERS_URL}/verifyorderstocks/`
const CREATE_ORDER_HISTORY_URL = `${ORDERS_URL}/updateorder/`

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

export const getOrderStatuses = (values) => {
  return axios.post(`${GET_ORDER_STATUSES_URL}`, humps.decamelizeKeys(values)).then((d) => d.data)
}

export const getOrderStocks = (values) => {
  return axios
    .post(`${GET_ORDER_STOCKS_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const processOrderStatus = (values) => {
  return axios.post(`${CREATE_ORDER_HISTORY_URL}`, humps.decamelizeKeys(values))
}

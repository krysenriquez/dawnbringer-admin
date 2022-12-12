import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/products
`
export const GET_ORDERS_URL = `${CORE_URL}/getorders`
export const GET_ORDER_INFO_URL = `${CORE_URL}/getorder`

export const getOrders = () => {
  return axios.get(`${GET_ORDERS_URL}`).then((d) => d.data)
}

export const getOrderInfo = (id) => {
  return axios
    .get(`${GET_ORDER_INFO_URL}`, {
      params: {
        order_id: id,
      },
    })
    .then((d) => d.data[0])
}

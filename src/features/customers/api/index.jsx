import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ORDERS_URL = `${API_URL}/orders`

export const GET_CUSTOMERS_URL = `${ORDERS_URL}/getcustomers/`
export const GET_CUSTOMER_INFO_URL = `${ORDERS_URL}/getcustomer/`

export const getCustomers = () => {
  return axios.get(`${GET_CUSTOMERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getCustomer = (customerNumber) => {
  return axios
    .get(
      `${GET_CUSTOMER_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          customerNumber: customerNumber,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

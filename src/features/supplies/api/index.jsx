import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const PRODUCTS_URL = `${API_URL}/products`

export const GET_SUPPLIES_URL = `${PRODUCTS_URL}/getsupplies/`
export const GET_SUPPLY_INFO_URL = `${PRODUCTS_URL}/getsupply/`
const GET_SUPPLY_STATUSES_URL = `${PRODUCTS_URL}/getsupplystatus/`
const CREATE_SUPPLY_URL = `${PRODUCTS_URL}/createsupply/`

export const getSupplies = (branchId) => {
  return axios
    .get(
      `${GET_SUPPLIES_URL}`,
      humps.decamelizeKeys({
        params: {
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data))
}

export const getSupplyInfo = (supplyId, branchId) => {
  return axios
    .get(
      `${GET_SUPPLY_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          supplyId: supplyId,
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export function createSupply(values) {
  return axios.post(`${CREATE_SUPPLY_URL}`, humps.decamelizeKeys(values))
}

export function getSupplyStatuses(values) {
  return axios.post(`${GET_SUPPLY_STATUSES_URL}`, humps.decamelizeKeys(values))
}

// export function processOrderStatus(values) {
//   return axios.post(`${CREATE_ORDER_HISTORY_URL}`, humps.decamelizeKeys(values))

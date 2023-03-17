import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const PRODUCTS_URL = `${API_URL}/products`

export const GET_SUPPLIES_URL = `${PRODUCTS_URL}/getsupplies/`
export const GET_SUPPLY_INFO_URL = `${PRODUCTS_URL}/getsupply/`
const CREATE_SUPPLY_URL = `${PRODUCTS_URL}/createsupply/`
const UPDATE_SUPPLY_URL = `${PRODUCTS_URL}/updatesupply/`
const GET_SUPPLY_STATUSES_URL = `${PRODUCTS_URL}/getsupplystatus/`
const CREATE_SUPPLY_HISTORY_URL = `${PRODUCTS_URL}/updatesupplystatus/`

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

export const createSupply = (values) => {
  return axios.post(`${CREATE_SUPPLY_URL}`, humps.decamelizeKeys(values))
}

export const updateSupply = (values) => {
  return axios.post(`${UPDATE_SUPPLY_URL}`, humps.decamelizeKeys(values))
}

export const getSupplyStatuses = (values) => {
  return axios.post(`${GET_SUPPLY_STATUSES_URL}`, humps.decamelizeKeys(values))
}

export const processSupplyStatus = (values) => {
  return axios.post(`${CREATE_SUPPLY_HISTORY_URL}`, humps.decamelizeKeys(values))
}

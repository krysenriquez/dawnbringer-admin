import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/products`

const GET_PRODUCT_TYPE_OPTIONS_URL = `${CORE_URL}/getproducttypesoptions`
export const GET_PRODUCT_TYPES_URL = `${CORE_URL}/getproducttypes`
const CREATE_PRODUCT_TYPES_URL = `${CORE_URL}/createproducttype/`

export const getProductTypeOptions = () => {
  return axios.get(`${GET_PRODUCT_TYPE_OPTIONS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getProductTypes = () => {
  return axios.get(`${GET_PRODUCT_TYPES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const createProductType = (productType) => {
  return axios.post(`${CREATE_PRODUCT_TYPES_URL}`, productType, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

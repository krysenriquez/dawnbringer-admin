import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const PRODUCTS_URL = `${API_URL}/products`

export const GET_PRODUCT_TYPES_URL = `${PRODUCTS_URL}/getproducttypes/`
export const GET_PRODUCT_TYPE_INFO_URL = `${PRODUCTS_URL}/getproducttype/`
const GET_PRODUCT_TYPE_OPTIONS_URL = `${PRODUCTS_URL}/getproducttypesoptions/`
const CREATE_PRODUCT_TYPE_URL = `${PRODUCTS_URL}/createproducttype/`
const UPDATE_PRODUCT_TYPE_URL = `${PRODUCTS_URL}/updateproducttype/`

export const getProductTypeOptions = () => {
  return axios.get(`${GET_PRODUCT_TYPE_OPTIONS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getProductTypes = () => {
  return axios.get(`${GET_PRODUCT_TYPES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getProductTypeInfo = (productTypeId) => {
  return axios
    .get(
      `${GET_PRODUCT_TYPE_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          productTypeId: productTypeId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const createProductType = (productType) => {
  return axios.post(`${CREATE_PRODUCT_TYPE_URL}`, productType, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const updateProductType = (productType) => {
  return axios.post(`${UPDATE_PRODUCT_TYPE_URL}`, productType, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

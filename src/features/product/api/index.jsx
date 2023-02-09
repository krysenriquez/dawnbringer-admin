import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/products`

export const GET_PRODUCTS_URL = `${CORE_URL}/getproducts`
const GET_PRODUCT_OPTIONS_URL = `${CORE_URL}/getproductsoptions`
export const GET_PRODUCT_INFO_URL = `${CORE_URL}/getproduct`
const CREATE_PRODUCT_URL = `${CORE_URL}/createproduct/`

export const getProductOptions = () => {
  return axios.get(`${GET_PRODUCT_OPTIONS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getProducts = () => {
  return axios.get(`${GET_PRODUCTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getProductInfo = (id) => {
  return axios
    .get(`${GET_PRODUCT_INFO_URL}`, {
      params: {
        product_id: id,
      },
    })
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const createProduct = (product) => {
  return axios.post(`${CREATE_PRODUCT_URL}`, product, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

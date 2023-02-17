import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const PRODUCTS_URL = `${API_URL}/products`

export const GET_PRODUCTS_URL = `${PRODUCTS_URL}/getproducts/`
export const GET_PRODUCT_INFO_URL = `${PRODUCTS_URL}/getproduct/`
const GET_PRODUCT_OPTIONS_URL = `${PRODUCTS_URL}/getproductsoptions/`
const CREATE_PRODUCT_URL = `${PRODUCTS_URL}/createproduct/`

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

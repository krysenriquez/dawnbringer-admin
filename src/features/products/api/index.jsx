import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/products
`
export const GET_PRODUCTS_URL = `${CORE_URL}/getproducts`
export const GET_PRODUCT_INFO_URL = `${CORE_URL}/getproduct`
export const GET_PRODUCT_VARIANT_INFO_URL = `${CORE_URL}/getproductvariant`

export const getProducts = () => {
  return axios.get(`${GET_PRODUCTS_URL}`).then((d) => d.data)
}

export const getProductInfo = (id) => {
  return axios
    .get(`${GET_PRODUCT_INFO_URL}`, {
      params: {
        product_id: id,
      },
    })
    .then((d) => d.data[0])
}

export const getProductVariantInfo = (sku) => {
  return axios
    .get(`${GET_PRODUCT_VARIANT_INFO_URL}`, {
      params: {
        sku: sku,
      },
    })
    .then((d) => d.data[0])
}

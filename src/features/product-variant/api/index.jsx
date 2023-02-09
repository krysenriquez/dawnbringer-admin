import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/products`

export const GET_PRODUCT_VARIANTS_URL = `${CORE_URL}/getproductvariants`
export const GET_PRODUCT_VARIANT_INFO_URL = `${CORE_URL}/getproductvariant`
export const CREATE_PRODUCT_VARIANT_URL = `${CORE_URL}/createproductvariant/`

export const getProductVariantInfo = (sku) => {
  return axios
    .get(`${GET_PRODUCT_VARIANT_INFO_URL}`, {
      params: {
        sku: sku,
      },
    })
    .then((d) => d.data[0])
}

export const getProductVariants = () => {
  return axios.get(`${GET_PRODUCT_VARIANTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function createProductVariant(productVariant) {
  return axios.post(`${CREATE_PRODUCT_VARIANT_URL}`, productVariant, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

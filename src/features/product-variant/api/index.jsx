import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const PRODUCTS_URL = `${API_URL}/products`

export const GET_PRODUCT_VARIANTS_URL = `${PRODUCTS_URL}/getproductvariants/`
export const GET_PRODUCT_VARIANT_INFO_URL = `${PRODUCTS_URL}/getproductvariant/`
const GET_PRODUCT_VARIANT_OPTIONS_URL = `${PRODUCTS_URL}/getproductvariantsoptions/`
const CREATE_PRODUCT_VARIANT_URL = `${PRODUCTS_URL}/createproductvariant/`
const VERIFY_SKU_URL = `${PRODUCTS_URL}/verifysku/`

export const getProductVariantOptions = () => {
  return axios.get(`${GET_PRODUCT_VARIANT_OPTIONS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getProductVariants = (branchId) => {
  return axios
    .get(
      `${GET_PRODUCT_VARIANTS_URL}`,
      humps.decamelizeKeys({
        params: {
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data))
}

export const getProductVariantInfo = (sku, branchId) => {
  return axios
    .get(
      `${GET_PRODUCT_VARIANT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          sku: sku,
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export function createProductVariant(productVariant) {
  return axios.post(`${CREATE_PRODUCT_VARIANT_URL}`, productVariant, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const verifySku = (sku) => {
  return axios.post(`${VERIFY_SKU_URL}`, humps.decamelizeKeys({sku: sku}))
}

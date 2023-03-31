import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const PRODUCTS_URL = `${API_URL}/products/${API_SUFFIX}`

export const GET_PRODUCT_VARIANTS_URL = `${PRODUCTS_URL}/getproductvariants/`
export const GET_PRODUCT_VARIANT_INFO_URL = `${PRODUCTS_URL}/getproductvariant/`
const GET_PRODUCT_VARIANT_OPTIONS_URL = `${PRODUCTS_URL}/getproductvariantsoptions/`
const CREATE_PRODUCT_VARIANT_URL = `${PRODUCTS_URL}/createproductvariant/`
const UPDATE_PRODUCT_VARIANT_URL = `${PRODUCTS_URL}/updateproductvariant/`
const VERIFY_PRODUCT_VARIANT_SKU_URL = `${PRODUCTS_URL}/verifyproductvariantsku/`
const VERIFY_PRODUCT_VARIANT_SLUG_URL = `${PRODUCTS_URL}/verifyproductvariantslug/`

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

export const createProductVariant = (productVariant) => {
  return axios.post(`${CREATE_PRODUCT_VARIANT_URL}`, productVariant, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const updateProductVariant = (productVariant) => {
  return axios.post(`${UPDATE_PRODUCT_VARIANT_URL}`, productVariant, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const verifyProductVariantSku = (sku, variantId) => {
  return axios.post(
    `${VERIFY_PRODUCT_VARIANT_SKU_URL}`,
    humps.decamelizeKeys({sku: sku, variantId: variantId})
  )
}

export const verifyProductVariantSlug = (pageSlug, variantId) => {
  return axios.post(
    `${VERIFY_PRODUCT_VARIANT_SLUG_URL}`,
    humps.decamelizeKeys({pageSlug: pageSlug, variantId: variantId})
  )
}

import {string, object, array} from 'yup'
import {verifyProductName} from '../api'
import productFormModel from './productFormModel'
const {
  formField: {
    productType,
    productName,
    productStatus,
    productDescription,
    productTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productFormModel

const validateProductName = async (ctx) => {
  return await verifyProductName(ctx.parent.productName, ctx.parent.productId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return true
    })
}

export default object().shape({
  [productType.key]: string().required(`${productType.requiredErrorMsg}`),
  [productName.key]: string()
    .required(`${productName.requiredErrorMsg}`)
    .test({
      name: 'is-valid-product-name',
      test: (value, ctx) => validateProductName(ctx),
      exclusive: true,
    }),
  [productStatus.key]: string().required(`${productStatus.requiredErrorMsg}`),
  [productDescription.key]: string().required(`${productDescription.requiredErrorMsg}`),
  [productTags.key]: array().of(string()).optional().nullable(),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string().required(`${pageSlug.requiredErrorMsg}`),
  }),
})

import {string, object, array} from 'yup'
import {verifyProductName, verifyProductSlug} from '../api'
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
      return ctx.createError({path: productName.name, message: err.response.data.message})
    })
}

const validateProductSlug = async (ctx) => {
  return await verifyProductSlug(ctx.parent.pageSlug, ctx.parent.productId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: pageSlug.name, message: err.response.data.message})
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
    [pageSlug.key]: string()
      .required(`${pageSlug.requiredErrorMsg}`)
      .test({
        name: 'is-valid-product-slug',
        test: (value, ctx) => validateProductSlug(ctx),
        exclusive: true,
      }),
  }),
})

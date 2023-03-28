import {string, object, array} from 'yup'
import {verifyProductName, verifyProductSlug} from '../api'
import productFormModel from './productFormModel'
const {
  formField: {
    productId,
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
      return ctx.createError({path: productName.name, message: err.response.data.detail})
    })
}

const validateProductSlug = async (ctx) => {
  console.log(ctx)
  return await verifyProductSlug(ctx.parent.pageSlug, ctx.from[1].value.productId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: pageSlug.name, message: err.response.data.detail})
    })
}

export default object().shape({
  [productId.key]: string().nullable(),
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

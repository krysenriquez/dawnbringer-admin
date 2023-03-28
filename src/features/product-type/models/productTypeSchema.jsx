import {string, object, array} from 'yup'
import {verifyProductTypeName, verifyProductTypeSlug} from '../api'
import productTypeFormModel from './productTypeFormModel'
const {
  formField: {
    productTypeId,
    productType,
    productTypeStatus,
    productTypeDescription,
    productTypeTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productTypeFormModel

const validateProductTypeName = async (ctx) => {
  return await verifyProductTypeName(ctx.parent.productType, ctx.parent.productTypeId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: productType.name, message: err.response.data.detail})
    })
}

const validateProductTypeSlug = async (ctx) => {
  return await verifyProductTypeSlug(ctx.parent.pageSlug, ctx.from[1].value.productTypeId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: pageSlug.name, message: err.response.data.detail})
    })
}

export default object().shape({
  [productTypeId.key]: string().nullable(),
  [productType.key]: string()
    .required(`${productType.requiredErrorMsg}`)
    .test({
      name: 'is-valid-product-type-name',
      test: (value, ctx) => validateProductTypeName(ctx),
      exclusive: true,
    }),
  [productTypeStatus.key]: string().required(`${productTypeStatus.requiredErrorMsg}`),
  [productTypeDescription.key]: string().required(`${productTypeDescription.requiredErrorMsg}`),
  [productTypeTags.key]: array().of(string()).optional().nullable(),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string()
      .required(`${pageSlug.requiredErrorMsg}`)
      .test({
        name: 'is-valid-product-type-slug',
        test: (value, ctx) => validateProductTypeSlug(ctx),
        exclusive: true,
      }),
  }),
})

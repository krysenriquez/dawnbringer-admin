import {string, object, array, number} from 'yup'
import {verifyProductVariantSku, verifyProductVariantSlug} from '../api'
import productVariantCreateFormModel from './productVariantFormModel'
const {
  formField: {
    variantId,
    product,
    sku,
    variantName,
    variantStatus,
    variantDescription,
    variantTags,
    quantity,
    price: {basePrice, discountedPrice},
    meta: {metaTagTitle, metaTagDescription, pageSlug},
    pointValues: [{pointValue, membershipLevel}],
  },
} = productVariantCreateFormModel

const validateProductVariantSku = async (ctx) => {
  return await verifyProductVariantSku(ctx.parent.sku, ctx.parent.variantId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: sku.name, message: err.response.data.detail})
    })
}

const validateProductVariantSlug = async (ctx) => {
  return await verifyProductVariantSlug(ctx.parent.pageSlug, ctx.from[1].value.variantId)
    .then((response) => {
      return true
    })
    .catch((err) => {
      return ctx.createError({path: pageSlug.name, message: err.response.data.detail})
    })
}

export default object().shape({
  [variantId.key]: string().nullable(),
  [product.key]: string().required(`${product.requiredErrorMsg}`),
  [sku.key]: string()
    .required(`${sku.requiredErrorMsg}`)
    .test({
      name: 'is-valid-product-variant-sku',
      test: (value, ctx) => validateProductVariantSku(ctx),
      exclusive: true,
    }),
  [variantName.key]: string().required(`${variantName.requiredErrorMsg}`),
  [variantStatus.key]: string().required(`${variantStatus.requiredErrorMsg}`),
  [variantDescription.key]: string().required(`${variantDescription.requiredErrorMsg}`),
  [variantTags.key]: array().of(string()),
  [quantity.key]: number()
    .min(0)
    .integer(`${quantity.invalidErrorMsg}`)
    .required(`${quantity.requiredErrorMsg}`),
  price: object({
    [basePrice.key]: number()
      .min(0)
      .integer(`${basePrice.invalidErrorMsg}`)
      .required(`${basePrice.requiredErrorMsg}`),
    [discountedPrice.key]: number()
      .min(0)
      .integer(`${discountedPrice.invalidErrorMsg}`)
      .required(`${discountedPrice.requiredErrorMsg}`),
  }),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string()
      .required(`${pageSlug.requiredErrorMsg}`)
      .test({
        name: 'is-valid-product-variant-sku',
        test: (value, ctx) => validateProductVariantSlug(ctx),
        exclusive: true,
      }),
  }),
  pointValue: array().of(
    object({
      [membershipLevel.key]: string().required(`${membershipLevel.requiredErrorMsg}`),
      [pointValue.key]: number()
        .min(0)
        .integer(`${pointValue.invalidErrorMsg}`)
        .required(`${pointValue.requiredErrorMsg}`),
    })
  ),
})

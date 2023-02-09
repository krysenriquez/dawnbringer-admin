import {string, object, array, number} from 'yup'
import productVariantCreateFormModel from './productVariantCreateFormModel'
const {
  formField: {
    product,
    sku,
    variantName,
    variantStatus,
    variantDescription,
    variantTags,
    quantity,
    price: {price, discount},
    meta: {metaTagTitle, metaTagDescription, pageSlug},
    pointValues: [{pointValue, membershipLevel}],
  },
} = productVariantCreateFormModel

export default object().shape({
  [product.key]: string().required(`${product.requiredErrorMsg}`),
  [sku.key]: string().required(`${sku.requiredErrorMsg}`),
  [variantName.key]: string().required(`${variantName.requiredErrorMsg}`),
  [variantStatus.key]: string().required(`${variantStatus.requiredErrorMsg}`),
  [variantDescription.key]: string().required(`${variantDescription.requiredErrorMsg}`),
  [variantTags.key]: array().of(string()),
  [quantity.key]: number()
    .min(1)
    .integer(`${quantity.invalidErrorMsg}`)
    .required(`${quantity.requiredErrorMsg}`),
  price: object({
    [price.key]: number()
      .min(0)
      .integer(`${price.invalidErrorMsg}`)
      .required(`${price.requiredErrorMsg}`),
    [discount.key]: number()
      .min(0)
      .integer(`${discount.invalidErrorMsg}`)
      .required(`${discount.requiredErrorMsg}`),
  }),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string().required(`${pageSlug.requiredErrorMsg}`),
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

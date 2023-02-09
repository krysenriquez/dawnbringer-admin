import productVariantCreateFormModel from './productVariantCreateFormModel'
const {
  formField: {
    product,
    sku,
    variantName,
    variantImage,
    variantStatus,
    variantDescription,
    variantTags,
    quantity,
    media,
    price: {price, discount},
    meta: {metaTagTitle, metaTagDescription, pageSlug},
    pointValues: [{pointValue, membershipLevel}],
  },
} = productVariantCreateFormModel

export default {
  [product.key]: '',
  [sku.key]: '',
  [variantName.key]: '',
  [variantImage.key]: '',
  [variantStatus.key]: '',
  [variantDescription.key]: '',
  [variantTags.key]: '',
  [quantity.key]: 1,
  [media.key]: [],
  price: {
    [price.key]: 0,
    [discount.key]: 0,
  },
  meta: {
    [metaTagTitle.key]: '',
    [metaTagDescription.key]: '',
    [pageSlug.key]: '',
  },
  point_values: [],
}

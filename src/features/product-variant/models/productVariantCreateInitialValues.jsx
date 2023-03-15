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
    price: {basePrice, discountedPrice},
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
  [variantTags.key]: [],
  [quantity.key]: 1,
  [media.key]: [],
  price: {
    [basePrice.key]: 0,
    [discountedPrice.key]: 0,
  },
  meta: {
    [metaTagTitle.key]: '',
    [metaTagDescription.key]: '',
    [pageSlug.key]: '',
  },
  pointValues: [],
}

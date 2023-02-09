import productCreateFormModel from './productCreateFormModel'
const {
  formField: {
    productType,
    productName,
    productImage,
    productStatus,
    productDescription,
    productTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productCreateFormModel

export default {
  [productType.key]: '',
  [productName.key]: '',
  [productImage.key]: '',
  [productStatus.key]: '',
  [productDescription.key]: '',
  [productTags.key]: [],
  meta: {
    [metaTagTitle.key]: '',
    [metaTagDescription.key]: '',
    [pageSlug.key]: '',
  },
}

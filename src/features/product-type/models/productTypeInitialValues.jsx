import productTypeFormModel from './productTypeFormModel'
const {
  formField: {
    productType,
    productTypeImage,
    productTypeStatus,
    productTypeDescription,
    productTypeTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productTypeFormModel

export default {
  [productType.key]: '',
  [productTypeImage.key]: '',
  [productTypeStatus.key]: '',
  [productTypeDescription.key]: '',
  [productTypeTags.key]: [],
  meta: {
    [metaTagTitle.key]: '',
    [metaTagDescription.key]: '',
    [pageSlug.key]: '',
  },
}

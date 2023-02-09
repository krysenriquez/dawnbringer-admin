import {string, object, array} from 'yup'
import productTypeCreateFormModel from './productTypeCreateFormModel'
const {
  formField: {
    productType,
    productTypeStatus,
    productTypeDescription,
    productTypeTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productTypeCreateFormModel

export default object().shape({
  [productType.key]: string().required(`${productType.requiredErrorMsg}`),
  [productTypeStatus.key]: string().required(`${productTypeStatus.requiredErrorMsg}`),
  [productTypeDescription.key]: string().required(`${productTypeDescription.requiredErrorMsg}`),
  [productTypeTags.key]: array().of(string()),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string().required(`${pageSlug.requiredErrorMsg}`),
  }),
})

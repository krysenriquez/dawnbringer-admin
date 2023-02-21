import {string, object, array} from 'yup'
import productTypeFormModel from './productTypeFormModel'
const {
  formField: {
    productType,
    productTypeStatus,
    productTypeDescription,
    productTypeTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productTypeFormModel

export default object().shape({
  [productType.key]: string().required(`${productType.requiredErrorMsg}`),
  [productTypeStatus.key]: string().required(`${productTypeStatus.requiredErrorMsg}`),
  [productTypeDescription.key]: string().required(`${productTypeDescription.requiredErrorMsg}`),
  [productTypeTags.key]: array().of(string()).optional().nullable(),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string().required(`${pageSlug.requiredErrorMsg}`),
  }),
})

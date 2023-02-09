import {string, object, array} from 'yup'
import productCreateFormModel from './productCreateFormModel'
const {
  formField: {
    productType,
    productName,
    productStatus,
    productDescription,
    productTags,
    meta: {metaTagTitle, metaTagDescription, pageSlug},
  },
} = productCreateFormModel

export default object().shape({
  [productType.key]: string().required(`${productType.requiredErrorMsg}`),
  [productName.key]: string().required(`${productName.requiredErrorMsg}`),
  [productStatus.key]: string().required(`${productStatus.requiredErrorMsg}`),
  [productDescription.key]: string().required(`${productDescription.requiredErrorMsg}`),
  [productTags.key]: array().of(string()),
  meta: object({
    [metaTagTitle.key]: string().required(`${metaTagTitle.requiredErrorMsg}`),
    [metaTagDescription.key]: string().required(`${metaTagDescription.requiredErrorMsg}`),
    [pageSlug.key]: string().required(`${pageSlug.requiredErrorMsg}`),
  }),
})

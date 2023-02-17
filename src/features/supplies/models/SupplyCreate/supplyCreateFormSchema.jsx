import {string, object, array, number} from 'yup'
import supplyCreateFormModel from './supplyCreateFormModel'
const {
  formField: {
    branchFrom,
    branchTo,
    trackingNumber,
    carrier,
    referenceNumber,
    comment,
    details: [{variant, quantity}],
  },
} = supplyCreateFormModel

export default object().shape({
  [branchFrom.key]: string().required(`${branchFrom.requiredErrorMsg}`),
  [branchTo.key]: string().required(`${branchTo.requiredErrorMsg}`),
  [trackingNumber.key]: string(),
  [carrier.key]: string(),
  [referenceNumber.key]: string(),
  [comment.key]: string(),
  details: array().of(
    object({
      [variant.key]: string().required(`${variant.requiredErrorMsg}`),
      [quantity.key]: number()
        .min(0)
        .integer(`${quantity.invalidErrorMsg}`)
        .required(`${quantity.requiredErrorMsg}`),
    })
  ),
})

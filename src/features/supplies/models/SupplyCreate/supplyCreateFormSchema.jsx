import {string, object, array, number} from 'yup'
import supplyCreateFormModel from './supplyCreateFormModel'
const {
  formField: {
    branchFrom,
    branchTo,
    referenceNumber,
    carrier,
    carrierContactNumber,
    trackingNumber,
    comment,
    details: [{variant, quantity}],
  },
} = supplyCreateFormModel

export default object().shape({
  [branchFrom.key]: string().required(`${branchFrom.requiredErrorMsg}`),
  [branchTo.key]: string().required(`${branchTo.requiredErrorMsg}`),
  [referenceNumber.key]: string(),
  [carrier.key]: string(),
  [carrierContactNumber.key]: string(),
  [trackingNumber.key]: string(),
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

import supplyCreateFormModel from './supplyCreateFormModel'
const {
  formField: {
    branchFrom,
    branchTo,
    trackingNumber,
    carrier,
    referenceNumber,
    comment,
    selectedVariant,
    details: [{variant, quantity}],
  },
} = supplyCreateFormModel

export default {
  [branchFrom.key]: '',
  [branchTo.key]: '',
  [trackingNumber.key]: '',
  [carrier.key]: '',
  [referenceNumber.key]: '',
  [selectedVariant.key]: '',
  [comment.key]: '',
  details: [],
}

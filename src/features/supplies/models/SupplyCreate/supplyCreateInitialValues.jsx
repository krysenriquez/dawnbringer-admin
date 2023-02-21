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
    setStatusToDelivered,
    details: [{variant, quantity}],
  },
} = supplyCreateFormModel

export default {
  [branchFrom.key]: '',
  [branchTo.key]: '',
  [referenceNumber.key]: '',
  [carrier.key]: '',
  [carrierContactNumber.key]: '',
  [trackingNumber.key]: '',
  [setStatusToDelivered.key]: false,
  [comment.key]: '',
  details: [],
}

import processSupplyUpdateFormModel from './processSupplyUpdateFormModel'
const {
  formField: {supplyId, referenceNumber, carrier, carrierContactNumber, trackingNumber, comment},
} = processSupplyUpdateFormModel

export default {
  [supplyId.key]: '',
  [referenceNumber.key]: '',
  [carrier.key]: '',
  [carrierContactNumber.key]: '',
  [trackingNumber.key]: '',
  [comment.key]: '',
}

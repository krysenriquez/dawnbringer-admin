import {string, object} from 'yup'
import processSupplyUpdateFormModel from './processSupplyUpdateFormModel'
const {
  formField: {supplyId, referenceNumber, carrier, carrierContactNumber, trackingNumber, comment},
} = processSupplyUpdateFormModel

export default object().shape({
  [supplyId.key]: string().nullable(),
  [referenceNumber.key]: string().nullable(),
  [carrier.key]: string().nullable(),
  [carrierContactNumber.key]: string().nullable(),
  [trackingNumber.key]: string().nullable(),
  [comment.key]: string().nullable(),
})

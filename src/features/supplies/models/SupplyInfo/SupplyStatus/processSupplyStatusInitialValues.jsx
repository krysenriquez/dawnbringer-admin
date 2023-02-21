import processSupplyStatusFormModel from './processSupplyStatusFormModel'
const {
  formField: {supplyStatus, supplyId, comment, emailSent},
} = processSupplyStatusFormModel

export default {
  [supplyId.key]: '',
  [supplyStatus.key]: '',
  [comment.key]: '',
  [emailSent.key]: false,
}

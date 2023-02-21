import {string, object, array, boolean} from 'yup'
import processSupplyStatusFormModel from './processSupplyStatusFormModel'
const {
  formField: {supplyStatus, supplyId, comment, emailSent},
} = processSupplyStatusFormModel

export default object().shape({
  [supplyId.key]: string(),
  [supplyStatus.key]: string().required(`${supplyStatus.requiredErrorMsg}`),
  [comment.key]: string(),
  [emailSent.key]: boolean(),
})

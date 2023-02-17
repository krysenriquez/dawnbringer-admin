import {string, object, array, boolean} from 'yup'
import processOrderFormModel from './processOrderFormModel'
const {
  formField: {orderStatus, orderId, comment, emailSent},
} = processOrderFormModel

export default object().shape({
  [orderId.key]: string(),
  [orderStatus.key]: string().required(`${orderStatus.requiredErrorMsg}`),
  [comment.key]: string(),
  [emailSent.key]: boolean(),
})

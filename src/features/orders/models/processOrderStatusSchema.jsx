import {string, object, array, boolean} from 'yup'
import processOrderStatusFormModel from './processOrderStatusFormModel'
const {
  formField: {orderStatus, orderId, comment, emailSent},
} = processOrderStatusFormModel

export default object().shape({
  [orderId.key]: string(),
  [orderStatus.key]: string().required(`${orderStatus.requiredErrorMsg}`),
  [comment.key]: string(),
  [emailSent.key]: boolean(),
})

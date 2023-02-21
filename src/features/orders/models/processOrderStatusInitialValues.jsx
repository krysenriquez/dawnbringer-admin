import processOrderStatusFormModel from './processOrderStatusFormModel'
const {
  formField: {orderStatus, orderId, comment, emailSent},
} = processOrderStatusFormModel

export default {
  [orderId.key]: '',
  [orderStatus.key]: '',
  [comment.key]: '',
  [emailSent.key]: true,
}

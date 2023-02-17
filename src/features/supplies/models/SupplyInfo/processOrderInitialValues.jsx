import processOrderFormModel from './processOrderFormModel'
const {
  formField: {orderStatus, orderId, comment, emailSent},
} = processOrderFormModel

export default {
  [orderId.key]: '',
  [orderStatus.key]: '',
  [comment.key]: '',
  [emailSent.key]: true,
}

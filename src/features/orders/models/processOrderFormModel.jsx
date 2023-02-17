export default {
  formId: 'processOrderForm',
  formField: {
    orderId: {
      key: 'orderId',
      name: 'orderId',
      requiredErrorMsg: 'Order ID is required',
    },
    orderStatus: {
      key: 'orderStatus',
      name: 'orderStatus',
      label: 'Order Status',
      requiredErrorMsg: 'Order Status is required',
    },
    comment: {
      key: 'comment',
      name: 'comment',
      label: 'Comment',
    },
    emailSent: {
      key: 'emailSent',
      name: 'emailSent',
      label: 'Send Email to Customer',
    },
  },
}

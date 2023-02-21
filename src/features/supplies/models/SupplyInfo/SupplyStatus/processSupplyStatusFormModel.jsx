export default {
  formId: 'processSupplyStatusForm',
  formField: {
    supplyId: {
      key: 'supplyId',
      name: 'supplyId',
      requiredErrorMsg: 'Supply ID is required',
    },
    supplyStatus: {
      key: 'supplyStatus',
      name: 'supplyStatus',
      label: 'Supply Status',
      requiredErrorMsg: 'Supply Status is required',
    },
    comment: {
      key: 'comment',
      name: 'comment',
      label: 'Comment',
    },
    emailSent: {
      key: 'emailSent',
      name: 'emailSent',
      label: 'Send Email to Branch',
    },
  },
}

export default {
  formId: 'processSupplyUpdateForm',
  formField: {
    supplyId: {
      key: 'supplyId',
      name: 'supplyId',
      requiredErrorMsg: 'Supply ID is required',
    },
    referenceNumber: {
      key: 'referenceNumber',
      name: 'referenceNumber',
      label: 'Reference Number',
      requiredErrorMsg: 'Reference Number is required',
    },
    carrier: {
      key: 'carrier',
      name: 'carrier',
      label: 'Carrier',
      requiredErrorMsg: 'Carrier is required',
    },
    carrierContactNumber: {
      key: 'carrierContactNumber',
      name: 'carrierContactNumber',
      label: 'Carrier Contact Number',
      requiredErrorMsg: 'Carrier Contact Number is required',
    },
    trackingNumber: {
      key: 'trackingNumber',
      name: 'trackingNumber',
      label: 'Tracking Number',
      requiredErrorMsg: 'Tracking Number is required',
    },
    comment: {
      key: 'comment',
      name: 'comment',
      label: 'Comment',
    },
  },
}

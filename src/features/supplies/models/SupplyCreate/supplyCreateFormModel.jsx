export default {
  formId: 'supplyCreateForm',
  formField: {
    branchFrom: {
      key: 'branchFrom',
      name: 'branchFrom',
      label: 'Branch From',
      requiredErrorMsg: 'Branch From is required',
    },
    branchTo: {
      key: 'branchTo',
      name: 'branchTo',
      label: 'Branch To',
      requiredErrorMsg: 'Branch To is required',
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
    setStatusToDelivered: {
      key: 'setStatusToDelivered',
      name: 'setStatusToDelivered',
      label: 'Set Status to Delivered?',
    },
    details: [
      {
        variant: {
          key: 'variant',
          name: 'variant',
        },
        quantity: {
          key: 'quantity',
          name: 'quantity',
          label: '',
          requiredErrorMsg: '',
        },
      },
    ],
  },
}

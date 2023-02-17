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
    trackingNumber: {
      key: 'trackingNumber',
      name: 'trackingNumber',
      label: 'Tracking Number',
      requiredErrorMsg: 'Tracking Number is required',
    },
    carrier: {
      key: 'carrier',
      name: 'carrier',
      label: 'Carrier',
      requiredErrorMsg: 'Carrier is required',
    },
    referenceNumber: {
      key: 'referenceNumber',
      name: 'referenceNumber',
      label: 'Reference Number',
      requiredErrorMsg: 'Reference Number is required',
    },
    comment: {
      key: 'comment',
      name: 'comment',
      label: 'Comment',
    },
    selectedVariant: {
      key: 'selectedVariant',
      name: 'selectedVariant',
      label: 'Selected Variant',
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

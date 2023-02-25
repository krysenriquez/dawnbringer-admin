export default {
  formId: 'userBranchForm',
  formField: {
    userId: {
      key: 'userId',
      name: 'userId',
      requiredErrorMsg: 'User ID is required',
    },
    branch: [
      {
        branchId: {
          key: 'branchId',
          name: 'branchId',
          requiredErrorMsg: 'Branch ID is required',
        },
      },
    ],
  },
}

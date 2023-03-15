export default {
  formId: 'rolePermissionsForm',
  formField: {
    userTypeId: {
      key: 'userTypeId',
      name: 'userTypeId',
      requiredErrorMsg: 'User Type ID is required',
    },
    permissions: [
      {
        module: {
          key: 'module',
          name: 'module',
          requiredErrorMsg: 'Module is required',
        },
        canCreate: {
          key: 'canCreate',
          name: 'canCreate',
          label: 'Create',
        },
        canRetrieve: {
          key: 'canRetrieve',
          name: 'canRetrieve',
          label: 'Read',
        },
        canDelete: {
          key: 'canDelete',
          name: 'canDelete',
          label: 'Delete',
        },
        canUpdate: {
          key: 'canUpdate',
          name: 'canUpdate',
          label: 'Write',
        },
      },
    ],
  },
}

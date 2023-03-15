import rolePermissionsFormModel from './rolePermissionsFormModel'
const {
  formField: {
    userTypeId,
    permissions: [{moduleName, canCreate, canRetrieve, canDelete, canUpdate}],
  },
} = rolePermissionsFormModel

export default {
  [userTypeId.key]: '',
  permissions: [],
}

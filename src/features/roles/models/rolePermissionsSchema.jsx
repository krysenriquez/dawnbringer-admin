import {string, object, array, number, boolean} from 'yup'
import rolePermissionsFormModel from './rolePermissionsFormModel'
const {
  formField: {
    userTypeId,
    permissions: [{module, canCreate, canRetrieve, canDelete, canUpdate}],
  },
} = rolePermissionsFormModel

export default object().shape({
  [userTypeId.key]: string(),
  permissions: array().of(
    object({
      [module.key]: string(),
      [canCreate.key]: boolean(),
      [canRetrieve.key]: boolean(),
      [canDelete.key]: boolean(),
      [canUpdate.key]: boolean(),
    })
  ),
})

import {string, object, array} from 'yup'
import userBranchesFormModel from './userBranchesFormModel'
const {
  formField: {
    userId,
    branch: [branchId],
  },
} = userBranchesFormModel

export default object().shape({
  [userId.key]: string(),
  branch: array().of(
    object({
      [branchId.key]: string(),
    })
  ),
})

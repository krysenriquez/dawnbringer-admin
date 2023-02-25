import userBranchesFormModel from './userBranchesFormModel'
const {
  formField: {
    userId,
    branch: [branchId],
  },
} = userBranchesFormModel

export default {
  [userId.key]: '',
  branch: [],
}

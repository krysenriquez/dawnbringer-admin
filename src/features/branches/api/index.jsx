import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const SETTINGS_URL = `${API_URL}/settings`
export const GET_BRANCH_ASSIGNMENTS_URL = `${SETTINGS_URL}/getbranchassignments/`
export const GET_BRANCHES_URL = `${SETTINGS_URL}/getbranches/`
export const GET_BRANCH_INFO_URL = `${SETTINGS_URL}/getbranch/`
const CREATE_BRANCH_URL = `${SETTINGS_URL}/createbranch/`
const UPDATE_BRANCH_URL = `${SETTINGS_URL}/updatebranch/`

export const getBranchAssignments = () => {
  return axios.get(`${GET_BRANCH_ASSIGNMENTS_URL}`).then((d) => humps.camelizeKeys(d.data[0]))
}

export const getBranches = () => {
  return axios.get(`${GET_BRANCHES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getBranchInfo = (branchId) => {
  return axios
    .get(
      `${GET_BRANCH_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          branchId: branchId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export function createBranch(values) {
  return axios.post(`${CREATE_BRANCH_URL}`, humps.decamelizeKeys(values))
}

export function updateBranch(values) {
  return axios.post(`${UPDATE_BRANCH_URL}`, humps.decamelizeKeys(values))
}

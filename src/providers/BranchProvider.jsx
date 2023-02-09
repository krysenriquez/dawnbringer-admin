import {createContext, useContext, useState, useEffect, useRef} from 'react'
import {useAuth} from './AuthProvider'
import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const SETTINGS_URL = `${API_URL}/settings`
const GET_BRANCHES_URL = `${SETTINGS_URL}/getbranchassignments/`

const getBranches = () => {
  return axios.get(`${GET_BRANCHES_URL}`).then((d) => humps.camelizeKeys(d.data[0]))
}

const BranchContext = createContext({
  branches: undefined,
  defaultBranch: undefined,
  setDefaultBranch: (any) => {},
})

const BranchProvider = ({children}) => {
  const didRequest = useRef(false)
  const {logout, auth} = useAuth()
  const [branches, setBranches] = useState(undefined)
  const [defaultBranch, setDefaultBranch] = useState(undefined)

  useEffect(() => {
    const requestBranches = async () => {
      try {
        if (!didRequest.current) {
          const data = await getBranches()
          if (data && data.branch.length > 0) {
            setBranches(data.branch)
            setDefaultBranch(data.branch[0])
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      }

      return () => (didRequest.current = true)
    }

    requestBranches()
  }, [auth])

  return (
    <BranchContext.Provider value={{branches, defaultBranch, setDefaultBranch}}>
      {children}
    </BranchContext.Provider>
  )
}

const useBranch = () => useContext(BranchContext)

export {BranchProvider, useBranch}

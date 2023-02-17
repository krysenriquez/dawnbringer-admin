import {createContext, useContext, useState, useEffect, useRef} from 'react'
import {useAuth} from './AuthProvider'
import axios from 'axios'
import humps from 'humps'
import {getBranchAssignments} from '@/features/branches/api'

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
          const data = await getBranchAssignments()
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

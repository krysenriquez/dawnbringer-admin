import {createContext, useContext, useState, useEffect, useRef} from 'react'
import {useQuery} from 'react-query'
import {useAuth} from './AuthProvider'
import {setLocalStorage, getLocalStorage} from '@/utils/localStorage'
import {getBranchAssignments} from '@/features/branches/api'

const BranchContext = createContext({
  branches: undefined,
  defaultBranch: undefined,
  selectBranch: (any) => {},
})

const BranchProvider = ({children}) => {
  const didRequest = useRef(false)
  const {logout, auth} = useAuth()
  const [branches, setBranches] = useState(undefined)
  const [defaultBranch, setDefaultBranch] = useState(getLocalStorage('defaultBranch'))

  const selectBranch = (branch) => {
    setDefaultBranch(branch)
    setLocalStorage('defaultBranch', branch)
  }

  useEffect(() => {
    const requestBranches = async () => {
      try {
        if (!didRequest.current) {
          const data = await getBranchAssignments()
          if (data && data.branch.length > 0) {
            setBranches(data.branch)
            selectBranch(data.branch[0])
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
    <BranchContext.Provider value={{branches, defaultBranch, selectBranch}}>
      {children}
    </BranchContext.Provider>
  )
}

const useBranch = () => useContext(BranchContext)

export {BranchProvider, useBranch}

import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getBranches} from '@/features/branches/api'

const UserUpdateBranchesContext = createContext({
  branches: undefined,
})

const useUserBranchesUpdate = () => {
  return useContext(UserUpdateBranchesContext)
}

const UserBranchesUpdateProvider = ({children}) => {
  const didRequestBranches = useRef(false)
  const [branches, setBranches] = useState(undefined)

  useEffect(() => {
    const requestBranches = async () => {
      try {
        if (!didRequestBranches.current) {
          const data = await getBranches()
          if (data.length > 0) {
            setBranches(data)
          }
        }
      } catch (error) {
        if (!didRequestBranches.current) {
          toast.error('Unable to fetch Branches')
        }
      }

      return () => (didRequestBranches.current = true)
    }

    requestBranches()
  }, [])

  return (
    <UserUpdateBranchesContext.Provider
      value={{
        branches,
      }}
    >
      {children}
    </UserUpdateBranchesContext.Provider>
  )
}

export {UserBranchesUpdateProvider, useUserBranchesUpdate}

import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getModules} from '../api'

const RolePermissionsUpdateContext = createContext({
  modules: undefined,
})

const useRolePermissionsUpdate = () => {
  return useContext(RolePermissionsUpdateContext)
}

const RolePermissionsUpdateProvider = ({children}) => {
  const didRequestModules = useRef(false)
  const [modules, setModules] = useState(undefined)

  useEffect(() => {
    const requestModules = async () => {
      try {
        if (!didRequestModules.current) {
          const data = await getModules()
          if (data.length > 0) {
            setModules(data)
          }
        }
      } catch (error) {
        if (!didRequestModules.current) {
          toast.error('Unable to fetch Modules')
        }
      }

      return () => (didRequestModules.current = true)
    }

    requestModules()
  }, [])

  return (
    <RolePermissionsUpdateContext.Provider
      value={{
        modules,
      }}
    >
      {children}
    </RolePermissionsUpdateContext.Provider>
  )
}

export {RolePermissionsUpdateProvider, useRolePermissionsUpdate}

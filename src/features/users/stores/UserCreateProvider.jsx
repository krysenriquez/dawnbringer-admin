import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getUserTypes} from '../api'

const UserCreateContext = createContext({
  userTypes: undefined,
})

const useUserCreate = () => {
  return useContext(UserCreateContext)
}

const UserCreateProvider = ({children}) => {
  const didRequestUserTypes = useRef(false)
  const [userTypes, setUserTypes] = useState(undefined)

  useEffect(() => {
    const requestUserTypes = async () => {
      try {
        if (!didRequestUserTypes.current) {
          const data = await getUserTypes()
          if (data.length > 0) {
            setUserTypes(data)
          }
        }
      } catch (error) {
        if (!didRequestUserTypes.current) {
          toast.error('Unable to fetch User Types')
        }
      }

      return () => (didRequestUserTypes.current = true)
    }

    requestUserTypes()
  }, [])

  return (
    <UserCreateContext.Provider
      value={{
        userTypes: userTypes,
      }}
    >
      {children}
    </UserCreateContext.Provider>
  )
}

export {UserCreateProvider, useUserCreate}

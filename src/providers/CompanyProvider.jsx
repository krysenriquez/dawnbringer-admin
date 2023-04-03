import {createContext, useContext, useState, useEffect, useRef} from 'react'
import {toast} from 'react-toastify'
import {getCompany} from '@/features/settings/api'
import {getLocalStorage, setLocalStorage} from '@/utils/localStorage'

const CompanyContext = createContext({
  company: undefined,
})

const CompanyProvider = ({children}) => {
  const didRequest = useRef(false)
  const [company, setCompany] = useState(getLocalStorage('company'))

  useEffect(() => {
    if (!company) {
      const requestCompany = async () => {
        try {
          if (!didRequest.current) {
            const data = await getCompany()
            if (data) {
              setCompany(data)
              setLocalStorage('company', data)
            }
          }
        } catch (error) {
          if (!didRequest.current) {
            toast.error('Could not fetch Company Info!')
          }
        }

        return () => (didRequest.current = true)
      }

      requestCompany()
    }
  }, [company])

  return <CompanyContext.Provider value={{company}}>{children}</CompanyContext.Provider>
}

const useCompany = () => useContext(CompanyContext)

export {CompanyProvider, useCompany}

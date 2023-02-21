import {createContext, useContext, useState, useEffect, useRef} from 'react'
import {toast} from 'react-toastify'
import {getCompany} from '@/features/settings/api'

const CompanyContext = createContext({
  companyName: undefined,
  companyLogo: undefined,
  companyDescription: undefined,
})

const CompanyProvider = ({children}) => {
  const didRequest = useRef(false)
  const [companyName, setCompanyName] = useState(undefined)
  const [companyLogo, setCompanyLogo] = useState(undefined)
  const [companyDescription, setCompanyDescription] = useState(undefined)

  useEffect(() => {
    const requestCompany = async () => {
      try {
        if (!didRequest.current) {
          const data = await getCompany()
          if (data) {
            setCompanyName(data.name)
            setCompanyLogo(data.logo)
            setCompanyDescription(data.description)
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
  }, [])

  return (
    <CompanyContext.Provider value={{companyName, companyLogo, companyDescription}}>
      {children}
    </CompanyContext.Provider>
  )
}

const useCompany = () => useContext(CompanyContext)

export {CompanyProvider, useCompany}

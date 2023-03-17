import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getPageComponents} from '../../api'

const SectionComponentCreateContext = createContext({
  pageComponents: undefined,
})

const useSectionComponentCreate = () => {
  return useContext(SectionComponentCreateContext)
}

const SectionComponentCreateProvider = ({children}) => {
  const didRequestPageComponents = useRef(false)
  const [pageComponents, setPageComponents] = useState(undefined)

  useEffect(() => {
    const requestPageComponents = async () => {
      try {
        if (!didRequestPageComponents.current) {
          const data = await getPageComponents()
          if (data.length > 0) {
            setPageComponents(data)
          }
        }
      } catch (error) {
        if (!didRequestPageComponents.current) {
          toast.error('Unable to fetch Page Components')
        }
      }

      return () => (didRequestPageComponents.current = true)
    }

    requestPageComponents()
  }, [])

  return (
    <SectionComponentCreateContext.Provider
      value={{
        pageComponents,
      }}
    >
      {children}
    </SectionComponentCreateContext.Provider>
  )
}

export {SectionComponentCreateProvider, useSectionComponentCreate}

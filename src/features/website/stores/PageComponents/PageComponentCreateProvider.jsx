import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getPageContents} from '../../api'

const PageComponentCreateContext = createContext({
  pageContents: undefined,
})

const usePageComponentCreate = () => {
  return useContext(PageComponentCreateContext)
}

const PageComponentCreateProvider = ({children}) => {
  const didRequestPageContents = useRef(false)
  const [pageContents, setPageContents] = useState(undefined)

  useEffect(() => {
    const requestPageContents = async () => {
      try {
        if (!didRequestPageContents.current) {
          const data = await getPageContents()
          if (data.length > 0) {
            setPageContents(data)
          }
        }
      } catch (error) {
        if (!didRequestPageContents.current) {
          toast.error('Unable to fetch Page Contents')
        }
      }

      return () => (didRequestPageContents.current = true)
    }

    requestPageContents()
  }, [])

  return (
    <PageComponentCreateContext.Provider
      value={{
        pageContents,
      }}
    >
      {children}
    </PageComponentCreateContext.Provider>
  )
}

export {PageComponentCreateProvider, usePageComponentCreate}

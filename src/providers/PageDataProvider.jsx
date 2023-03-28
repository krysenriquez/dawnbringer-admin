import {createContext, useContext, useEffect, useState} from 'react'
const siteName = import.meta.env.VITE_APP_SITE_NAME

const PageDataContext = createContext({
  pageAction: undefined,
  pageTitle: undefined,
  pageDescription: undefined,
  pageBreadcrumbs: undefined,
  setPageAction: (any) => {},
  setPageTitle: (_title) => {},
  setPageBreadcrumbs: (_breadcrumbs) => {},
  setPageDescription: (_description) => {},
})

const PageDataProvider = ({children}) => {
  const [pageAction, setPageAction] = useState(undefined)
  const [pageTitle, setPageTitle] = useState('')
  const [pageDescription, setPageDescription] = useState('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState([])
  const value = {
    pageAction,
    setPageAction,
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

const PageTitle = ({children, description, breadcrumbs}) => {
  const {setPageTitle, setPageDescription, setPageBreadcrumbs} = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
      document.title = siteName + ` | ` + children.toString()
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])

  return <></>
}

const PageDescription = ({children}) => {
  const {setPageAction} = usePageData()
  useEffect(() => {
    if (children) {
      setPageAction(children.toString())
    }
  }, [children])
  return <></>
}

const PageAction = ({children}) => {
  const {setPageAction} = usePageData()
  useEffect(() => {
    if (children) {
      setPageAction(children)
    }
    return () => {
      setPageAction(<></>)
    }
  }, [children])
  return <></>
}

export {PageAction, PageDescription, PageTitle, PageDataProvider, usePageData}

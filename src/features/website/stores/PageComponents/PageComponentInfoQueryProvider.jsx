/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getPageComponentInfo, GET_PAGE_COMPONENT_INFO_URL} from '../../api'

const PageComponentInfoQueryContext = createContext(initialQuery)

const PageComponentInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_PAGE_COMPONENT_INFO_URL, searchParams?.pageComponentId],
    queryFn: () => getPageComponentInfo(searchParams?.pageComponentId),
    enabled: !!searchParams?.pageComponentId,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <PageComponentInfoQueryContext.Provider value={value}>
      {children}
    </PageComponentInfoQueryContext.Provider>
  )
}

const usePageComponentInfoQueryContext = () => {
  return useContext(PageComponentInfoQueryContext)
}

const usePageComponentInfoQueryData = () => {
  const {response} = usePageComponentInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const usePageComponentInfoQueryLoading = () => {
  const {isLoading} = usePageComponentInfoQueryContext()
  return isLoading
}

export {
  PageComponentInfoQueryProvider,
  usePageComponentInfoQueryContext,
  usePageComponentInfoQueryData,
  usePageComponentInfoQueryLoading,
}

/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getPageContentInfo, GET_PAGE_CONTENT_INFO_URL} from '../../api'

const PageContentInfoQueryContext = createContext(initialQuery)

const PageContentInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_PAGE_CONTENT_INFO_URL, searchParams?.pageContentId],
    queryFn: () => getPageContentInfo(searchParams?.pageContentId),
    enabled: !!searchParams?.pageContentId,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <PageContentInfoQueryContext.Provider value={value}>
      {children}
    </PageContentInfoQueryContext.Provider>
  )
}

const usePageContentInfoQueryContext = () => {
  return useContext(PageContentInfoQueryContext)
}

const usePageContentInfoQueryData = () => {
  const {response} = usePageContentInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const usePageContentInfoQueryLoading = () => {
  const {isLoading} = usePageContentInfoQueryContext()
  return isLoading
}

export {
  PageContentInfoQueryProvider,
  usePageContentInfoQueryContext,
  usePageContentInfoQueryData,
  usePageContentInfoQueryLoading,
}

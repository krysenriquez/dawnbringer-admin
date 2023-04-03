/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getPageContents, GET_PAGE_CONTENTS_URL} from '../../api'

const PageContentsListQueryContext = createContext(initialQuery)

const PageContentsListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_PAGE_CONTENTS_URL],
    queryFn: () => getPageContents(),
    enabled: true,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <PageContentsListQueryContext.Provider value={value}>
      {children}
    </PageContentsListQueryContext.Provider>
  )
}

const usePageContentsListQueryContext = () => {
  return useContext(PageContentsListQueryContext)
}

const usePageContentsListQueryData = () => {
  const {response} = usePageContentsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const usePageContentsListQueryLoading = () => {
  const {isLoading} = usePageContentsListQueryContext()
  return isLoading
}

export {
  PageContentsListQueryProvider,
  usePageContentsListQueryContext,
  usePageContentsListQueryData,
  usePageContentsListQueryLoading,
}

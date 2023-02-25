/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getPageComponents, GET_PAGE_COMPONENTS_URL} from '../../api'

const PageComponentsListQueryContext = createContext(initialQuery)

const PageComponentsListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PAGE_COMPONENTS_URL}`,
    () => {
      return getPageComponents()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <PageComponentsListQueryContext.Provider value={value}>
      {children}
    </PageComponentsListQueryContext.Provider>
  )
}

const usePageComponentsListQueryContext = () => {
  return useContext(PageComponentsListQueryContext)
}

const usePageComponentsListQueryData = () => {
  const {response} = usePageComponentsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const usePageComponentsListQueryLoading = () => {
  const {isLoading} = usePageComponentsListQueryContext()
  return isLoading
}

export {
  PageComponentsListQueryProvider,
  usePageComponentsListQueryContext,
  usePageComponentsListQueryData,
  usePageComponentsListQueryLoading,
}

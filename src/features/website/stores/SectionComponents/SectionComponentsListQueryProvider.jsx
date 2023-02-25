/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getSectionComponents, GET_SECTION_COMPONENTS_URL} from '../../api'

const SectionComponentsListQueryContext = createContext(initialQuery)

const SectionComponentsListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_SECTION_COMPONENTS_URL}`,
    () => {
      return getSectionComponents()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <SectionComponentsListQueryContext.Provider value={value}>
      {children}
    </SectionComponentsListQueryContext.Provider>
  )
}

const useSectionComponentsListQueryContext = () => {
  return useContext(SectionComponentsListQueryContext)
}

const useSectionComponentsListQueryData = () => {
  const {response} = useSectionComponentsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useSectionComponentsListQueryLoading = () => {
  const {isLoading} = useSectionComponentsListQueryContext()
  return isLoading
}

export {
  SectionComponentsListQueryProvider,
  useSectionComponentsListQueryContext,
  useSectionComponentsListQueryData,
  useSectionComponentsListQueryLoading,
}

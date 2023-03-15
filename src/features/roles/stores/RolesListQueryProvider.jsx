/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUserTypes, GET_USER_TYPES_URL} from '../api'

const RolesListQueryContext = createContext(initialQuery)

const RolesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_USER_TYPES_URL}`,
    () => {
      return getUserTypes()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <RolesListQueryContext.Provider value={value}>{children}</RolesListQueryContext.Provider>
}

const useRolesListQueryContext = () => {
  return useContext(RolesListQueryContext)
}

const useRolesListQueryData = () => {
  const {response} = useRolesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useRolesListQueryLoading = () => {
  const {isLoading} = useRolesListQueryContext()
  return isLoading
}

export {
  RolesListQueryProvider,
  useRolesListQueryContext,
  useRolesListQueryData,
  useRolesListQueryLoading,
}

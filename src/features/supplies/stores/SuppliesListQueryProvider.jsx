/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getSupplies, GET_SUPPLIES_URL} from '../api'
import {useBranch} from '@/providers/BranchProvider'

const SuppliesListQueryContext = createContext(initialQuery)

const SuppliesListQueryProvider = ({children}) => {
  const {defaultBranch} = useBranch()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_SUPPLIES_URL, defaultBranch?.branchId],
    queryFn: () => getSupplies(defaultBranch?.branchId),
    enabled: !!defaultBranch?.branchId,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <SuppliesListQueryContext.Provider value={value}>{children}</SuppliesListQueryContext.Provider>
  )
}

const useSuppliesListQueryContext = () => {
  return useContext(SuppliesListQueryContext)
}

const useSuppliesListQueryData = () => {
  const {response} = useSuppliesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useSuppliesListQueryLoading = () => {
  const {isLoading} = useSuppliesListQueryContext()
  return isLoading
}

export {
  SuppliesListQueryProvider,
  useSuppliesListQueryContext,
  useSuppliesListQueryData,
  useSuppliesListQueryLoading,
}

/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getBranches, GET_BRANCHES_URL} from '@/features/branches/api'

const BranchesListQueryContext = createContext(initialQuery)

const BranchesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_BRANCHES_URL}`,
    () => {
      return getBranches()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <BranchesListQueryContext.Provider value={value}>{children}</BranchesListQueryContext.Provider>
  )
}

const useBranchesListQueryContext = () => {
  return useContext(BranchesListQueryContext)
}

const useBranchesListQueryData = () => {
  const {response} = useBranchesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useBranchesListQueryLoading = () => {
  const {isLoading} = useBranchesListQueryContext()
  return isLoading
}

export {
  BranchesListQueryProvider,
  useBranchesListQueryContext,
  useBranchesListQueryData,
  useBranchesListQueryLoading,
}

/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getBranchInfo, GET_BRANCH_INFO_URL} from '../api'

const BranchInfoQueryContext = createContext(initialQuery)

const BranchInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_BRANCH_INFO_URL, searchParams?.branchId],
    queryFn: () => getBranchInfo(searchParams?.branchId),
    enabled: !!searchParams?.branchId,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <BranchInfoQueryContext.Provider value={value}>{children}</BranchInfoQueryContext.Provider>
}

const useBranchInfoQueryContext = () => {
  return useContext(BranchInfoQueryContext)
}

const useBranchInfoQueryData = () => {
  const {response} = useBranchInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useBranchInfoQueryLoading = () => {
  const {isLoading} = useBranchInfoQueryContext()
  return isLoading
}

export {
  BranchInfoQueryProvider,
  useBranchInfoQueryContext,
  useBranchInfoQueryData,
  useBranchInfoQueryLoading,
}

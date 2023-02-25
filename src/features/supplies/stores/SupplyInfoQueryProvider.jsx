/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getSupplyInfo, GET_SUPPLY_INFO_URL} from '../api'
import {useBranch} from '@/providers/BranchProvider'

const SupplyInfoQueryContext = createContext(initialQuery)

const SupplyInfoQueryProvider = ({children}) => {
  const searchParams = useParams()
  const {defaultBranch} = useBranch()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_SUPPLY_INFO_URL}-${searchParams.supplyId}-${defaultBranch.branchId}`,
    () => {
      return getSupplyInfo(searchParams.supplyId, defaultBranch.branchId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <SupplyInfoQueryContext.Provider value={value}>{children}</SupplyInfoQueryContext.Provider>
}

const useSupplyInfoQueryContext = () => {
  return useContext(SupplyInfoQueryContext)
}

const useSupplyInfoQueryData = () => {
  const {response} = useSupplyInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useSupplyInfoQueryLoading = () => {
  const {isLoading} = useSupplyInfoQueryContext()
  return isLoading
}

export {
  SupplyInfoQueryProvider,
  useSupplyInfoQueryContext,
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
}

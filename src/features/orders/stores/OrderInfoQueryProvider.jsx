/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getOrderInfo, GET_ORDER_INFO_URL} from '../api'
import {useBranch} from '@/providers/BranchProvider'

const OrderInfoQueryContext = createContext(initialQuery)

const OrderInfoQueryProvider = ({children}) => {
  const searchParams = useParams()
  const {defaultBranch} = useBranch()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_ORDER_INFO_URL}-${searchParams.orderId}-${defaultBranch.branchId}`,
    () => {
      return getOrderInfo(searchParams.orderId, defaultBranch.branchId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <OrderInfoQueryContext.Provider value={value}>{children}</OrderInfoQueryContext.Provider>
}

const useOrderInfoQueryContext = () => {
  return useContext(OrderInfoQueryContext)
}

const useOrderInfoQueryData = () => {
  const {response} = useOrderInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useOrderInfoQueryLoading = () => {
  const {isLoading} = useOrderInfoQueryContext()
  return isLoading
}

export {
  OrderInfoQueryProvider,
  useOrderInfoQueryContext,
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
}

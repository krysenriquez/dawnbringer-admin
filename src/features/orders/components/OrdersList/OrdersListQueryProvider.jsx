/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getOrders, GET_ORDERS_URL} from '../../api'

const OrdersListQueryContext = createContext(initialQuery)

const OrdersListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_ORDERS_URL}`,
    () => {
      return getOrders()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <OrdersListQueryContext.Provider value={value}>{children}</OrdersListQueryContext.Provider>
}

const useOrdersListQueryContext = () => {
  return useContext(OrdersListQueryContext)
}

const useOrdersListQueryData = () => {
  const {response} = useOrdersListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useOrdersListQueryLoading = () => {
  const {isLoading} = useOrdersListQueryContext()
  return isLoading
}

export {
  OrdersListQueryProvider,
  useOrdersListQueryContext,
  useOrdersListQueryData,
  useOrdersListQueryLoading,
}

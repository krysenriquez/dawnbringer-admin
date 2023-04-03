/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getCustomers, GET_CUSTOMERS_URL} from '../api'

const CustomersListQueryContext = createContext(initialQuery)

const CustomersListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_CUSTOMERS_URL],
    queryFn: () => getCustomers(),
    enabled: true,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <CustomersListQueryContext.Provider value={value}>
      {children}
    </CustomersListQueryContext.Provider>
  )
}

const useCustomersListQueryContext = () => {
  return useContext(CustomersListQueryContext)
}

const useCustomersListQueryData = () => {
  const {response} = useCustomersListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useCustomersListQueryLoading = () => {
  const {isLoading} = useCustomersListQueryContext()
  return isLoading
}

export {
  CustomersListQueryProvider,
  useCustomersListQueryContext,
  useCustomersListQueryData,
  useCustomersListQueryLoading,
}

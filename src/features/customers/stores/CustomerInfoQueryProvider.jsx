/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getCustomer, GET_CUSTOMER_INFO_URL} from '../api'

const CustomerInfoQueryContext = createContext(initialQuery)

const CustomerInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_CUSTOMER_INFO_URL, searchParams?.customerNumber],
    queryFn: () => getCustomer(searchParams?.customerNumber),
    enabled: !!searchParams?.customerNumber,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <CustomerInfoQueryContext.Provider value={value}>{children}</CustomerInfoQueryContext.Provider>
  )
}

const useCustomerInfoQueryContext = () => {
  return useContext(CustomerInfoQueryContext)
}

const useCustomerInfoQueryData = () => {
  const {response} = useCustomerInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useCustomerInfoQueryLoading = () => {
  const {isLoading} = useCustomerInfoQueryContext()
  return isLoading
}

export {
  CustomerInfoQueryProvider,
  useCustomerInfoQueryContext,
  useCustomerInfoQueryData,
  useCustomerInfoQueryLoading,
}

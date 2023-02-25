/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getProductTypeInfo, GET_PRODUCT_TYPE_INFO_URL} from '../api'

const ProductTypeInfoQueryContext = createContext(initialQuery)

const ProductTypeInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PRODUCT_TYPE_INFO_URL}-${searchParams.productTypeId}`,
    () => {
      return getProductTypeInfo(searchParams.productTypeId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <ProductTypeInfoQueryContext.Provider value={value}>
      {children}
    </ProductTypeInfoQueryContext.Provider>
  )
}

const useProductTypeInfoQueryContext = () => {
  return useContext(ProductTypeInfoQueryContext)
}

const useProductTypeInfoQueryData = () => {
  const {response} = useProductTypeInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useProductTypeInfoQueryLoading = () => {
  const {isLoading} = useProductTypeInfoQueryContext()
  return isLoading
}

export {
  ProductTypeInfoQueryProvider,
  useProductTypeInfoQueryContext,
  useProductTypeInfoQueryData,
  useProductTypeInfoQueryLoading,
}

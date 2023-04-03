/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getProductTypes, GET_PRODUCT_TYPES_URL} from '@/features/product-type/api'

const ProductTypesListQueryContext = createContext(initialQuery)

const ProductTypesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_PRODUCT_TYPES_URL],
    queryFn: () => getProductTypes(),
    enabled: true,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <ProductTypesListQueryContext.Provider value={value}>
      {children}
    </ProductTypesListQueryContext.Provider>
  )
}

const useProductTypesListQueryContext = () => {
  return useContext(ProductTypesListQueryContext)
}

const useProductTypesListQueryData = () => {
  const {response} = useProductTypesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useProductTypesListQueryLoading = () => {
  const {isLoading} = useProductTypesListQueryContext()
  return isLoading
}

export {
  ProductTypesListQueryProvider,
  useProductTypesListQueryContext,
  useProductTypesListQueryData,
  useProductTypesListQueryLoading,
}

/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getProducts, GET_PRODUCTS_URL} from '../../api'

const ProductsListQueryContext = createContext(initialQuery)

const ProductsListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PRODUCTS_URL}`,
    () => {
      return getProducts()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <ProductsListQueryContext.Provider value={value}>{children}</ProductsListQueryContext.Provider>
  )
}

const useProductsListQueryContext = () => {
  return useContext(ProductsListQueryContext)
}

const useProductsListQueryData = () => {
  const {response} = useProductsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useProductsListQueryLoading = () => {
  const {isLoading} = useProductsListQueryContext()
  return isLoading
}

export {
  ProductsListQueryProvider,
  useProductsListQueryContext,
  useProductsListQueryData,
  useProductsListQueryLoading,
}

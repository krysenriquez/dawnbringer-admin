/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getProductInfo, GET_PRODUCT_INFO_URL} from '@/features/product/api'
const ProductInfoQueryContext = createContext(initialQuery)

const ProductInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PRODUCT_INFO_URL}-${searchParams.product_id}`,
    () => {
      return getProductInfo(searchParams.product_id)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <ProductInfoQueryContext.Provider value={value}>{children}</ProductInfoQueryContext.Provider>
  )
}

const useProductInfoQueryContext = () => {
  return useContext(ProductInfoQueryContext)
}

const useProductInfoQueryData = () => {
  const {response} = useProductInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useProductInfoQueryLoading = () => {
  const {isLoading} = useProductInfoQueryContext()
  return isLoading
}

export {
  ProductInfoQueryProvider,
  useProductInfoQueryContext,
  useProductInfoQueryData,
  useProductInfoQueryLoading,
}

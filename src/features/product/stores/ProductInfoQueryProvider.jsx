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
  } = useQuery({
    queryKey: [GET_PRODUCT_INFO_URL, searchParams?.productId],
    queryFn: () => getProductInfo(searchParams?.productId),
    enabled: !!searchParams?.productId,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

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

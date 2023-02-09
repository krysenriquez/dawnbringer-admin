/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getProductVariantInfo, GET_PRODUCT_VARIANT_INFO_URL} from '../api'

const ProductVariantInfoQueryContext = createContext(initialQuery)

const ProductVariantInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PRODUCT_VARIANT_INFO_URL}-${searchParams.sku}`,
    () => {
      return getProductVariantInfo(searchParams.sku)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <ProductVariantInfoQueryContext.Provider value={value}>
      {children}
    </ProductVariantInfoQueryContext.Provider>
  )
}

const useProductVariantInfoQueryContext = () => {
  return useContext(ProductVariantInfoQueryContext)
}

const useProductVariantInfoQueryData = () => {
  const {response} = useProductVariantInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useProductVariantInfoQueryLoading = () => {
  const {isLoading} = useProductVariantInfoQueryContext()
  return isLoading
}

export {
  ProductVariantInfoQueryProvider,
  useProductVariantInfoQueryContext,
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
}

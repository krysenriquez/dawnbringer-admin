/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {useBranch} from '@/providers/BranchProvider'
import {getProductVariantInfo, GET_PRODUCT_VARIANT_INFO_URL} from '../api'

const ProductVariantInfoQueryContext = createContext(initialQuery)

const ProductVariantInfoQueryProvider = ({children}) => {
  const searchParams = useParams()
  const {defaultBranch} = useBranch()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_PRODUCT_VARIANT_INFO_URL, searchParams?.sku, defaultBranch?.branchId],
    queryFn: () => getProductVariantInfo(searchParams?.sku, defaultBranch?.branchId),
    enabled: !!searchParams?.sku && !!defaultBranch?.branchId,
  })

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

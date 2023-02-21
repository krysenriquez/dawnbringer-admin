/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {useBranch} from '@/providers/BranchProvider'
import {getProductVariants, GET_PRODUCT_VARIANTS_URL} from '../api'

const ProductVariantsListQueryContext = createContext(initialQuery)

const ProductVariantsListQueryProvider = ({children}) => {
  const searchParams = useParams()
  const {defaultBranch} = useBranch()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PRODUCT_VARIANTS_URL}-${defaultBranch.branchId}`,
    () => {
      return getProductVariants(defaultBranch.branchId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <ProductVariantsListQueryContext.Provider value={value}>
      {children}
    </ProductVariantsListQueryContext.Provider>
  )
}

const useProductVariantsListQueryContext = () => {
  return useContext(ProductVariantsListQueryContext)
}

const useProductVariantsListQueryData = () => {
  const {response} = useProductVariantsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useProductVariantsListQueryLoading = () => {
  const {isLoading} = useProductVariantsListQueryContext()
  return isLoading
}

export {
  ProductVariantsListQueryProvider,
  useProductVariantsListQueryContext,
  useProductVariantsListQueryData,
  useProductVariantsListQueryLoading,
}

import {useMemo} from 'react'
import {ProductVariantInfo} from './ProductVariantInfo'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'

export const ProductVariantInfoPage = () => {
  const isLoading = useProductVariantInfoQueryLoading()
  const variant = useProductVariantInfoQueryData()
  const data = useMemo(() => variant, [variant])

  return <>{isLoading ? <div>Loading..</div> : <ProductVariantInfo variant={data} />}</>
}

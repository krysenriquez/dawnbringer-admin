import {useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {ProductVariantInfo} from './ProductVariant/ProductVariantInfo'
import {
  ProductVariantInfoQueryProvider,
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from './ProductVariant/ProductVariantInfoQueryProvider'

const ProductVariantInfoPage = () => {
  const isLoading = useProductVariantInfoQueryLoading()
  const variant = useProductVariantInfoQueryData()
  const selectedVariant = useMemo(() => variant, [variant])
  
  return <>{isLoading ? <div>Loading..</div> : <ProductVariantInfo variant={selectedVariant} />}</>
}

const ProductVariantInfoWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Product Variant'>
        {intl.formatMessage({id: 'MENU.PRODUCTS'})}
      </PageTitle>
      <ProductVariantInfoQueryProvider>
        <ProductVariantInfoPage />
      </ProductVariantInfoQueryProvider>
    </>
  )
}

export {ProductVariantInfoWrapper}

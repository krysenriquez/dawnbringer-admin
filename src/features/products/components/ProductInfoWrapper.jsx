import {useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {
  ProductInfoQueryProvider,
  useProductInfoQueryData,
  useProductInfoQueryLoading,
} from './ProductInfo/ProductInfoQueryProvider'
import {ProductInfo} from './ProductInfo/ProductInfo'
import {Loading} from '@/components/elements/Loading/Loading'

const ProductInfoPage = () => {
  const isLoading = useProductInfoQueryLoading()
  const product = useProductInfoQueryData()
  const data = useMemo(() => product, [product])

  return <>{isLoading ? <Loading /> : <ProductInfo product={data} />}</>
}

const ProductInfoWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Product Info'>
        {intl.formatMessage({id: 'MENU.PRODUCTS'})}
      </PageTitle>
      <ProductInfoQueryProvider>
        <ProductInfoPage />
      </ProductInfoQueryProvider>
    </>
  )
}

export {ProductInfoWrapper}

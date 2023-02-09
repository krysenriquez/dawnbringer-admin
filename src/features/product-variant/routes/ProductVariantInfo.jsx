import {ProductVariantInfoQueryProvider} from '../stores/ProductVariantInfoQueryProvider'
import {ProductVariantInfoPage} from '../components/ProductVariantInfo/ProductVariantInfoPage'

const ProductVariantInfo = () => {
  return (
    <>
      <ProductVariantInfoQueryProvider>
        <ProductVariantInfoPage />
      </ProductVariantInfoQueryProvider>
    </>
  )
}

export default ProductVariantInfo

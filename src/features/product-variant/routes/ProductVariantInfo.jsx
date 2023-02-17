import {ProductVariantInfoQueryProvider} from '../stores/ProductVariantInfoQueryProvider'
import {ProductVariantInfoPage} from '../components/ProductVariantInfo/ProductVariantInfoPage'
import ProductVariantInfoForm from '../components/ProductVariantInfo/ProductVariantInfoForm'

const ProductVariantInfo = () => {
  return (
    <>
      <ProductVariantInfoQueryProvider>
        <ProductVariantInfoForm />
      </ProductVariantInfoQueryProvider>
    </>
  )
}

export default ProductVariantInfo

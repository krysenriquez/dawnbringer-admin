import ProductVariantCreateForm from '../components/ProductVariantCreate/ProductVariantCreateForm'
import {ProductVariantCreateProvider} from '../stores/ProductVariantCreateProvider'

const ProductVariantCreate = () => {
  return (
    <ProductVariantCreateProvider>
      <ProductVariantCreateForm />
    </ProductVariantCreateProvider>
  )
}

export default ProductVariantCreate

import {ProductVariantCreateProvider} from '../stores/ProductVariantCreateProvider'
import {ProductVariantInfoQueryProvider} from '../stores/ProductVariantInfoQueryProvider'
import ProductVariantEditForm from '../components/ProductVariantEdit/ProductVariantEditForm'

const ProductVariantEdit = () => {
  return (
    <ProductVariantCreateProvider>
      <ProductVariantInfoQueryProvider>
        <ProductVariantEditForm />
      </ProductVariantInfoQueryProvider>
    </ProductVariantCreateProvider>
  )
}

export default ProductVariantEdit

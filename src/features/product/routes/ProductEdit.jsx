import {ProductCreateProvider} from '@/features/product/stores/ProductCreateProvider'
import {ProductInfoQueryProvider} from '../stores/ProductInfoQueryProvider'
import ProductEditForm from '../components/ProductEdit/ProductEditForm'

const ProductEdit = () => {
  return (
    <ProductCreateProvider>
      <ProductInfoQueryProvider>
        <ProductEditForm />
      </ProductInfoQueryProvider>
    </ProductCreateProvider>
  )
}

export default ProductEdit

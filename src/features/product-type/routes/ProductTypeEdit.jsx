import {ProductTypeInfoQueryProvider} from '../stores/ProductTypeInfoQueryProvider'
import ProductTypeEditForm from '../components/ProductTypeEdit/ProductTypeEditForm'

const ProductTypeEdit = () => {
  return (
    <ProductTypeInfoQueryProvider>
      <ProductTypeEditForm />
    </ProductTypeInfoQueryProvider>
  )
}

export default ProductTypeEdit

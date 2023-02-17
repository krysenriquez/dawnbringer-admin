import {ProductTypeInfoQueryProvider} from '../stores/ProductTypeInfoQueryProvider'
import ProductTypeInfoForm from '../components/ProductTypeInfo/ProductTypeInfoForm'

const ProductTypeInfo = () => {
  return (
    <ProductTypeInfoQueryProvider>
      <ProductTypeInfoForm />
    </ProductTypeInfoQueryProvider>
  )
}

export default ProductTypeInfo

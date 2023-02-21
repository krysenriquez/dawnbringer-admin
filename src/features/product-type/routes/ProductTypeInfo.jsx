import {ProductTypeInfoQueryProvider} from '../stores/ProductTypeInfoQueryProvider'
import ProductTypeInfoPage from '../components/ProductTypeInfo/ProductTypeInfoPage'

const ProductTypeInfo = () => {
  return (
    <ProductTypeInfoQueryProvider>
      <ProductTypeInfoPage />
    </ProductTypeInfoQueryProvider>
  )
}

export default ProductTypeInfo

import ProductCreateForm from '../components/ProductCreate/ProductCreateForm'
import {ProductCreateProvider} from '@/features/product/stores/ProductCreateProvider'

const ProductCreate = () => {
  return (
    <>
      <ProductCreateProvider>
        <ProductCreateForm />
      </ProductCreateProvider>
    </>
  )
}

export default ProductCreate

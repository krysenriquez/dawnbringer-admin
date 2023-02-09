import {ProductInfoQueryProvider} from '../stores/ProductInfoQueryProvider'
import {ProductInfoPage} from '../components/ProductInfo/ProductInfoPage'

const ProductInfo = () => {
  return (
    <>
      <ProductInfoQueryProvider>
        <ProductInfoPage />
      </ProductInfoQueryProvider>
    </>
  )
}

export default ProductInfo
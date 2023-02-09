import {ProductVariantsListQueryProvider} from '../stores/ProductVariantsListQueryProvider'
import {ProductVariantsListTable} from '../components/ProductVariantsList/ProductVariantsListTable'

const ProductVariantsList = () => {
  return (
    <>
      <ProductVariantsListQueryProvider>
        <ProductVariantsListTable />
      </ProductVariantsListQueryProvider>
    </>
  )
}

export default ProductVariantsList

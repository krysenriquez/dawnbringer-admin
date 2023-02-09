import {ProductsListQueryProvider} from '../stores/ProductsListQueryProvider'
import ProductsListTable from '../components/ProductsList/ProductsListTable'

const ProductsList = () => {
  return (
    <>
      <ProductsListQueryProvider>
        <ProductsListTable />
      </ProductsListQueryProvider>
    </>
  )
}

export default ProductsList
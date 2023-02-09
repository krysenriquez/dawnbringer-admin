import {ProductTypesListQueryProvider} from '../stores/ProductTypesListQueryProvider'
import ProductTypesListTable from '../components/ProductTypesList/ProductTypesListTable'

const ProductTypesList = () => {
  return (
    <>
      <ProductTypesListQueryProvider>
        <ProductTypesListTable />
      </ProductTypesListQueryProvider>
    </>
  )
}

export default ProductTypesList

import clsx from 'clsx'
import CustomCard from '@/components/elements/Card/CustomCard'
import {
  useProductTypeInfoQueryData,
  useProductTypeInfoQueryLoading,
} from '../../stores/ProductTypeInfoQueryProvider'
import ProductTypeDetails from './components/ProductTypeDetails'
import ProductsTable from './components/Products/ProductsTable'

const ProductTypeInfoPage = () => {
  const productTypeInfo = useProductTypeInfoQueryData()
  const isLoading = useProductTypeInfoQueryLoading()

  return (
    <>
      {Object.keys(productTypeInfo).length > 0 && !isLoading ? (
        <>
          <div className='form d-flex flex-column flex-lg-row'>
            <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
              <ProductTypeDetails />
            </div>
            <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
              <ProductsTable />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default ProductTypeInfoPage

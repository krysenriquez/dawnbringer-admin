import clsx from 'clsx'
import CustomCard from '@/components/elements/Card/CustomCard'
import {
  useProductInfoQueryData,
  useProductInfoQueryLoading,
} from '../../stores/ProductInfoQueryProvider'
import ProductDetails from './components/ProductDetails'
import ProductVariantsTable from './components/ProductVariants/ProductVariantsTable'

const ProductInfoPage = () => {
  const productInfo = useProductInfoQueryData()
  const isLoading = useProductInfoQueryLoading()

  return (
    <>
      {Object.keys(productInfo).length > 0 && !isLoading ? (
        <>
          <div className='form d-flex flex-column flex-lg-row'>
            <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
              <ProductDetails />
            </div>
            <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
              <ProductVariantsTable />
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

export default ProductInfoPage

import clsx from 'clsx'
import {toCurrency} from '@/utils/toCurrency'
import CustomCard from '@/components/elements/Card/CustomCard'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import ProductVariantDetails from './components/ProductVariantDetails'
import ProductVariantMedia from './components/ProductVariantMedia'
import ProductVariantSuppliesTable from './components/ProductVariantSupplies/ProductVariantSuppliesTable'
import ProductVariantOrdersTable from './components/ProductVariantOrders/ProductVariantOrdersTable'

const ProductVariantInfoPage = () => {
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()

  return (
    <>
      {Object.keys(productVariantInfo).length > 0 && !isLoading ? (
        <>
          <div className='form d-flex flex-column flex-lg-row'>
            <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
              <ProductVariantDetails />
            </div>
            <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
              <ProductVariantOrdersTable />
              <ProductVariantSuppliesTable />
              <ProductVariantMedia />
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

export default ProductVariantInfoPage

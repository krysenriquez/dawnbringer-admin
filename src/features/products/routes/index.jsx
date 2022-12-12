import {Route, Routes, Outlet} from 'react-router-dom'
import {ProductsListWrapper} from '../components/ProductsListWrapper'
import {ProductInfoWrapper} from '../components/ProductInfoWrapper'
import {ProductVariantInfoWrapper} from '../components/ProductVariantInfoWrapper'

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<ProductsListWrapper />} />
      <Route path=':product_id' element={<ProductInfoWrapper />}>
        <Route path=':sku' element={<ProductVariantInfoWrapper />} />
      </Route>
    </Routes>
  )
}

export default ProductsRoutes

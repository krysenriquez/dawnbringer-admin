import {ProductInfoCard} from './components/ProductInfoCard'

export const ProductInfoPage = () => {
  return (
    <div className='form d-flex flex-column flex-lg-row'>
      <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
        <ProductInfoCard />
      </div>
      <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
        <div className='card card-flush py-4'></div>
        {/* <Outlet /> */}
      </div>
    </div>
  )
}

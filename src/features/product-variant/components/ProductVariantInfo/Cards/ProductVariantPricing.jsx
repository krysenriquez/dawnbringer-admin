import {useEffect} from 'react'
import {useState} from 'react'
// import {useDebounce, useDebouncedCallback} from 'use-debounce'

const ProductVariantPricing = ({variant}) => {
  const [productPrice, setproductPrice] = useState({})
  const [discount, setDiscount] = useState({})

  // const debouncedPrice = useDebouncedCallback((value) => {
  //   setproductPrice(value)
  // }, 0)

  // const debouncedDiscount = useDebouncedCallback((value) => {
  //   setDiscount(value)
  // }, 0)

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Pricing</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='mb-10 fv-row fv-plugins-icon-container'>
          <label className='required form-label'>Base Price</label>
          <input
            name='price'
            className='form-control mb-2'
            placeholder='Product price'
            defaultValue={variant.price}
            onChange={(e) => debouncedPrice(e.target.value)}
          />
          <div className='text-muted fs-7'>Set the product price.</div>
          <div className='fv-plugins-message-container invalid-feedback'></div>
        </div>
        <div className='mb-10 fv-row' id='kt_ecommerce_add_product_discount_fixed'>
          <label className='form-label'>Discounted Price</label>
          <input
            name='dicsounted_price'
            className='form-control mb-2'
            placeholder='Discounted price'
            defaultValue={variant.discount}
            onChange={(e) => debouncedDiscount(e.target.value)}
          />
          <div className='text-muted fs-7'>
            Set the discounted product price. The product will be reduced at the determined fixed
            price
          </div>
        </div>
      </div>
    </div>
  )
}
export {ProductVariantPricing}

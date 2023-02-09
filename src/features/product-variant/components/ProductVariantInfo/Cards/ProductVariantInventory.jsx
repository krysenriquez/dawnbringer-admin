import {useEffect} from 'react'
import {useState} from 'react'

const ProductVariantInventory = ({variant}) => {
  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Inventory</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='mb-10 fv-row fv-plugins-icon-container'>
          <label className='required form-label'>SKU</label>
          <input
            type='text'
            name='sku'
            className='form-control mb-2'
            placeholder='SKU Number'
            value='011985001'
          />
          <div className='text-muted fs-7'>Enter the product SKU.</div>
          <div className='fv-plugins-message-container invalid-feedback'></div>
        </div>
        <div className='mb-10 fv-row fv-plugins-icon-container'>
          <label className='required form-label'>Quantity</label>
          <div className='d-flex gap-3'>
            <input
              type='number'
              name='shelf'
              className='form-control mb-2'
              placeholder='On shelf'
              value='24'
            />
            <input
              type='number'
              name='warehouse'
              className='form-control mb-2'
              placeholder='In warehouse'
            />
          </div>
          <div className='text-muted fs-7'>Enter the product quantity.</div>
          <div className='fv-plugins-message-container invalid-feedback'></div>
        </div>
      </div>
    </div>
  )
}
export {ProductVariantInventory}

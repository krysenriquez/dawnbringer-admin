import {useEffect} from 'react'
import {useState} from 'react'
import ReactQuill from 'react-quill'
// import {useDebounce, useDebouncedCallback} from 'use-debounce'

const ProductVariantGeneral = ({variant}) => {
  const [name, setName] = useState({})
  const [description, setDescription] = useState({})

  // const debouncedName = useDebouncedCallback((value) => {
  //   setName(value)
  // }, 0)

  // const debouncedQuill = useDebouncedCallback((value) => {
  //   setDescription(value)
  // }, 0)

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>General</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='mb-10 fv-row fv-plugins-icon-container'>
          <label className='required form-label'>Product Name</label>
          <input
            type='text'
            name='product_name'
            className='form-control mb-2'
            placeholder='Product name'
            defaultValue={variant.variant_name}
            onChange={(e) => debouncedName(e.target.value)}
          />
          <div className='text-muted fs-7'>
            A product name is required and recommended to be unique.
          </div>
          <div className='fv-plugins-message-container invalid-feedback'></div>
        </div>
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
        <div>
          <label className='form-label'>Description</label>
          <ReactQuill
            theme={'snow'}
            defaultValue={variant.variant_description}
            onChange={(e) => debouncedQuill(e)}
          />
          <div className='text-muted fs-7'>
            Set a description to the product for better visibility.
          </div>
        </div>
      </div>
    </div>
  )
}
export {ProductVariantGeneral}

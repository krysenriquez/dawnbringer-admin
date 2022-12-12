import {useEffect} from 'react'
import {useState} from 'react'
import ReactQuill from 'react-quill'
import {useDebounce, useDebouncedCallback} from 'use-debounce'

const Meta = ({variant}) => {
  const [data, setData] = useState(variant)
  const [description, setDescription] = useState({})

  const debouncedQuill = useDebouncedCallback((value) => {
    setDescription(value)
  }, 0)

  useEffect(() => {
    setData(variant)
  }, [variant])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Meta Options</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='mb-10'>
          <label className='form-label'>Meta Tag Title</label>
          <input
            type='text'
            className='form-control mb-2'
            name='meta_title'
            placeholder='Meta tag name'
          />
          <div className='text-muted fs-7'>
            Set a meta tag title. Recommended to be simple and precise keywords.
          </div>
        </div>
        <div className='mb-10'>
          <label className='form-label'>Meta Tag Description</label>
          <ReactQuill
            theme={'snow'}
            defaultValue={data.variant_description}
            onChange={(e) => debouncedQuill(e)}
          />
          <div className='text-muted fs-7'>
            Set a meta tag description to the product for increased SEO ranking.
          </div>
        </div>
        <div>
          <label className='form-label'>Meta Tag Keywords</label>
          <input
            id='kt_ecommerce_add_product_meta_keywords'
            name='kt_ecommerce_add_product_meta_keywords'
            className='form-control mb-2'
          />
          <div className='text-muted fs-7'>
            Set a list of keywords that the product is related to. Separate the keywords by adding a
            comma
            <code>,</code>between each keyword.
          </div>
        </div>
      </div>
    </div>
  )
}
export {Meta}

import clsx from 'clsx'
import {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {useProductInfoQueryData} from '@/features/product/stores/ProductInfoQueryProvider'

const ProductInfoCard = () => {
  const product = useProductInfoQueryData()
  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
  const [thumbnail, setThumbnail] = useState({})
  const [hasNoThumbnail, setHasNoThumbnail] = useState(true)

  useEffect(() => {
    if (product.product_image) {
      setThumbnail(product.product_image)
      setHasNoThumbnail(false)
    } else {
      setThumbnail(defaultThumbnail)
      setHasNoThumbnail(true)
    }
  }, [product])

  useEffect(() => {
    if (hasNoThumbnail) {
      setThumbnail(defaultThumbnail)
    }
  }, [theme])

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h3>Product</h3>
        </div>
      </div>
      <div className='card-body pt-5'>
        {product ? (
          <>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-150px mb-7'>
                <img src={`${thumbnail}`} alt='image' />
              </div>
              <div className='fs-3 text-gray-800 text-hover-primary fw-bold mb-1'>
                {product.productName}
              </div>
            </div>
            <div className='d-flex flex-stack fs-4 py-3'>
              <div className='fw-bold'>Status</div>
              <div
                className={clsx('badge fw-bolder d-inline', {
                  'badge-light-success': product.productStatus == 'ACTIVE',
                  'badge-light-warning': product.productStatus == 'DRAFT',
                  'badge-light-danger': product.productStatus == 'INACTIVE',
                })}
              >
                {product.productStatus}
              </div>
            </div>
            <div className='separator separator-dashed my-3'></div>
            <div className='pb-5 fs-6'>
              <div className='fw-bold mt-5'>Description</div>
              <div className='text-gray-600'>{product.productDescription}</div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export {ProductInfoCard}

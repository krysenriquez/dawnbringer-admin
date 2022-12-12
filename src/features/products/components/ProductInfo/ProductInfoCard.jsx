import clsx from 'clsx'
import {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {useThemeMode} from '@/providers/ThemeModeProvider'

const ProductInfoCard = ({product}) => {
  const theme = useThemeMode()
  const defaultThumbnail =
    `/public/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
  const [thumbnail, setThumbnail] = useState({})
  const [data, setData] = useState(product)
  const [hasNoThumbnail, setHasNoThumbnail] = useState(false)

  useEffect(() => {
    if (data?.product_variants[0]?.media[0]?.file_attachment) {
      setThumbnail(data?.product_variants[0]?.media[0]?.file_attachment)
      setHasNoThumbnail(false)
    } else {
      setThumbnail(defaultThumbnail)
      setHasNoThumbnail(true)
    }
  }, [data])

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
        <div className='d-flex flex-center flex-column mb-5'>
          <div className='symbol symbol-150px mb-7'>
            <img src={`${thumbnail}`} alt='image' />
          </div>
          <div className='fs-3 text-gray-800 text-hover-primary fw-bold mb-1'>
            {data.product_name}
          </div>
        </div>
        <div className='d-flex flex-stack fs-4 py-3'>
          <div className='fw-bold'>Status</div>
          <div
            className={clsx('badge fw-bolder d-inline', {
              'badge-light-success': data.product_status == 'ACTIVE',
              'badge-light-warning': data.product_status == 'DRAFT',
              'badge-light-danger': data.product_status == 'INACTIVE',
            })}
          >
            {data.product_status}
          </div>
        </div>
        <div className='separator separator-dashed my-3'></div>
        <div className='pb-5 fs-6'>
          <div className='fw-bold mt-5'>Description</div>
          <div className='text-gray-600'>{data.product_description}</div>
        </div>
      </div>
    </div>
  )
}

export {ProductInfoCard}

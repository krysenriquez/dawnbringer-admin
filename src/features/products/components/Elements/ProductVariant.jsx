import clsx from 'clsx'
import {useState, useEffect} from 'react'
import {useThemeMode} from '@/providers/ThemeModeProvider'

const ProductVariant = ({variant, handleClick}) => {
  const theme = useThemeMode()
  const defaultThumbnail =
    `/public/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
  const [thumbnail, setThumbnail] = useState({})
  const [data, setData] = useState(variant)
  const [hasNoThumbnail, setHasNoThumbnail] = useState(false)

  useEffect(() => {
    if (data?.media[0]?.file_attachment) {
      setThumbnail(data?.media[0]?.file_attachment)
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
    <div
      className='d-flex align-items-center mb-7 bg-hover-light text-hover-inverse-light px-2 py-2'
      onClick={() => handleClick(data)}
    >
      <div className='symbol symbol-50px me-5'>
        <img src={`${thumbnail}`} alt='image' />
      </div>
      <div className='d-flex flex-column'>
        <span className='text-dark fs-6 fw-bold'>{data.sku}</span>
        <span className='text-muted fw-semibold'>{data.variant_name}</span>
      </div>
    </div>
  )
}

export {ProductVariant}

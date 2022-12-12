import {useState, useEffect} from 'react'
import {useThemeMode} from '@/providers/ThemeModeProvider'

const productsVariantsColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.variant_name,
    id: 'variant_name',
    cell: (info) => {
      const theme = useThemeMode()
      const defaultThumbnail =
        `/public/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
      const [thumbnail, setThumbnail] = useState({})
      const [hasNoThumbnail, setHasNoThumbnail] = useState(false)

      useEffect(() => {
        if (info.row.original?.media[0]?.file_attachment) {
          setThumbnail(info.row.original?.media[0]?.file_attachment)
          setHasNoThumbnail(false)
        } else {
          setThumbnail(defaultThumbnail)
          setHasNoThumbnail(true)
        }
      }, [info.row.original])

      useEffect(() => {
        if (hasNoThumbnail) {
          setThumbnail(defaultThumbnail)
        }
      }, [theme])
      return (
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50px me-5 ps-4'>
            <img src={`${thumbnail}`} className='' alt='' />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <span>{info.getValue()}</span>
          </div>
        </div>
      )
    },
  },
  {
    header: 'SKU',
    accessorFn: (row) => row.sku,
    id: 'sku',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Price',
    accessorFn: (row) => row.price,
    id: 'price',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Created by',
    accessorFn: (row) => row.created_by_name,
    id: 'created_by_name',
    cell: (info) => info.getValue(),
  },
]

export default productsVariantsColumn

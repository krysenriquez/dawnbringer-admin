import {useState, useEffect} from 'react'
import clsx from 'clsx'
import {useThemeMode} from '@/providers/ThemeModeProvider'

export const productVariantsColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.variantName,
    id: 'variantName',
    cell: (info) => {
      const theme = useThemeMode()
      const defaultThumbnail =
        `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
      const [thumbnail, setThumbnail] = useState({})
      const [hasNoThumbnail, setHasNoThumbnail] = useState(false)

      useEffect(() => {
        if (info.row.original.productVariantImage) {
          setThumbnail(info.row.original.productVariantImage)
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
    header: 'Status',
    accessorFn: (row) => row.variant_status,
    id: 'variant_status',
    cell: (info) => (
      <div
        className={clsx('badge fw-bolder d-inline', {
          'badge-light-success': info.getValue() == 'ACTIVE',
          'badge-light-warning': info.getValue() == 'DRAFT',
          'badge-light-danger': info.getValue() == 'INACTIVE',
        })}
      >
        {info.getValue()}
      </div>
    ),
  },
  {
    header: 'Created by',
    accessorFn: (row) => row.created_by_name,
    id: 'created_by_name',
    cell: (info) => info.getValue(),
  },
]

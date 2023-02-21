import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {toCurrency} from '@/utils/toCurrency'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'

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
        if (info.row.original.variantImage) {
          setThumbnail(info.row.original.variantImage)
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
    header: 'Status',
    accessorFn: (row) => row.variantStatus,
    id: 'variantStatus',
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
    accessorFn: (row) => row.createdByName,
    id: 'createdByName',
    cell: (info) => info.getValue(),
  },
]

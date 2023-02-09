import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {ActionCell} from '@/components/elements/Table/Cell/ActionCell'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const productsColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.productName,
    id: 'productName',
    cell: (info) => {
      const theme = useThemeMode()
      const defaultThumbnail =
        `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
      const [thumbnail, setThumbnail] = useState({})
      const [hasNoThumbnail, setHasNoThumbnail] = useState(false)

      useEffect(() => {
        if (info.row.original.productImage) {
          setThumbnail(info.row.original.productImage)
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
    header: 'Status',
    accessorFn: (row) => row.productStatus,
    id: 'productStatus',
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
    header: 'Type',
    accessorFn: (row) => row.productTypeName,
    id: 'productTypeName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Variants Count',
    accessorFn: (row) => row.productVariantsCount,
    id: 'productVariantsCount',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Created by',
    accessorFn: (row) => row.createdByName,
    id: 'createdByName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.productId,
    id: 'productAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.productId}`, {
          state: {productId: info.row.original.productId},
        })
      }

      return (
        <>
          <ActionCell
            handleClick={handleView}
            className='btn btn-icon btn-icon-primary btn-light btn-sm border-0 me-2'
          >
            <CustomSVG path='/media/icons/general/magnifying-glass.svg' className='svg-icon-2' />
          </ActionCell>
        </>
      )
    },
  },
]

export default productsColumn

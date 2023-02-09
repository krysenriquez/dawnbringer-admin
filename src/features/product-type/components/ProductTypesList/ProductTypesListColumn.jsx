import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {ActionCell} from '@/components/elements/Table/Cell/ActionCell'

const productTypesColumn = [
  {
    header: 'Product Type',
    accessorFn: (row) => row.productType,
    id: 'type',
    cell: (info) => {
      const theme = useThemeMode()
      const defaultThumbnail =
        `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')
      const [thumbnail, setThumbnail] = useState({})
      const [hasNoThumbnail, setHasNoThumbnail] = useState(false)

      useEffect(() => {
        if (info.row.original.productTypeImage) {
          setThumbnail(info.row.original.productTypeImage)
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
    accessorFn: (row) => row.productTypeStatus,
    id: 'typeStatus',
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
  {
    header: 'Actions',
    accessorFn: (row) => row.productTypeId,
    id: 'productTypeAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.productTypeId}`, {
          state: {productTypeId: info.row.original.productTypeId},
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

export default productTypesColumn

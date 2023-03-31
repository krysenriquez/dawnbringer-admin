import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import clsx from 'clsx'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'

export const productVariantsColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.variantName,
    id: 'variantName',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Product',
    accessorFn: (row) => row.productName,
    id: 'productName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'SKU',
    accessorFn: (row) => row.sku,
    id: 'sku',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Qty',
    accessorFn: (row) => row.stocks,
    id: 'stocks',
    cell: (info) => {
      return <div className='text-dark fw-bold'>{info.getValue()}</div>
    },
  },
  {
    header: 'Stocks Status',
    accessorFn: (row) => row.stocksStatus,
    id: 'stocksStatus',
    cell: (info) => {
      return (
        <>
          <div
            className={clsx('badge fw-bolder d-inline ms-2', {
              'badge-light-warning': info.getValue() == 'Low Stock',
              'badge-light-danger': info.getValue() == 'No Stock',
              'badge-light-primary': info.getValue() == 'In Stock',
            })}
          >
            {info.getValue()}
          </div>
        </>
      )
    },
  },
]

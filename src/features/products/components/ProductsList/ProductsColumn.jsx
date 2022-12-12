import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
const productsColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.product_name,
    id: 'product_name',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.product_status,
    id: 'product_status',
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
    accessorFn: (row) => row.product_type_name,
    id: 'product_type_name',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Variants Count',
    accessorFn: (row) => row.product_variants_count,
    id: 'product_variants_count',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Created by',
    accessorFn: (row) => row.created_by_name,
    id: 'created_by_name',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.product_id,
    id: 'product_action',
    cell: (info) => (
      <Link to={`/products/${info.getValue()}`} className='btn btn-icon btn-light btn-sm border-0'>
        <CustomSVG path='/media/icons/actions/view.svg' className='svg-icon-2' />
      </Link>
    ),
  },
]

export default productsColumn

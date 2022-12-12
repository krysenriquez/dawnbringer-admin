import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
import {toCurrency} from '@/utils/toCurrency'
import {useIntl} from 'react-intl'

const ordersColumn = [
  {
    header: 'Order #',
    accessorFn: (row) => row.order_number,
    id: 'order_number',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Total',
    accessorFn: (row) => row.total_amount,
    id: 'total_amount',
    cell: (info) => toCurrency(info.getValue()),
  },
  {
    header: 'Type',
    accessorFn: (row) => row.order_type,
    id: 'order_type',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Status',
    accessorFn: (row) => row.latest_order_status,
    id: 'latest_order_status',
    cell: (info) => {
      const intl = useIntl()
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'PENDING',
            'badge-light-info':
              info.getValue() == 'AWAITING_DELIVERY' ||
              info.getValue() == 'AWAITING_PICKUP' ||
              info.getValue() == 'ON_DELIVERY',
            'badge-light-danger': info.getValue() == 'CANCELLED' || info.getValue() == 'REFUNDED',
            'badge-light-success': info.getValue() == 'COMPLETED',
          })}
        >
          {info.getValue() ? intl.formatMessage({id: info.getValue()}) : <></>}
        </div>
      )
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.order_number,
    id: 'product_action',
    cell: (info) => (
      <Link to={`/orders/${info.getValue()}`} className='btn btn-icon btn-light btn-sm border-0'>
        <CustomSVG path='/media/icons/actions/view.svg' className='svg-icon-2' />
      </Link>
    ),
  },
]

export default ordersColumn

import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {toCurrency} from '@/utils/toCurrency'
import {useIntl} from 'react-intl'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const ordersColumn = [
  {
    header: 'Order #',
    accessorFn: (row) => row.orderNumber,
    id: 'orderNumber',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.amount,
    id: 'amount',
    cell: (info) => toCurrency(info.getValue()),
  },
  {
    header: 'Discounted Price',
    accessorFn: (row) => row.discount,
    id: 'discount',
    cell: (info) => toCurrency(info.getValue()),
  },
  {
    header: 'Quantity',
    accessorFn: (row) => row.quantity,
    id: 'quantity',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Total',
    accessorFn: (row) => row.totalAmount,
    id: 'totalAmount',
    cell: (info) => toCurrency(info.getValue()),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.currentOrderStatus,
    id: 'currentOrderStatus',
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
]

export default ordersColumn
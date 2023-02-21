import clsx from 'clsx'
import {toCurrency} from '@/utils/toCurrency'
import {useIntl} from 'react-intl'

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
    header: 'Total',
    accessorFn: (row) => row.totalAmount,
    id: 'totalAmount',
    cell: (info) => toCurrency(info.getValue()),
  },
  {
    header: 'Type',
    accessorFn: (row) => row.orderType,
    id: 'orderType',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
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

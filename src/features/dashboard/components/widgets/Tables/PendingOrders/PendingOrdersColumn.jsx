import clsx from 'clsx'
import {format} from 'date-fns'
import {useNavigate} from 'react-router-dom'
import {toCurrency} from '@/utils/toCurrency'
import {useIntl} from 'react-intl'
import Countdown from 'react-countdown'
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
    header: 'Order Date',
    accessorFn: (row) => row.orderDate,
    id: 'orderDate',
    cell: (info) => {
      const intl = useIntl()
      return format(Date.parse(info.getValue()), 'dd/MM/yyyy hh:mm:ss')
    },
  },
  {
    header: 'Remaining Prep Time',
    accessorFn: (row) => row.remainingPrepTimeStatus,
    id: 'remainingPrepTimeStatus',
    cell: (info) => {
      return (
        <>
          {info.getValue() ? (
            <Countdown
              date={Date.parse(info.row.original.orderDate)}
              overtime={true}
              className={'text-' + info.getValue()}
            />
          ) : (
            <></>
          )}
        </>
      )
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
              info.getValue() == 'ON_DELIVERY' ||
              info.getValue() == 'ON_PICKUP',
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

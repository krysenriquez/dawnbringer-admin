import clsx from 'clsx'
import {toCurrency, toPoints} from '@/utils/toCurrency'
import {useIntl} from 'react-intl'

const activitiesColumn = [
  {
    header: 'Activity #',
    accessorFn: (row) => row.activityNumber,
    id: 'activityNumber',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Type',
    accessorFn: (row) => row.activityType,
    id: 'activityType',
    cell: (info) => {
      const intl = useIntl()
      return <>{info.getValue() ? intl.formatMessage({id: info.getValue()}) : <></>}</>
    },
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.activityAmount,
    id: 'activityAmount',
    cell: (info) => {
      return (
        <>
          {info.row.original.wallet == 'PV_WALLET'
            ? toPoints(info.getValue())
            : toCurrency(info.getValue())}
        </>
      )
    },
  },
  {
    header: 'Status',
    accessorFn: (row) => row.status,
    id: 'status',
    cell: (info) => {
      const intl = useIntl()
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'REQUESTED',
            'badge-light-info': info.getValue() == 'APPROVED',
            'badge-light-danger': info.getValue() == 'DENIED',
            'badge-light-success': info.getValue() == 'DONE' || info.getValue() == 'RELEASED',
          })}
        >
          {info.getValue() ? intl.formatMessage({id: info.getValue()}) : <></>}
        </div>
      )
    },
  },
]

export default activitiesColumn

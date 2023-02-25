import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const suppliesColumn = [
  {
    header: 'Supply #',
    accessorFn: (row) => row.supplyNumber,
    id: 'supplyNumber',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Branch From',
    accessorFn: (row) => row.branchFromName,
    id: 'branchFromName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Branch To',
    accessorFn: (row) => row.branchToName,
    id: 'branchToName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.currentSupplyStatus,
    id: 'currentSupplyStatus',
    cell: (info) => {
      const intl = useIntl()
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'PENDING',
            'badge-light-primary':
              info.getValue() == 'REQUEST_RECEIVED' || info.getValue() == 'BACK_ORDERED',
            'badge-light-info': info.getValue() == 'PREPARING' || info.getValue() == 'IN_TRANSIT',
            'badge-light-danger': info.getValue() == 'CANCELLED' || info.getValue() == 'DENIED',
            'badge-light-success': info.getValue() == 'DELIVERED',
          })}
        >
          {info.getValue() ? intl.formatMessage({id: info.getValue()}) : <></>}
        </div>
      )
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.supplyId,
    id: 'supplyAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.supplyId}`, {
          state: {supplyId: info.row.original.supplyId},
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

export default suppliesColumn

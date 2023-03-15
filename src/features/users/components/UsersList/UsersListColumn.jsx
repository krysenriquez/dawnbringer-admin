import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const usersColumn = [
  {
    header: 'Display Name',
    accessorFn: (row) => row.displayName,
    id: 'displayName',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Username',
    accessorFn: (row) => row.username,
    id: 'username',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Email Address',
    accessorFn: (row) => row.emailAddress,
    id: 'emailAddress',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Type',
    accessorFn: (row) => row.userTypeName,
    id: 'userTypeName',
    cell: (info) => {
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'Staff' || info.getValue() == 'Auditor',
            'badge-light-info': info.getValue() == 'Developer',
            'badge-light-success': info.getValue() == 'Administrator',
            'badge-light-dark': info.getValue() == 'Member',
          })}
        >
          {info.getValue()}
        </div>
      )
    },
  },
  {
    header: 'Created by',
    accessorFn: (row) => row.createdByName,
    id: 'createdByName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.isActive,
    id: 'isActive',
    cell: (info) => {
      return (
        <CustomSVG
          path={
            info.getValue() ? '/media/icons/general/check.svg' : '/media/icons/general/cross.svg'
          }
          className={clsx('svg-icon-2', {
            'svg-icon-success': info.getValue(),
            'svg-icon-danger': !info.getValue(),
          })}
        />
      )
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.userId,
    id: 'userAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.userId}`, {
          state: {userId: info.row.original.userId},
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

export default usersColumn

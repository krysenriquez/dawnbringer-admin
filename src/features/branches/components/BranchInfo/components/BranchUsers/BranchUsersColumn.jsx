import clsx from 'clsx'
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
    accessorFn: (row) => row.userType,
    id: 'userType',
    cell: (info) => {
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'STAFF',
            'badge-light-info': info.getValue() == 'DEVELOPER',
            'badge-light-success': info.getValue() == 'ADMIN',
          })}
        >
          {info.getValue()}
        </div>
      )
    },
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
]

export default usersColumn

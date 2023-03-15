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
]

export default usersColumn

import clsx from 'clsx'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import {useNavigate} from 'react-router-dom'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const membersColumns = [
  {
    header: 'Account Number',
    accessorFn: (row) => row.accountNumber,
    id: 'accountNumber',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Name',
    accessorFn: (row) => row.accountName,
    id: 'accountName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Referrer',
    accessorFn: (row) =>
      row.referrerAccountName ? row.referrerAccountNumber + '-' + row.referrerAccountName : 'None',
    id: 'referrerAccount',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Active',
    accessorFn: (row) => row.accountStatus,
    id: 'accountStatus',
    cell: (info) => (
      <div
        className={clsx('badge fw-bolder', {
          'badge-light-success': info.getValue() == 'ACTIVE',
          'badge-light-warning': info.getValue() == 'PENDING',
          'badge-light-danger': info.getValue() == 'DEACTIVATED',
        })}
      >
        {info.getValue()}
      </div>
    ),
  },
  {
    header: 'Has Access',
    accessorFn: (row) => row.userStatus,
    id: 'userStatus',
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
    accessorFn: (row) => row.accountId,
    id: 'customerAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.accountId}`, {
          state: {accountId: info.row.original.accountId},
        })
      }

      return (
        <>
          <RolePermissionComponent moduleName='Members Management' permission='canRetrieve'>
            <ActionCell
              handleClick={handleView}
              className='btn btn-icon btn-icon-primary btn-light btn-sm border-0 me-2'
            >
              <CustomSVG path='/media/icons/general/magnifying-glass.svg' className='svg-icon-2' />
            </ActionCell>
          </RolePermissionComponent>
        </>
      )
    },
  },
]

export default membersColumns

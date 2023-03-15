import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const rolesColumn = [
  {
    header: 'Type',
    accessorFn: (row) => row.userTypeName,
    id: 'userTypeName',
    cell: (info) => {
      return (
        <div className='ps-4'>
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
        </div>
      )
    },
  },
  {
    header: 'Total # of Users',
    accessorFn: (row) => row.usersCount,
    id: 'usersCount',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.userTypeId,
    id: 'userAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.userTypeId}`, {
          state: {userTypeId: info.row.original.userTypeId},
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

export default rolesColumn

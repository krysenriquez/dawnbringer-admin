import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {toCurrency} from '@/utils/toCurrency'
import {useIntl} from 'react-intl'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const customersColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.name,
    id: 'name',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Email Address',
    accessorFn: (row) => row.emailAddress,
    id: 'emailAddress',
    cell: (info) => {
      return (
        <div>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Contact Number',
    accessorFn: (row) => row.contactNumber,
    id: 'contactNumber',
    cell: (info) => {
      return (
        <div>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Orders',
    accessorFn: (row) => row.orderCount,
    id: 'orderCount',
    cell: (info) => {
      return (
        <div>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.customerNumber,
    id: 'customerAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.customerNumber}`, {
          state: {customerNumber: info.row.original.customerNumber},
        })
      }

      return (
        <>
          <RolePermissionComponent moduleName='Guests Management' permission='canRetrieve'>
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

export default customersColumn

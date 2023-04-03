import {useState} from 'react'
import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const branchesColumn = [
  {
    header: 'Branch Name',
    accessorFn: (row) => row.branchName,
    id: 'branchName',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Main Office',
    accessorFn: (row) => row.isMain,
    id: 'isMain',
    cell: (info) => {
      const intl = useIntl()
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
    header: 'Can Deliver',
    accessorFn: (row) => row.canDeliver,
    id: 'canDeliver',
    cell: (info) => {
      const intl = useIntl()
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
    header: 'Can Supply',
    accessorFn: (row) => row.canSupply,
    id: 'canSupply',
    cell: (info) => {
      const intl = useIntl()
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
    header: 'Active',
    accessorFn: (row) => row.isActive,
    id: 'isActive',
    cell: (info) => {
      const intl = useIntl()
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
    header: 'Created by',
    accessorFn: (row) => row.createdByName,
    id: 'createdByName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.branchId,
    id: 'branchAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.branchId}`, {
          state: {branchId: info.row.original.branchId},
        })
      }

      return (
        <>
          <RolePermissionComponent moduleName='User Management' permission='canRetrieve'>
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

export default branchesColumn

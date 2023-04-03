import {useState} from 'react'
import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const pageContentsColumn = [
  {
    header: 'Name',
    accessorFn: (row) => row.internalName,
    id: 'internalName',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Page Title',
    accessorFn: (row) => row.pageTitle,
    id: 'pageTitle',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Page Slug',
    accessorFn: (row) => row.pageSlug,
    id: 'pageSlug',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Is Published',
    accessorFn: (row) => row.isPublished,
    id: 'isPublished',
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
    accessorFn: (row) => row.pageContentId,
    id: 'pageContentAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.pageContentId}`, {
          state: {pageContentId: info.row.original.pageContentId},
        })
      }

      return (
        <>
          <RolePermissionComponent moduleName='Content Management' permission='canRetrieve'>
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

export default pageContentsColumn

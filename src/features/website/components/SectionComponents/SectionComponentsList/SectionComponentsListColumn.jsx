import {useState} from 'react'
import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const sectionComponentsColumn = [
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
    header: 'Header',
    accessorFn: (row) => row.header,
    id: 'header',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Sub Header',
    accessorFn: (row) => row.subHeader,
    id: 'subHeader',
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
    header: 'Actions',
    accessorFn: (row) => row.id,
    id: 'pageContentAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.id}`, {
          state: {id: info.row.original.id},
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

export default sectionComponentsColumn

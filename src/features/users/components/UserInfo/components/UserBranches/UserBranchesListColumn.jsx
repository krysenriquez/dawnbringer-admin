import clsx from 'clsx'
import {useIntl} from 'react-intl'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

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
]

export default branchesColumn

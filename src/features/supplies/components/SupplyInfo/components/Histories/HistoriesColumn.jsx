import {format} from 'date-fns'
import _ from 'lodash'

const historiesColumn = [
  {
    header: 'Date Modified',
    accessorFn: (row) => row.modified,
    id: 'modified',
    cell: (info) => format(Date.parse(info.getValue()), 'dd/MM/yyyy hh:mm:ss'),
  },
  {
    header: 'Changes',
    accessorFn: (row) => row.changes,
    id: 'changes',
    cell: (info) => {
      if (info.getValue()) {
        return (
          <>
            {info.getValue().map((value) => {
              return <div key={value}>{_.capitalize(value.replace(/_/g, ' '))}</div>
            })}
          </>
        )
      }
      return 'None'
    },
  },
  {
    header: 'Modified by',
    accessorFn: (row) => row.modifiedBy,
    id: 'modifiedBy',
    cell: (info) => info.getValue(),
  },
]

export default historiesColumn

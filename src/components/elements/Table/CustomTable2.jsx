import {useState} from 'react'
import clsx from 'clsx'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import {DebouncedInput} from '../Input/DebouncedInput'
import {CustomSVG} from '../SVG/CustomSVG'
import {CustomCardBody} from '../Card'

export function CustomTable2({data, columns, title, handleClick}) {
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <div>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{title}</span>
        </h3>
        <div className='card-toolbar'>
          <div className='d-flex align-items-center position-relative my-1'>
            <CustomSVG
              path='/public/media/icons/search.svg'
              className='svg-icon-1 position-absolute ms-6'
            />
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              className='form-control form-control-solid w-250px ps-14'
              placeholder='Search all columns...'
            />
          </div>
        </div>
      </div>
      <CustomCardBody className='py-4'>
        <div className='table-responsive'>
          <table id='kt_table_users' className='table align-middle table-row-dashed gs-0 gy-4'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className='fw-bold text-muted'>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={clsx('min-w-125px', {
                          'ps-4': header.index == 0,
                        })}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: (
                                <CustomSVG
                                  path='/public/media/icons/arrows/caret-top.svg'
                                  className={clsx('text-muted')}
                                />
                              ),
                              desc: (
                                <CustomSVG
                                  path='/public/media/icons/arrows/caret-down.svg'
                                  className={clsx('text-muted')}
                                />
                              ),
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody className='text-gray-600 fw-bold'>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className='bg-hover-light text-hover-inverse-light'
                      onClick={() => handleClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={table.getAllColumns().length}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {table.getRowModel().rows.length > 0 ? (
          <div className='row'>
            <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
              <div id='kt_table_users_paginate'>
                <ul className='pagination'>
                  <li
                    className={clsx('page-item', {
                      disabled: !table.getCanPreviousPage(),
                    })}
                  >
                    <a
                      className='page-link'
                      onClick={() => table.setPageIndex(0)}
                      style={{cursor: 'pointer'}}
                    >
                      <i className='bi bi-chevron-double-left'></i>
                    </a>
                  </li>
                  <li
                    className={clsx('page-item', {
                      disabled: !table.getCanPreviousPage(),
                    })}
                  >
                    <a
                      className='page-link'
                      onClick={() => table.previousPage()}
                      style={{cursor: 'pointer'}}
                    >
                      <i className='bi bi-chevron-left'></i>
                    </a>
                  </li>
                  <li
                    className={clsx('page-item', {
                      disabled: !table.getCanNextPage(),
                    })}
                  >
                    <a
                      className='page-link'
                      onClick={() => table.nextPage()}
                      style={{cursor: 'pointer'}}
                    >
                      <i className='bi bi-chevron-right'></i>
                    </a>
                  </li>
                  <li
                    className={clsx('page-item', {
                      disabled: !table.getCanNextPage(),
                    })}
                  >
                    <a
                      className='page-link'
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      style={{cursor: 'pointer'}}
                    >
                      <i className='bi bi-chevron-double-right'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </CustomCardBody>
    </div>
  )
}

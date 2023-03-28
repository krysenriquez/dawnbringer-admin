import React from 'react'

const DashboardActions = () => {
  const test = () => {
    console.log('Test')
  }

  return (
    <div className='d-flex align-items-center flex-wrap'>
      <div className='flex-shrink-0 me-2'>
        <ul className='nav' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              onClick={test}
              className='nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light active fw-semibold fs-7 px-4 me-1'
            >
              Day
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light fw-semibold fs-7 px-4 me-1'
              data-bs-toggle='tab'
              href=''
              aria-selected='false'
              tabIndex={-1}
              role='tab'
            >
              Week
            </a>
          </li>
          <li className='nav-item' role='presentation'>
            <a
              className='nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light fw-semibold fs-7 px-4'
              data-bs-toggle='tab'
              href='#'
              aria-selected='false'
              tabIndex={-1}
              role='tab'
            >
              Year
            </a>
          </li>
        </ul>
      </div>
      <div className='d-flex align-items-center'>
        <a
          href='#'
          className='btn btn-sm btn-bg-light btn-color-gray-500 btn-active-color-primary me-2'
          id='kt_dashboard_daterangepicker'
          data-bs-toggle='tooltip'
          data-bs-dismiss='click'
          data-bs-trigger='hover'
          data-bs-original-title='Select dashboard daterange'
          data-kt-initialized={1}
        >
          <span className='fw-semibold me-1' id='kt_dashboard_daterangepicker_title'>
            Today:
          </span>
          <span className='fw-bold' id='kt_dashboard_daterangepicker_date'>
            Mar 21
          </span>
        </a>
      </div>
    </div>
  )
}

export default DashboardActions

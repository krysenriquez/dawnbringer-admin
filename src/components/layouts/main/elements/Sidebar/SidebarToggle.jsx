import React from 'react'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'
export const SidebarToggle = () => {
  return (
    <div
      id='kt_app_sidebar_toggle'
      className='app-sidebar-toggle btn btn-sm btn-icon bg-light btn-color-gray-700 btn-active-color-primary d-none d-lg-flex rotate'
      data-toggle='true'
      data-toggle-state='active'
      data-toggle-target='body'
      data-toggle-name='app-sidebar-minimize'
    >
      <CustomSVG
        path='/media/icons/hamburger-right.svg'
        className='svg-icon svg-icon-4 rotate-180'
      />
    </div>
  )
}

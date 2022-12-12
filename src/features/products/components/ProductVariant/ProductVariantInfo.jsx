/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo, useState, useEffect} from 'react'
import {General} from './Cards/General'
import {Pricing} from './Cards/Pricing'
import {Media} from './Cards/Media'
import {Inventory} from './Cards/Inventory'
import {Meta} from './Cards/Meta'

const ProductVariantInfo = ({variant}) => {
  const [state, setState] = useState()
  return (
    <>
      <ul
        className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2'
        role='tablist'
      >
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link text-active-primary pb-4 active'
            data-bs-toggle='tab'
            href='#kt_ecommerce_add_product_general'
            aria-selected='true'
            role='tab'
          >
            General
          </a>
        </li>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link text-active-primary pb-4'
            data-bs-toggle='tab'
            href='#kt_ecommerce_add_product_advanced'
            aria-selected='false'
            role='tab'
          >
            Advanced
          </a>
        </li>
      </ul>
      <div className='tab-content'>
        <div
          className='tab-pane fade show active'
          id='kt_ecommerce_add_product_general'
          role='tab-panel'
        >
          <div className='d-flex flex-column gap-7 gap-lg-10'>
            <General variant={variant} />
            <Pricing variant={variant} />
            <Media variant={variant} />
          </div>
        </div>
      </div>
      <div className='tab-content'>
        <div className='tab-pane fade show' id='kt_ecommerce_add_product_advanced' role='tab-panel'>
          <div className='d-flex flex-column gap-7 gap-lg-10'>
            <Inventory variant={variant} />
            <Meta variant={variant} />
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end'>
        <a
          href='/metronic8/demo2/../demo2/apps/ecommerce/catalog/products.html'
          id='kt_ecommerce_add_product_cancel'
          className='btn btn-light me-5'
        >
          Cancel
        </a>
        <button type='submit' id='kt_ecommerce_add_product_submit' className='btn btn-primary'>
          <span className='indicator-label'>Save Changes</span>
          <span className='indicator-progress'>
            Please wait...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        </button>
      </div>
    </>
  )
}

export {ProductVariantInfo}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {ProductVariantGeneral} from './Cards/ProductVariantGeneral'
import {ProductVariantPricing} from './Cards/ProductVariantPricing'
import {ProductVariantMedia} from './Cards/ProductVariantMedia'
import {ProductVariantInventory} from './Cards/ProductVariantInventory'
import {ProductVariantMeta} from './Cards/ProductVariantMeta'

const ProductVariantInfo = ({variant}) => {
  const productVariantInfoSchema = Yup.object().shape({
    variant_name: Yup.string(),
    variant_description: Yup.string(),
    price: Yup.number(),
    discount: Yup.number(),
    sku: Yup.string(),
    quantity: Yup.number(),
  })

  return (
    <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
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
            <ProductVariantGeneral variant={variant} />
            <ProductVariantPricing variant={variant} />
            <ProductVariantMedia variant={variant} />
          </div>
        </div>
      </div>
      <div className='tab-content'>
        <div className='tab-pane fade show' id='kt_ecommerce_add_product_advanced' role='tab-panel'>
          <div className='d-flex flex-column gap-7 gap-lg-10'>
            <ProductVariantMeta variant={variant} />
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
    </div>
  )
}

export {ProductVariantInfo}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo, useState, useEffect} from 'react'
import {General} from '../ProductVariant/Cards/General'
import {ProductInfoCard} from './ProductInfoCard'
import {CustomTable2} from '@/components/elements/Table/CustomTable2'
import productsVariantsColumn from './ProductsVariantColumn'
import {Outlet, useNavigate} from 'react-router-dom'

const ProductInfo = ({product}) => {
  const [selectedVariant, setSelectedVariant] = useState()
  const tableData = useMemo(() => product.product_variants, [product])
  const tableColumns = useMemo(() => productsVariantsColumn, [])
  const navigate = useNavigate()

  const navigateSelectedVariant = (variant) => {
    setSelectedVariant(variant)
    navigate(`${variant.sku}`, {
      state: {sku: variant.sku},
    })
  }

  return (
    <>
      <form
        className='form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework'
        data-kt-redirect='/metronic8/demo2/../demo2/apps/ecommerce/catalog/products.html'
      >
        <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
          <ProductInfoCard product={product} />
        </div>
        <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
          <div className='card card-flush py-4'>
            {tableData ? (
              <CustomTable2
                {...{
                  data: tableData,
                  columns: tableColumns,
                  title: 'Product Variants',
                  handleClick: navigateSelectedVariant,
                }}
              />
            ) : (
              <></>
            )}
          </div>
          <Outlet />
        </div>
      </form>
    </>
  )
}

export {ProductInfo}

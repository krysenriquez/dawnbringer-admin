import clsx from 'clsx'
import {toCurrency} from '@/utils/toCurrency'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const ProductVariantDetails = () => {
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()

  return (
    <>
      {productVariantInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          bodyClassName='pt-0'
        >
          <>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-150px symbol-lg-160px mb-7'>
                <img src={productVariantInfo.variantImage} alt='image' />
              </div>
              <div className='fs-3 text-gray-800 fw-bold mb-1'>
                {productVariantInfo.variantName}
              </div>
              <div className='fs-5 text-muted fw-semibold  mb-6'>{productVariantInfo.sku}</div>
            </div>
            <div className='d-flex flex-stack fs-4 py-3'>
              <div className='fw-bold'>Status</div>
              <div
                className={clsx('badge d-inline fw-bolder', {
                  'badge-light-success': productVariantInfo.variantStatus == 'ACTIVE',
                  'badge-light-warning': productVariantInfo.variantStatus == 'DRAFT',
                  'badge-light-danger': productVariantInfo.variantStatus == 'INACTIVE',
                })}
              >
                {productVariantInfo.variantStatus}
              </div>
            </div>
            <div className='pb-5 fs-6'>
              <div className='mt-5'>
                <h5 className=''>Pricing</h5>
                <table className='table fs-6 fw-semibold gs-0 gy-2 gx-2'>
                  <tbody>
                    <tr className=''>
                      <td className='text-gray-700'>Price:</td>
                      <td className='text-gray-800'>{toCurrency(productVariantInfo.price)}</td>
                    </tr>

                    <tr className=''>
                      <td className='text-gray-700'>Discounted Price:</td>
                      <td className='text-gray-800'>{toCurrency(productVariantInfo.discount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='separator separator-dashed mb-7'></div>
              <div className='fw-bold mt-5'>Description</div>
              <div className='text-gray-600'>
                <span
                  className='fw-semibold text-gray-700'
                  dangerouslySetInnerHTML={{__html: productVariantInfo.variantDescription}}
                ></span>
              </div>
              <div className='fw-bold mt-5'>Tags</div>
              <div className='text-gray-600 mb-5'>
                <span className='fw-semibold text-gray-700'>
                  {productVariantInfo.variantTags.length > 0 ? (
                    productVariantInfo.variantTags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className={clsx('badge me-2', {
                            'badge-light-primary': tag != 'exclusive',
                            'badge-light-success': tag == 'exclusive',
                          })}
                        >
                          {tag}
                        </span>
                      )
                    })
                  ) : (
                    <div>--</div>
                  )}
                </span>
              </div>
              <div className='separator separator-dashed mb-7' />
              <div className='fw-bold mt-5'>Meta Tag Title</div>
              <div className='text-gray-600'>{productVariantInfo.meta.metaTagTitle}</div>
              <div className='fw-bold mt-5'>Meta Tag Description</div>
              <div className='text-gray-600'>
                <span
                  className='fw-semibold text-gray-700'
                  dangerouslySetInnerHTML={{__html: productVariantInfo.meta.metaTagDescription}}
                ></span>
              </div>
              <div className='fw-bold mt-5'>Page Slug</div>
              <div className='text-gray-600'>{productVariantInfo.meta.pageSlug}</div>
            </div>
          </>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductVariantDetails

import clsx from 'clsx'
import {useNavigate} from 'react-router-dom'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {
  useProductInfoQueryData,
  useProductInfoQueryLoading,
} from '@/features/product/stores/ProductInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'
import {usePermissions} from '@/providers/Permissions/PermissionsProviders'
import getRolePermission from '@/utils/getRolePermission'

const ProductDetails = () => {
  const navigate = useNavigate()
  const theme = useThemeMode()
  const productInfo = useProductInfoQueryData()
  const isLoading = useProductInfoQueryLoading()
  const {permissions} = usePermissions()

  const edit = () => {
    navigate(`edit`)
  }

  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  return (
    <>
      {productInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          hasToolbar={getRolePermission({
            moduleName: 'Products Management',
            permissions: permissions,
            permission: 'canUpdate',
          })}
          toolbarButtonName='Edit'
          handleToolbarButtonClick={edit}
          bodyClassName='pt-0'
        >
          <>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-150px symbol-lg-160px mb-7'>
                <img
                  src={productInfo.productImage ? productInfo.productImage : defaultThumbnail}
                  alt='image'
                />
              </div>
              <div className='fs-3 text-gray-800 fw-bold mb-1'>{productInfo.productName}</div>
            </div>
            <div className='d-flex flex-stack fs-4 py-3'>
              <div className='fw-bold'>Status</div>
              <div
                className={clsx('badge d-inline fw-bolder', {
                  'badge-light-success': productInfo.productStatus == 'ACTIVE',
                  'badge-light-warning': productInfo.productStatus == 'DRAFT',
                  'badge-light-danger': productInfo.productStatus == 'INACTIVE',
                })}
              >
                {productInfo.productStatus}
              </div>
            </div>
            <div className='pb-5 fs-6'>
              <div className='fw-bold mt-5'>Product Type</div>
              <div className='text-gray-600'>
                <span className='fw-semibold text-gray-700'>{productInfo.productTypeName}</span>
              </div>
              <div className='fw-bold mt-5'>Description</div>
              <div className='text-gray-600'>
                <span
                  className='fw-semibold text-gray-700'
                  dangerouslySetInnerHTML={{__html: productInfo.productDescription}}
                ></span>
              </div>
              <div className='fw-bold mt-5'>Tags</div>
              <div className='text-gray-600 mb-5'>
                <span className='fw-semibold text-gray-700'>
                  {productInfo.productTags.length > 0 ? (
                    productInfo.productTags.map((tag) => {
                      return (
                        <span key={tag} className='badge badge-light-primary me-2'>
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
              <div className='text-gray-600'>{productInfo.meta.metaTagTitle}</div>
              <div className='fw-bold mt-5'>Meta Tag Description</div>
              <div className='text-gray-600'>
                <span
                  className='fw-semibold text-gray-700'
                  dangerouslySetInnerHTML={{__html: productInfo.meta.metaTagDescription}}
                ></span>
              </div>
              <div className='fw-bold mt-5'>Page Slug</div>
              <div className='text-gray-600'>{productInfo.meta.pageSlug}</div>
            </div>
          </>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductDetails

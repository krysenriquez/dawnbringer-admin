import {useEffect, useState} from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const ProductVariantMedia = () => {
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()
  const [index, setIndex] = useState(-1)
  const [productVariantMedia, setProductVariantMedia] = useState([])

  useEffect(() => {
    if (productVariantInfo.media) {
      let attachment_arr = []
      productVariantInfo.media.map((image) => {
        if (image.attachment) {
          attachment_arr.push({src: image.attachment})
        }
      })
      setProductVariantMedia(attachment_arr)
    }
  }, [productVariantInfo])

  return (
    <>
      {productVariantInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush'
          hasHeader={true}
          header={<h2>Media</h2>}
          bodyClassName='pt-0'
        >
          <div className='rounded border p-5 p-lg-10'>
            <div className='row'>
              {productVariantInfo.media.map((image, index) => {
                return (
                  <div className='col-lg-4 mb-3' key={image.id}>
                    <div
                      className='cursor-pointer bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px'
                      style={{backgroundImage: `url(${image.attachment})`}}
                      key={image.id}
                      onClick={() => setIndex(index)}
                    ></div>
                  </div>
                )
              })}
            </div>
          </div>

          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={productVariantMedia}
          />
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductVariantMedia

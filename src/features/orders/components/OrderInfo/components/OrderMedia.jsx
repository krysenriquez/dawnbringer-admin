import {useEffect, useState} from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Carousel from 'react-bootstrap/Carousel'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const OrderMedia = () => {
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()
  const [index, setIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [orderAttachments, setOrderAttachments] = useState([])

  useEffect(() => {
    if (orderInfo.attachments) {
      let attachment_arr = []
      orderInfo.attachments.map((attachment) => {
        if (attachment.attachment) {
          attachment_arr.push({src: attachment.attachment})
        }
      })
      setOrderAttachments(attachment_arr)
    }
  }, [orderInfo])

  const viewAttachments = (index) => {
    setImageIndex(index)
    setOpen(true)
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <>
      {orderInfo && orderInfo.address && !isLoading ? (
        <CustomCard
          cardClassName='card-flush py-4 flex-row-fluid overflow-hidden'
          hasHeader={true}
          header={<h2>Attachments</h2>}
          bodyClassName='pt-0'
        >
          <Carousel activeIndex={index} onSelect={handleSelect} className='px-5'>
            {orderInfo.attachments &&
              orderInfo.attachments.map((attachment, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div
                      className='cursor-pointer bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-175px'
                      style={{backgroundImage: `url(${attachment.attachment})`}}
                      onClick={() => viewAttachments(index)}
                    ></div>
                  </Carousel.Item>
                )
              })}
          </Carousel>
          <Lightbox
            open={open}
            index={imageIndex}
            close={() => setOpen(false)}
            slides={orderAttachments}
          />
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default OrderMedia

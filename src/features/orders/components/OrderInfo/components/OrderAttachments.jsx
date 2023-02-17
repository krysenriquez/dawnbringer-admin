import {useState, useEffect} from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Inline from 'yet-another-react-lightbox/plugins/inline'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import {useOrderInfoQueryData} from '@/features/orders/stores/OrderInfoQueryProvider'

const OrderAttachments = () => {
  const order = useOrderInfoQueryData()
  const [orderAttachments, setOrderAttachments] = useState([])

  useEffect(() => {
    if (order.attachments) {
      let attachment_arr = []
      order.attachments.map((attachment) => {
        if (attachment.attachment) {
          attachment_arr.push({src: attachment.attachment})
        }
      })
      setOrderAttachments(attachment_arr)
    }
  }, [order])

  return (
    <>
      {orderAttachments.length > 0 ? (
        <Lightbox
          slides={orderAttachments}
          inline={{style: {width: '100%', maxWidth: '900px', aspectRatio: '3 / 2'}}}
          plugins={[Inline, Thumbnails]}
        />
      ) : (
        <>
          <div className='text-center'>
            <h3>No Attachments Found</h3>
          </div>
        </>
      )}
    </>
  )
}

export default OrderAttachments

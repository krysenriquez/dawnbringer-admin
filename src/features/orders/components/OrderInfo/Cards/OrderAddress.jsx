import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'

const OrderAddress = ({address}) => {
  const [data, setData] = useState(address)
  const intl = useIntl()

  useEffect(() => {
    setData(address)
  }, [address])

  return (
    <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
      <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
        <img
          src={clsx({
            '/public/media/icons/ecommerce/delivery.svg': data.address_type == 'SHIPPING',
            '/public/media/icons/ecommerce/scroll.svg': data.address_type == 'BILLING',
          })}
          className='w-175px'
        />
      </div>
      <div className='card-header'>
        <div className='card-title'>
          <h2>{intl.formatMessage({id: data.address_type})} Address</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        {data.address1} {data.address2}
        <br />
        {data.city} {data.province} {data.zip}
        <br />
        {data.country}
      </div>
    </div>
  )
}
export {OrderAddress}

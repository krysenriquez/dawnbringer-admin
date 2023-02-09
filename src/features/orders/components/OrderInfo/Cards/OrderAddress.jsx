import {useIntl} from 'react-intl'
import clsx from 'clsx'

const OrderAddress = ({address}) => {
  const intl = useIntl()
  return (
    <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
      <div className='position-absolute top-0 end-0 opacity-10 pe-none text-end'>
        <img
          src={clsx({
            '/media/icons/ecommerce/delivery.svg': address.address_type == 'SHIPPING',
            '/media/icons/ecommerce/scroll.svg': address.address_type == 'BILLING',
          })}
          className='w-175px'
        />
      </div>
      <div className='card-header'>
        <div className='card-title'>
          <h2>{intl.formatMessage({id: address.address_type})} Address</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        {address.address1} {address.address2}
        <br />
        {address.city} {address.province} {address.zip}
        <br />
        {address.country}
      </div>
    </div>
  )
}
export {OrderAddress}

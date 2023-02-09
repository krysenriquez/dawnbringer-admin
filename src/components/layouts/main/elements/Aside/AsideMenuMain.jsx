/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSubMain} from './AsideMenuItemWithSubMain'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        title={intl.formatMessage({id: 'DASHBOARD'})}
        fontIcon='bi-house fs-2'
        bsTitle={intl.formatMessage({id: 'DASHBOARD'})}
        className='py-2'
      />
      <AsideMenuItemWithSubMain
        to=''
        title={intl.formatMessage({id: 'PRODUCTS'})}
        bsTitle={intl.formatMessage({id: 'PRODUCTS'})}
        fontIcon='bi-box2'
        icon=''
        hasBullet={false}
      >
        <AsideMenuItem
          to='/products'
          title={intl.formatMessage({id: 'PRODUCTS.LIST'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'PRODUCTS.LIST'})}
        />
        <AsideMenuItem
          to='/products/variants'
          title={intl.formatMessage({id: 'PRODUCTS.VARIANTS'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'PRODUCTS.VARIANTS'})}
        />
        <AsideMenuItem
          to='/products/supplies'
          title={intl.formatMessage({id: 'PRODUCTS.SUPPLIES'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'PRODUCTS.SUPPLIES'})}
        />
        <AsideMenuItem
          to='/products/types'
          title={intl.formatMessage({id: 'PRODUCTS.TYPES'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'PRODUCTS.TYPES'})}
        />
      </AsideMenuItemWithSubMain>
      <AsideMenuItem
        to='/orders'
        title={intl.formatMessage({id: 'ORDERS'})}
        fontIcon='bi-cart fs-2'
        bsTitle={intl.formatMessage({id: 'ORDERS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/members'
        title={intl.formatMessage({id: 'MEMBERS'})}
        fontIcon='bi-person-fill fs-2'
        bsTitle={intl.formatMessage({id: 'MEMBERS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/cashouts'
        title={intl.formatMessage({id: 'CASHOUTS'})}
        fontIcon='bi-cash-coin fs-2'
        bsTitle={intl.formatMessage({id: 'CASHOUTS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/website'
        title={intl.formatMessage({id: 'WEBSITE'})}
        fontIcon='bi-globe2 fs-2'
        bsTitle={intl.formatMessage({id: 'WEBSITE'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/settings'
        title={intl.formatMessage({id: 'SETTINGS'})}
        fontIcon='bi-gear fs-2'
        bsTitle={intl.formatMessage({id: 'SETTINGS'})}
        className='py-2'
      />
    </>
  )
}

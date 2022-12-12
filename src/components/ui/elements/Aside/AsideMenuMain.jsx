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
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-house fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        className='py-2'
      />
      <AsideMenuItemWithSubMain
        to=''
        title={intl.formatMessage({id: 'MENU.PRODUCTS'})}
        bsTitle={intl.formatMessage({id: 'MENU.PRODUCTS'})}
        fontIcon='bi-box2'
        icon=''
        hasBullet={false}
      >
        <AsideMenuItem
          to='/products'
          title={intl.formatMessage({id: 'MENU.PRODUCTS.LIST'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'MENU.PRODUCTS.LIST'})}
        />
        <AsideMenuItem
          to='/products/variants'
          title={intl.formatMessage({id: 'MENU.PRODUCTS.VARIANTS'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'MENU.PRODUCTS.VARIANTS'})}
        />
        <AsideMenuItem
          to='/products/supplies'
          title={intl.formatMessage({id: 'MENU.PRODUCTS.SUPPLIES'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'MENU.PRODUCTS.SUPPLIES'})}
        />
        <AsideMenuItem
          to='/products/types'
          title={intl.formatMessage({id: 'MENU.PRODUCTS.TYPES'})}
          hasBullet={true}
          bsTitle={intl.formatMessage({id: 'MENU.PRODUCTS.TYPES'})}
        />
      </AsideMenuItemWithSubMain>
      <AsideMenuItem
        to='/orders'
        title={intl.formatMessage({id: 'MENU.ORDERS'})}
        fontIcon='bi-cart fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.ORDERS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/members'
        title={intl.formatMessage({id: 'MENU.MEMBERS'})}
        fontIcon='bi-person-fill fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.MEMBERS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/cashouts'
        title={intl.formatMessage({id: 'MENU.CASHOUTS'})}
        fontIcon='bi-cash-coin fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.CASHOUTS'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/website'
        title={intl.formatMessage({id: 'MENU.WEBSITE'})}
        fontIcon='bi-globe2 fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.WEBSITE'})}
        className='py-2'
      />
      <AsideMenuItem
        to='/settings'
        title={intl.formatMessage({id: 'MENU.SETTINGS'})}
        fontIcon='bi-gear fs-2'
        bsTitle={intl.formatMessage({id: 'MENU.SETTINGS'})}
        className='py-2'
      />
    </>
  )
}

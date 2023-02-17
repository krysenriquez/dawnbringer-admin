/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import SidebarMenuItem from './components/SidebarMenuItem'
import SidebarMenuItemWithSub from './components/SidebarMenuItemWithSub'

const SidebarMenuItems = () => {
  const intl = useIntl()
  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        title={intl.formatMessage({id: 'DASHBOARD'})}
        fontIcon='bi-house-fill'
      />
      <SidebarMenuItem
        to='/products'
        title={intl.formatMessage({id: 'PRODUCTS'})}
        fontIcon='bi-box-seam-fill'
      />
      <SidebarMenuItem
        to='/product-variants'
        title={intl.formatMessage({id: 'PRODUCTS.VARIANTS'})}
        fontIcon='bi-boxes'
      />
      <SidebarMenuItem
        to='/product-types'
        title={intl.formatMessage({id: 'PRODUCTS.TYPES'})}
        fontIcon='bi-bookmarks-fill'
      />
      <SidebarMenuItem
        to='/supplies'
        title={intl.formatMessage({id: 'SUPPLIES'})}
        fontIcon='bi-truck'
      />
      <SidebarMenuItem
        to='/orders'
        title={intl.formatMessage({id: 'ORDERS'})}
        fontIcon='bi-cart fs-2'
      />
      <SidebarMenuItem
        to='/members'
        title={intl.formatMessage({id: 'MEMBERS'})}
        fontIcon='bi-person-fill fs-2'
      />
      <SidebarMenuItem
        to='/cashouts'
        title={intl.formatMessage({id: 'CASHOUTS'})}
        fontIcon='bi-cash-coin fs-2'
      />
      <SidebarMenuItem
        to='/website'
        title={intl.formatMessage({id: 'WEBSITE'})}
        fontIcon='bi-globe2 fs-2'
      />
      <SidebarMenuItem
        to='/settings'
        title={intl.formatMessage({id: 'SETTINGS'})}
        fontIcon='bi-gear fs-2'
      />
    </>
  )
}

export default SidebarMenuItems

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
        fontIcon='fa-solid fa-house fs-2'
      />
      <SidebarMenuItem
        to='/product-types'
        title={intl.formatMessage({id: 'PRODUCTS.TYPES'})}
        fontIcon='fa-solid fa-tag fs-2'
      />
      <SidebarMenuItem
        to='/products'
        title={intl.formatMessage({id: 'PRODUCTS'})}
        fontIcon='fa-solid fa-gift fs-2'
      />
      <SidebarMenuItem
        to='/product-variants'
        title={intl.formatMessage({id: 'PRODUCTS.VARIANTS'})}
        fontIcon='fa-solid fa-gifts fs-2'
      />
      <SidebarMenuItem
        to='/supplies'
        title={intl.formatMessage({id: 'SUPPLIES'})}
        fontIcon='fa-solid fa-truck fs-2'
      />
      <SidebarMenuItem
        to='/orders'
        title={intl.formatMessage({id: 'ORDERS'})}
        fontIcon='fa-solid fa-cart-shopping fs-2'
      />
      <SidebarMenuItem
        to='/members'
        title={intl.formatMessage({id: 'MEMBERS'})}
        fontIcon='fa-solid fa-user-group fs-2'
      />
      <SidebarMenuItem
        to='/customers'
        title={intl.formatMessage({id: 'CUSTOMERS'})}
        fontIcon='fa-solid fa-users fs-2'
      />
      <SidebarMenuItem
        to='/cashouts'
        title={intl.formatMessage({id: 'CASHOUTS'})}
        fontIcon='fa-solid fa-money-check-dollar fs-2'
      />
      <SidebarMenuItem
        to='/website'
        title={intl.formatMessage({id: 'WEBSITE'})}
        fontIcon='fa-solid fa-globe fs-2'
      />
      <SidebarMenuItemWithSub
        to='/settings'
        title={intl.formatMessage({id: 'SETTINGS'})}
        fontIcon='fa-solid fa-gears fs-2'
      >
        <SidebarMenuItem
          to='/settings/branches'
          title={intl.formatMessage({id: 'SETTINGS.BRANCHES'})}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
    </>
  )
}

export default SidebarMenuItems

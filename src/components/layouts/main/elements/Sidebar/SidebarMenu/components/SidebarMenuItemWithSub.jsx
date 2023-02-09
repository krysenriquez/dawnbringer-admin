import clsx from 'clsx'
import {useLocation} from 'react-router'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {checkIsActive} from '@/utils/checkIsActive'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const SidebarMenuItemWithSub = (props) => {
  const {children, to, title, icon, fontIcon, hasBullet, bsTitle} = props
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  console.log(pathname)
  
  return (
    <div
      className={clsx('menu-item', {'here show': isActive}, 'menu-accordion')}
      data-menu-trigger='click'
    >
      <span className='menu-link'>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && config.app.sidebar.menu.iconType === 'svg' && (
          <span className='menu-icon'>
            <CustomSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && config.app.sidebar.menu.iconType === 'font' && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div
        className={clsx('menu-sub menu-sub-accordion', {
          'menu-active-bg': isActive,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default SidebarMenuItemWithSub

import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import {checkIsActive} from '@/utils/checkIsActive'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {useLayout} from '@/providers/layout/LayoutProvider'

const SidebarMenuItem = (props) => {
  const {children, to, title, icon, fontIcon, hasBullet = false} = props
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
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
            <i className={clsx(fontIcon)}></i>
          </span>
        )}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export default SidebarMenuItem

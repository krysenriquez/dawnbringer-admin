import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {Topbar} from './Topbar/Topbar'
import MobileToggle from './MobileToggle/MobileToggle'

const Header = () => {
  const {config, classes, attributes} = useLayout()

  return (
    <div className={clsx('app-header', classes.header.join(' '))} {...attributes.headerMenu}>
      <div
        className={clsx(
          'app-container',
          classes.headerContainer.join(' '),
          config.app.header.container.class
        )}
      >
        <MobileToggle />
        <Topbar />
      </div>
    </div>
  )
}

export default Header

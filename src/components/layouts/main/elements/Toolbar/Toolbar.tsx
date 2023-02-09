import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {DefaultTitle} from '../Header/Topbar/components/page-title/DefaultTitle'

export default function Toolbar() {
  const {classes, config} = useLayout()

  return (
    <div className={clsx('app-toolbar', config.app.toolbar.class)}>
      <div
        className={clsx(
          'app-container',
          classes.toolbarContainer.join(' '),
          config.app.toolbar.container.class
        )}
      >
        <div className={clsx('app-toolbar-wrapper', config.app.toolbar.wrapper.class)}>
          {config.app.pageTitle?.display && <DefaultTitle />}
        </div>
      </div>
    </div>
  )
}

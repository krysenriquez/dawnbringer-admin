import {useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {DrawerComponent} from '@/components/assets/components'

const Content = ({children}) => {
  const {config, classes} = useLayout()
  const location = useLocation()

  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    <div className={clsx('app-content', classes.content.join(' '), config.app.content.class)}>
      <div className={clsx('app-container', classes.contentContainer.join(' '))}>{children}</div>
    </div>
  )
}

export {Content}

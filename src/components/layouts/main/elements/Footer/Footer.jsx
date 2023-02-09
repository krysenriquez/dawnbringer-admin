import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {useIntl} from 'react-intl'

const Footer = () => {
  const intl = useIntl()
  const {config, classes} = useLayout()
  return (
    <div className='app-footer'>
      <div
        className={clsx(
          'app-container',
          classes.footerContainer.join(' '),
          config.app.footer.container.class
        )}
      >
        <div className='order-2 order-md-1'>
          <span className='text-muted fw-bold me-1 my-4'>
            {new Date().getFullYear()}&copy; <b>{intl.formatMessage({id: 'APP.CREATOR'})}</b>
          </span>
        </div>
      </div>
    </div>
  )
}

export {Footer}

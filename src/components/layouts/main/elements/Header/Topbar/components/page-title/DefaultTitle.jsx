import {Fragment} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {usePageData} from '@/providers/PageDataProvider'

const DefaultTitle = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs, pageAction} = usePageData()
  const {config, classes} = useLayout()

  return (
    <>
      <div
        className={clsx(
          'page-title d-flex flex-column justify-content-center gap-1 me-3',
          classes.pageTitle.join(' ')
        )}
      >
        {pageTitle && (
          <h1 className='page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0'>
            {pageTitle}
          </h1>
        )}
        {pageBreadcrumbs &&
          pageBreadcrumbs.length > 0 &&
          config.app.pageTitle &&
          config.app.pageTitle.breadCrumbs && (
            <>
              <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
                {Array.from(pageBreadcrumbs).map((item, index) => (
                  <Fragment key={`${item.path}${index}`}>
                    {item.isSeparator ? (
                      <li className='breadcrumb-item'>
                        <span className='bullet bg-gray-200 w-5px h-2px'></span>
                      </li>
                    ) : (
                      <>
                        {item.isActive ? (
                          <li className='breadcrumb-item text-dark'>{item.title}</li>
                        ) : (
                          <li className='breadcrumb-item text-muted'>
                            <Link to={item.path} className='text-muted text-hover-primary'>
                              {item.title}
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                  </Fragment>
                ))}
                <li className='breadcrumb-item text-dark'>{pageTitle}</li>
              </ul>
            </>
          )}
      </div>
      {pageAction && pageAction}
    </>
  )
}

export {DefaultTitle}

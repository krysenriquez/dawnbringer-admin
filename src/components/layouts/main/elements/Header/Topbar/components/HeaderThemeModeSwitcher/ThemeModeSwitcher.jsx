import clsx from 'clsx'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {useThemeMode, systemMode} from '@/providers/ThemeModeProvider'

export const HeaderThemeModeSwitcher = () => {
  const {mode, menuMode, updateMode, updateMenuMode} = useThemeMode()
  const calculatedMode = mode === 'system' ? systemMode : mode
  const switchMode = (_mode) => {
    updateMenuMode(_mode)
    updateMode(_mode)
  }

  return (
    <>
      <a
        href='#'
        className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
        data-menu-trigger="{default: 'click', lg: 'hover'}"
        data-menu-attach='parent'
        data-menu-placement='bottom-end'
      >
        {calculatedMode === 'dark' ? (
          <CustomSVG path='/media/icons/dark.svg' className='theme-light-hide svg-icon-2' />
        ) : (
          <CustomSVG path='/media/icons/light.svg' className='theme-dark-hide' />
        )}
      </a>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
        data-menu='true'
      >
        <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'light',
            })}
            onClick={() => switchMode('light')}
          >
            <span className='menu-icon' data-element='icon'>
              <CustomSVG path='/media/icons/light.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>Light</span>
          </a>
        </div>
        <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'dark',
            })}
            onClick={() => switchMode('dark')}
          >
            <span className='menu-icon' data-element='icon'>
              <CustomSVG path='/media/icons/dark.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>Dark</span>
          </a>
        </div>
        <div className='menu-item px-3 my-0'>
          <a
            href='#'
            className={clsx('menu-link px-3 py-2', {
              active: menuMode === 'system',
            })}
            onClick={() => switchMode('system')}
          >
            <span className='menu-icon' data-element='icon'>
              <CustomSVG path='/media/icons/system.svg' className='svg-icon-3' />
            </span>
            <span className='menu-title'>System</span>
          </a>
        </div>
      </div>
    </>
  )
}

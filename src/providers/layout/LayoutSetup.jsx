import {DefaultLayoutConfig} from './DefaultLayoutConfig'

const LAYOUT_CONFIG_KEY = import.meta.env.VITE_BASE_LAYOUT_CONFIG_KEY || 'LayoutConfig'

export function getLayout() {
  const ls = localStorage.getItem(LAYOUT_CONFIG_KEY)
  if (ls) {
    try {
      return JSON.parse(ls)
    } catch (er) {
      console.error(er)
    }
  }
  return DefaultLayoutConfig
}

function setLayout(config) {
  try {
    localStorage.setItem(LAYOUT_CONFIG_KEY, JSON.stringify(config))
  } catch (er) {
    console.error(er)
  }
}

export function getEmptyCssClasses() {
  return {
    header: [],
    headerContainer: [],
    headerMobile: [],
    headerMenu: [],
    toolbar: [],
    toolbarContainer: [],
    content: [],
    contentContainer: [],
    footerContainer: [],
    sidebar: [],
    sidebarMenu: [],
    sidebarToggle: [],
    pageTitle: [],
    pageContainer: [],
  }
}

export function getEmptyHTMLAttributes() {
  return {
    headerMobile: new Map(),
    headerMenu: new Map(),
    headerContainer: new Map(),
    pageTitle: new Map(),
    sidebar: new Map(),
    sidebarMenu: new Map(),
  }
}

export function getEmptyCSSVariables() {
  return {
    body: new Map(),
  }
}

export class LayoutSetup {
  static isLoaded = false
  static config = getLayout()
  static classes = getEmptyCssClasses()
  static attributes = getEmptyHTMLAttributes()
  static cssVariables = getEmptyCSSVariables()

  static initCSSClasses() {
    LayoutSetup.classes = getEmptyCssClasses()
  }

  static initHTMLAttributes() {
    LayoutSetup.attributes = Object.assign({}, getEmptyHTMLAttributes())
  }

  static initCSSVariables() {
    LayoutSetup.cssVariables = getEmptyCSSVariables()
  }

  static initLayout(config) {
    if (config.main?.body?.backgroundImage) {
      document.body.style.backgroundImage = `url(${config.main.body.backgroundImage})`
    }
  }

  static initHeader(config) {
    if (!config.display) {
      return
    }

    LayoutSetup.classes.headerContainer.push(
      `container-${config.container.width === 'fluid' ? 'fluid' : 'xxl'}`
    )

    if (config.fixed.desktop) {
      document.body.setAttribute('data-app-header-fixed', 'true')
    }

    if (config.fixed.tabletAndMobile) {
      document.body.setAttribute('data-app-header-fixed-mobile', 'true')
      document.body.classList.add('header-tablet-and-mobile-fixed')
    }
  }

  static initSidebar(config) {
    if (!config.display) {
      return
    }

    document.body.setAttribute('data-app-sidebar-enabled', 'true')
    document.body.setAttribute('data-app-sidebar-fixed', config.fixed.desktop.toString() || '')

    if (config.push) {
      if (config.push.header) {
        document.body.setAttribute('data-app-sidebar-push-header', 'true')
      }

      if (config.push.toolbar) {
        document.body.setAttribute('data-app-sidebar-push-toolbar', 'true')
      }

      if (config.push.footer) {
        document.body.setAttribute('data-app-sidebar-push-footer', 'true')
      }
    }

    if (config.minimize.desktop.enabled) {
      if (config.minimize.desktop.default) {
        document.body.setAttribute('data-app-sidebar-minimize', 'on')
      }

      if (config.minimize.desktop.hoverable) {
        document.body.setAttribute('data-app-sidebar-hoverable', 'true')
      }
    }

    LayoutSetup.classes.sidebar.push(config.class)
  }

  static initToolbar(config) {
    if (!config.display) {
      return
    }

    document.body.classList.add('toolbar-enabled')
    LayoutSetup.classes.toolbarContainer.push('container-fluid')
    if (config.width === 'fluid') {
      LayoutSetup.classes.toolbarContainer.push(
        config.width === 'fluid' ? 'container-fluid' : 'container-xxl'
      )
    }

    if (config.fixed?.desktop) {
      document.body.classList.add('toolbar-fixed')
    }

    if (config.fixed?.tabletAndMobileMode) {
      document.body.classList.add('toolbar-tablet-and-mobile-fixed')
    }
  }

  static initPageTitle(config) {
    if (!config.display) {
      return
    }

    if (config.responsive) {
      LayoutSetup.classes.pageTitle.push('mb-5 mb-lg-0')
      LayoutSetup.attributes.pageTitle.set('data-swapper', 'true')
      LayoutSetup.attributes.pageTitle.set('data-swapper-mode', 'prepend')
      LayoutSetup.attributes.pageTitle.set(
        'data-swapper-parent',
        `{default: '#kt_content_container', '${config.responsiveBreakpoint}: ${config.responsiveTarget}'`
      )
    }
  }

  static initContent(config) {
    LayoutSetup.classes.contentContainer.push(
      `container-${config.container.width === 'fluid' ? 'fluid' : 'xxl'}`
    )
  }

  static initFooter(config) {
    LayoutSetup.classes.footerContainer.push(
      `container-${config.container.width === 'fluid' ? 'fluid' : 'xxl'}`
    )
  }

  static initConfig(config) {
    // Init layout
    LayoutSetup.initLayout(config)
    if (config.main?.type !== 'default') {
      return
    }

    LayoutSetup.initHeader(config.app.header)
    LayoutSetup.initSidebar(config.app.sidebar)
    LayoutSetup.initPageTitle(config.app.pageTitle)
    LayoutSetup.initToolbar(config.app.toolbar)
    LayoutSetup.initContent(config.app.content)
    LayoutSetup.initFooter(config.app.footer)
  }

  static updatePartialConfig(fieldsToUpdate) {
    const config = LayoutSetup.config
    const updatedConfig = {...config, ...fieldsToUpdate}
    LayoutSetup.initCSSClasses()
    LayoutSetup.initCSSVariables()
    LayoutSetup.initHTMLAttributes()
    LayoutSetup.isLoaded = false
    LayoutSetup.config = updatedConfig
    LayoutSetup.initConfig(Object.assign({}, updatedConfig))
    LayoutSetup.isLoaded = true // remove loading there
    return updatedConfig
  }

  static setConfig(config) {
    setLayout(config)
  }

  static bootstrap = (() => {
    LayoutSetup.updatePartialConfig(LayoutSetup.config)
  })()
}

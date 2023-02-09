export const DefaultLayoutConfig = {
  main: {
    type: 'default',
    darkSkinEnabled: true,
    primaryColor: '#009EF7',
    pageBgWhite: false,
  },
  app: {
    loader: {
      display: false,
      type: 'default', // Set default|spinner-message|spinner-logo to hide or show page loader
    },
    scrolltop: {
      display: true,
    },
    header: {
      display: true, // Set true|false to show or hide Header
      width: 'fluid', // Set fixed|fluid to change width type
      left: 'menu',
      fixed: {
        desktop: true, // Set true|false to set fixed Header for desktop mode
        tabletAndMobile: true, // Set true|false to set fixed Header for tablet and mobile modes
      },
      menu: {
        display: true,
        iconType: 'svg',
      },
      container: {
        width: 'fluid',
        class: 'd-flex align-items-stretch justify-content-between',
      },
      topbar: {
        class: 'flex-lg-grow-1 justify-content-end',
      },
    },
    sidebar: {
      display: true,
      class: 'flex-column',
      push: {
        header: true,
        toolbar: true,
        footer: true,
      },
      drawer: {
        enabled: true,
        attributes: {
          'data-drawer': 'true',
          'data-drawer-name': 'app-sidebar',
          'data-drawer-activate': '{default: true, lg: false}',
          'data-drawer-overlay': 'true',
          'data-drawer-direction': 'start',
          'data-drawer-toggle': '#app_sidebar_toggle',
        },
      },
      fixed: {
        desktop: true,
      },
      minimize: {
        desktop: {
          enabled: true,
          default: false,
          hoverable: true,
        },
      },
      menu: {
        iconType: 'font',
        attributes: {
          'data-scroll': 'true',
          'data-scroll-activate': 'true',
          'data-scroll-height': 'auto',
          'data-scroll-dependencies': '#app_sidebar_logo',
          'data-scroll-wrappers': '#app_sidebar_navs',
          'data-scroll-offset': '5px',
          'data-scroll-save-state': 'true',
        },
      },
    },
    content: {
      class: 'flex-column-fluid',
      container: {
        width: 'fluid',
      },
    },
    toolbar: {
      display: true,
      width: 'fluid',
      class: 'pt-7 pt-lg-10',
      container: {
        class: 'container-fluid d-flex align-items-stretch',
      },
      wrapper: {
        class: 'd-flex flex-stack flex-wrap gap-4 w-100',
      },
      fixed: {
        desktop: true,
        tabletAndMobileMode: false,
      },
    },
    footer: {
      class: '',
      container: {
        width: 'fluid',
        class:
          'container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3 justify-content-end',
      },
    },
    pageTitle: {
      display: true,
      breadCrumbs: true,
      description: true,
      responsive: true,
      responsiveBreakpoint: 'lg',
      responsiveTarget: '#kt_toolbar_container', // Responsive target selector
    },
    engage: {
      display: false,
    },
  },
}

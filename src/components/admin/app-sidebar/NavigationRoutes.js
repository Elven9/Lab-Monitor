export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'systemInfo',
      displayName: 'menu.systemInfo',
      meta: {
        iconClass: 'vuestic-iconset-dashboard',
      },
      disabled: true,
      children: [
        {
          name: 'hardware',
          displayName: 'menu.hardware',
        },
        {
          name: 'queue',
          displayName: 'menu.queue',
        },
        {
          name: 'jobtracker',
          displayName: 'menu.jobTracker',
        },
      ],
    },
    {
      name: 'resource',
      displayName: 'menu.resource',
      meta: {
        iconClass: 'vuestic-iconset-dashboard',
      },
      disabled: true,
      children: [
        // {
        //   name: 'usage',
        //   displayName: 'menu.usage',
        // },
        {
          name: 'allocation',
          displayName: 'menu.allocation',
        },
      ],
    },
  ],
}

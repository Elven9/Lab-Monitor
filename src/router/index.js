import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'

Vue.use(Router)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    {
      path: '/system-info',
      component: AppLayout,
      children: [
        {
          name: 'hardware',
          path: 'hardware',
          component: () => import('../pages/systemInfo.vue'),
        },
        {
          name: 'queue',
          path: 'queue',
          component: () => import('../pages/queueStat.vue'),
        },
        {
          name: 'jobtracker',
          path: 'jobtracker',
          component: () => import('../pages/jobTracker.vue'),
        },
      ],
    },
    {
      path: '/resource',
      component: AppLayout,
      children: [
        {
          name: 'usage',
          path: 'usage',
          component: () => import('../pages/resource/Usage.vue'),
        },
        {
          name: 'allocation',
          path: 'allocation',
          component: () => import('../pages/resource/Allocation.vue'),
        },
      ],
    },
    {
      path: '*',
      redirect: { name: 'hardware' },
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSearch.vue'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: () => import('../components/pages/404-pages/VaPageNotFoundSimple.vue'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: () => import('../components/pages/404-pages/VaPageNotFoundLargeText.vue'),
        },
      ],
    },
  ],
})

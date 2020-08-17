import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout'
import NotFoundComponent from '@/components/NotFoundComponent'
import EnterpriceService from '@/modules/EnterpriceService/routes'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BaseLayout',
      component: BaseLayout,
      redirect: { name: 'enterpriceService' },
      children: [EnterpriceService]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/Login')
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})

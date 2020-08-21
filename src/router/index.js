import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout'
import NotFoundComponent from '@/components/NotFoundComponent'
import Demo from '@/modules/Demo/routes'
import login from '@/modules/Login/routes'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BaseLayout',
      component: BaseLayout,
      redirect: { name: Demo.name },
      children: [Demo]
    },
    login,
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})

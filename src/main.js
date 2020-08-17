import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import './plugins/element'
import '@/assets/css/index.css'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

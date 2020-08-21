import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import global from './global'
import Demo from '@/modules/Demo/store'
export default new Vuex.Store({
  modules: {
    global,
    Demo
  }
})

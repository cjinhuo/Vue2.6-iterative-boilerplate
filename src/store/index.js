import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import global from './global'
import enterpriceService from '../modules/EnterpriceService/store'
export default new Vuex.Store({
  modules: {
    global,
    enterpriceService
  }
})

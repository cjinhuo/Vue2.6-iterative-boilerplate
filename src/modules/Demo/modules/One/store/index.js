// import
const UPDATE_STATE = 'UPDATE_STATE'
import { getSomething } from '../services'
export default {
  namespaced: true,
  state: {},
  mutations: {
    [UPDATE_STATE](state, { payload, statePropertyToAlter }) {
      state[statePropertyToAlter] = payload
    }
  },
  actions: {
    async getSomething(_, payload) {
      const res = await getSomething(payload)
      return res
    }
  }
}
